import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import {
  ordersReducer,
  loadOrders,
  submitOrder,
  loadOrderByNumber,
  resetCurrentOrder
} from './slice-orders';

import * as api from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

const prepareStore = () =>
  configureStore({
    reducer: {
      orders: ordersReducer
    }
  });

const mockOrder: TOrder = {
  _id: 'vlg-001',
  number: 99234,
  name: "Экзобургер 'Вологда'",
  status: 'done',
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0940'],
  createdAt: '2025-05-27T09:00:00.000Z',
  updatedAt: '2025-05-27T09:05:00.000Z'
};

describe('orders slice: async + reducers', () => {
  let store: ReturnType<typeof prepareStore>;

  beforeEach(() => {
    store = prepareStore();
  });

  describe('loadOrders', () => {
    test('pending включает загрузку', () => {
      store.dispatch({ type: loadOrders.pending.type });
      const state = store.getState().orders;
      expect(state.isLoading).toBe(true);
      expect(state.errorMessage).toBeNull();
    });

    test('fulfilled сохраняет список заказов', () => {
      store.dispatch({ type: loadOrders.fulfilled.type, payload: [mockOrder] });
      const state = store.getState().orders;
      expect(state.orders).toEqual([mockOrder]);
      expect(state.isLoading).toBe(false);
    });

    test('rejected с текстом ошибки', () => {
      store.dispatch({ type: loadOrders.rejected.type, payload: 'Нет соединения' });
      expect(store.getState().orders.errorMessage).toBe('Нет соединения');
    });

    test('rejected без payload', () => {
      store.dispatch({ type: loadOrders.rejected.type });
      expect(store.getState().orders.errorMessage).toBe('Ошибка при загрузке заказов');
    });
  });

  describe('submitOrder', () => {
    test('pending включает флаг загрузки', () => {
      store.dispatch({ type: submitOrder.pending.type });
      expect(store.getState().orders.isLoading).toBe(true);
    });

    test('успешный submit сохраняет заказ и current', () => {
      store.dispatch({
        type: submitOrder.fulfilled.type,
        payload: { order: mockOrder, name: 'Готово' }
      });
      const state = store.getState().orders;
      expect(state.orders[0]).toEqual(mockOrder);
      expect(state.current).toEqual(mockOrder);
      expect(state.isLoading).toBe(false);
    });

    test('ошибка submit с payload', () => {
      store.dispatch({ type: submitOrder.rejected.type, payload: 'Ошибка сервера' });
      expect(store.getState().orders.errorMessage).toBe('Ошибка сервера');
    });

    test('ошибка submit без payload', () => {
      store.dispatch({ type: submitOrder.rejected.type });
      expect(store.getState().orders.errorMessage).toBe('Ошибка при оформлении заказа');
    });
  });

  describe('loadOrderByNumber', () => {
    test('pending сбрасывает ошибку', () => {
      store.dispatch({ type: loadOrderByNumber.pending.type });
      expect(store.getState().orders.errorMessage).toBeNull();
    });

    test('успешный fetch обнуляет current', () => {
      store.dispatch({ type: loadOrderByNumber.fulfilled.type, payload: [mockOrder] });
      expect(store.getState().orders.current).toBeNull();
    });

    test('ошибка при поиске по номеру', () => {
      store.dispatch({ type: loadOrderByNumber.rejected.type, payload: 'Not found' });
      expect(store.getState().orders.errorMessage).toBe('Not found');
    });

    test('ошибка без payload', () => {
      store.dispatch({ type: loadOrderByNumber.rejected.type });
      expect(store.getState().orders.errorMessage).toBe('Ошибка при получении заказа');
    });
  });

  describe('resetCurrentOrder', () => {
    test('сбрасывает текущий заказ', () => {
      store.dispatch({ type: submitOrder.fulfilled.type, payload: { order: mockOrder, name: 'OK' } });
      expect(store.getState().orders.current).toEqual(mockOrder);

      store.dispatch(resetCurrentOrder());
      expect(store.getState().orders.current).toBeNull();
    });
  });

  describe('моки API-функций', () => {
    test('loadOrders ловит ошибку', async () => {
      jest.spyOn(api, 'getOrdersApi').mockRejectedValueOnce(new Error('fail net'));
      await store.dispatch(loadOrders());
      expect(store.getState().orders.errorMessage).toBe('fail net');
    });

    test('submitOrder ловит ошибку', async () => {
      jest.spyOn(api, 'orderBurgerApi').mockRejectedValueOnce(new Error('ошибка оформления'));
      await store.dispatch(submitOrder(['x', 'y']));
      expect(store.getState().orders.errorMessage).toBe('ошибка оформления');
    });

    test('loadOrderByNumber ловит ошибку', async () => {
      jest.spyOn(api, 'getOrderByNumberApi').mockRejectedValueOnce(new Error('не найден'));
      await store.dispatch(loadOrderByNumber(99234));
      expect(store.getState().orders.errorMessage).toBe('не найден');
    });
  });
});