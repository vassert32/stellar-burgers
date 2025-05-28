import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer, { getFeedThunk, getOrdersThunk } from './feedSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      feed: feedReducer
    }
  });

describe('Тесты экшенов ленты', () => {
  describe('Общая лента', () => {
    test('pending — ожидание ответа', () => {
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBe(true);
      expect(state.feed.error).toBeNull();
    });

    test('rejected — ошибка при получении', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getFeedThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBe(false);
      expect(state.feed.error).toBe(error);
    });

    test('fulfilled — успешный ответ', () => {
      const payload = {
        orders: {
          _id: '660e7df397ede0001d0643df',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2024-04-04T10:16:19.376Z',
          updatedAt: '2024-04-04T10:16:19.994Z',
          number: 37593
        },
        total: 37601,
        totalToday: 45
      };

      const store = setupStore();
      store.dispatch({
        type: getFeedThunk.fulfilled.type,
        payload
      });

      const state = store.getState();
      expect(state.feed.isLoading).toBe(false);
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(payload.orders);
      expect(state.feed.total).toBe(payload.total);
      expect(state.feed.totalToday).toBe(payload.totalToday);
    });
  });

  describe('Лента личного кабинета', () => {
    test('pending — ожидание ответа', () => {
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBe(true);
      expect(state.feed.error).toBeNull();
    });

    test('rejected — ошибка при получении', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBe(false);
      expect(state.feed.error).toBe(error);
    });

    test('fulfilled — успешный ответ', () => {
      const payload = {
        _id: '660e7df397ede0001d0643df',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-04-04T10:16:19.376Z',
        updatedAt: '2024-04-04T10:16:19.994Z',
        number: 37593
      };

      const store = setupStore();
      store.dispatch({
        type: getOrdersThunk.fulfilled.type,
        payload
      });

      const state = store.getState();
      expect(state.feed.isLoading).toBe(false);
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(payload);
    });
  });
});
