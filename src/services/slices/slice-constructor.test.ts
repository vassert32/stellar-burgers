import { describe, test, expect, jest } from '@jest/globals';
import {
  constructorReducer,
  defaultBurgerState,
  assignBun,
  dropBun,
  insertFilling,
  deleteFilling,
  rearrangeFilling,
  resetBurger
} from './slice-constructor';

import { nanoid } from '@reduxjs/toolkit';
import type { TBurgerState } from './slice-constructor';

jest.mock('@reduxjs/toolkit', () => {
  const real = jest.requireActual<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit');
  return {
    ...real,
    nanoid: jest.fn(() => 'static-id'),
  };
});

describe('constructorReducer functionality', () => {
  const populatedState: TBurgerState = {
    base: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: 'bun-id'
    },
    fillings: [
      {
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        id: 'main-id'
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        id: 'sauce-id'
      }
    ]
  };

  test('полный сброс конструктора', () => {
    const output = constructorReducer(populatedState, resetBurger());
    expect(output).toEqual({ base: null, fillings: [] });
  });

  test('перестановка элементов внутри fillings', () => {
    const expected = {
      ...populatedState,
      fillings: [populatedState.fillings[1], populatedState.fillings[0]]
    };

    const actual = constructorReducer(
      populatedState,
      rearrangeFilling({ from: 0, to: 1 })
    );

    expect(actual).toEqual(expected);
  });

  test('удаление одного элемента по id', () => {
    const reduced = constructorReducer(
      populatedState,
      deleteFilling('main-id')
    );

    expect(reduced.fillings.length).toBe(1);
    expect(reduced.fillings[0].id).toBe('sauce-id');
  });

  test('добавление ингредиента с id через nanoid', () => {
    const newItem = {
      _id: '643d69a5c3f7b9001cfa0948',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
    };

    const expected = {
      ...populatedState,
      fillings: [...populatedState.fillings, { ...newItem, id: 'static-id' }]
    };

    const result = constructorReducer(populatedState, insertFilling(newItem));
    expect(nanoid).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  test('очистка булки', () => {
    const cleared = constructorReducer(populatedState, dropBun());
    expect(cleared.base).toBeNull();
  });

  test('назначение булки', () => {
    const newBun = {
      _id: 'abc123',
      name: 'Булка Светозара',
      type: 'bun',
      proteins: 12,
      fat: 22,
      carbohydrates: 30,
      calories: 390,
      price: 654,
      image: 'img.jpg',
      image_mobile: 'img-m.jpg',
      image_large: 'img-l.jpg'
    };

    const updated = constructorReducer(
      populatedState,
      assignBun(newBun)
    );

    expect(updated.base).toEqual({ ...newBun, id: 'static-id' });
  });
});