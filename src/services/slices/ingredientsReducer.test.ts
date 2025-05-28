import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { getIngredientsThunk } from './IngredientsSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

describe('Тесты экшенов ингредиентов', () => {
  describe('Получение ингредиентов', () => {
    test('pending — ожидание запроса', () => {
      const store = setupStore();
      store.dispatch({ type: getIngredientsThunk.pending.type });

      const state = store.getState();
      expect(state.ingredients.isLoading).toBe(true);
      expect(state.ingredients.error).toBeNull();
    });

    test('rejected — ошибка при запросе', () => {
      const store = setupStore();
      const errorMsg = 'mocked error';

      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: { message: errorMsg }
      });

      const state = store.getState();
      expect(state.ingredients.isLoading).toBe(false);
      expect(state.ingredients.error).toBe(errorMsg);
    });

    test('fulfilled — успешный ответ', () => {
      const mockedPayload = {
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
      };

      const store = setupStore();
      store.dispatch({
        type: getIngredientsThunk.fulfilled.type,
        payload: mockedPayload
      });

      const state = store.getState();
      expect(state.ingredients.isLoading).toBe(false);
      expect(state.ingredients.error).toBeNull();
      expect(state.ingredients.ingredients).toEqual(mockedPayload);
    });
  });
});
