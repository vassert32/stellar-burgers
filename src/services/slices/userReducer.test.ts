import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserThunk
} from './userSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

describe('Тесты экшенов клиента', () => {
  describe('Логин', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: loginUserThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const payload = {
        accessToken: 'mockAccess',
        refreshToken: 'mockRefresh',
        user: { email: 'lleksiv@gmail.com', name: 'Georg Shakillow' }
      };
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.fulfilled.type, payload });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(payload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Регистрация', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: registerUserThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const payload = {
        accessToken: 'mockAccess',
        refreshToken: 'mockRefresh',
        user: { email: 'lleksiv@gmail.com', name: 'Georg Shakillow' }
      };
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.fulfilled.type, payload });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(payload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Логаут', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: logoutUserThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.fulfilled.type, payload: { message: 'OK' } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Обновление пользователя', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: updateUserThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const payload = {
        user: { email: 'lleksiv@gmail.com', name: 'Georg Shakillow' }
      };
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.fulfilled.type, payload });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(payload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Восстановление пароля', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: forgotPasswordThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.fulfilled.type, payload: { message: 'OK' } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Сброс пароля', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: resetPasswordThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.fulfilled.type, payload: { message: 'OK' } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Получение данных пользователя', () => {
    test('pending', () => {
      const store = setupStore();
      store.dispatch({ type: getUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.error).toBeNull();
    });

    test('rejected', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: getUserThunk.rejected.type, error: { message: error } });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });

    test('fulfilled', () => {
      const payload = {
        user: { email: 'lleksiv@gmail.com', name: 'Georg Shakillow' }
      };
      const store = setupStore();
      store.dispatch({ type: getUserThunk.fulfilled.type, payload });
      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(payload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });
});
