import { test, describe, expect } from '@jest/globals';
import { rootReducer } from './root-reducer';

import { initialState } from './slices/slice-user';
import { defaultFeedState } from './slices/slice-feeds';
import { ordersInitialState } from './slices/slice-orders';
import { defaultState } from './slices/slice-ingredients';
import { defaultBurgerState } from './slices/slice-constructor';

describe('Reducer: rootReducer', () => {
  test('возвращает начальное состояние при неизвестном типе действия', () => {
    const action = { type: 'non_existing_action_type' };

    const result = rootReducer(undefined, action);

    expect(result).toStrictEqual({
      user: initialState,
      feed: defaultFeedState,
      orders: ordersInitialState,
      ingredients: defaultState,
      constructorBurger: defaultBurgerState
    });
  });
});