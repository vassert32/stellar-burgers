import { describe, test, expect, jest } from '@jest/globals';
import { ingredientsReducer, loadIngredients } from './slice-ingredients';
import { configureStore } from '@reduxjs/toolkit';
import * as burgerApi from '../../utils/burger-api';

const initTestStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

describe('loadIngredients async thunk (ингредиенты)', () => {
  test('обработка ошибки без payload (fallback)', () => {
    const store = initTestStore();

    store.dispatch({
      type: loadIngredients.rejected.type,
      payload: undefined,
      error: { message: 'fail' }
    });

    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('Ошибка загрузки ингредиентов');
  });

  test('успешная загрузка данных по loadIngredients', async () => {
    const store = initTestStore();

    const mockIngredients = [
      {
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
      }
    ];

    jest.spyOn(burgerApi, 'getIngredientsApi').mockResolvedValueOnce(mockIngredients);

    await store.dispatch(loadIngredients());

    const result = store.getState().ingredients;
    expect(result.isLoading).toBe(false);
    expect(result.data).toEqual(mockIngredients);
    expect(result.errorMessage).toBeNull();
  });

  test('обработка исключения при загрузке', async () => {
    const store = initTestStore();
    const errorText = 'Сервер недоступен';

    jest.spyOn(burgerApi, 'getIngredientsApi').mockRejectedValueOnce(new Error(errorText));

    await store.dispatch(loadIngredients());

    const result = store.getState().ingredients;
    expect(result.isLoading).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.errorMessage).toBe(errorText);
  });
});