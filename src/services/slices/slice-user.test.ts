import {
  userReducer,
  initialState,
  clearResetStatus,
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  sendResetEmail,
  resetUserPassword
} from './slice-user';
import type { TUserSlice } from './slice-user';

describe('userSlice: reducer and async flow', () => {
  let state: TUserSlice;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('возврат initialState при неизвестном action', () => {
    const result = userReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  test('clearResetStatus сбрасывает флаг', () => {
    const prefilled = { ...state, resetEmailSent: true };
    const next = userReducer(prefilled, clearResetStatus());
    expect(next.resetEmailSent).toBe(false);
  });

  describe('register', () => {
    test('pending включает isLoading', () => {
      const next = userReducer(state, { type: register.pending.type });
      expect(next.isLoading).toBe(true);
      expect(next.errorMessage).toBeNull();
    });

    test('fulfilled записывает user', () => {
      const payload = {
        user: { name: 'Vologda', email: 'kozinak@yandex.go' },
        accessToken: 'tok',
        refreshToken: 'ref'
      };
      const next = userReducer(state, { type: register.fulfilled.type, payload });
      expect(next.data).toEqual(payload.user);
      expect(next.isLoading).toBe(false);
    });

    test('rejected сохраняет ошибку', () => {
      const next = userReducer(state, {
        type: register.rejected.type,
        payload: 'reg error'
      });
      expect(next.errorMessage).toBe('reg error');
    });
  });

  describe('login', () => {
    test('pending сбрасывает ошибку и активирует загрузку', () => {
      const next = userReducer(state, { type: login.pending.type });
      expect(next.isLoading).toBe(true);
      expect(next.errorMessage).toBeNull();
    });

    test('fulfilled записывает данные', () => {
      const payload = {
        user: { name: 'Vologda', email: 'kozinak@yandex.go' },
        accessToken: '123',
        refreshToken: '456'
      };
      const next = userReducer(state, { type: login.fulfilled.type, payload });
      expect(next.data).toEqual(payload.user);
    });

    test('rejected сохраняет ошибку', () => {
      const next = userReducer(state, {
        type: login.rejected.type,
        payload: 'login fail'
      });
      expect(next.errorMessage).toBe('login fail');
    });
  });

  describe('logout', () => {
    test('pending активирует флаг загрузки', () => {
      const next = userReducer(state, { type: logout.pending.type });
      expect(next.isLoading).toBe(true);
    });

    test('fulfilled очищает пользователя', () => {
      const pre = { ...state, data: { name: 'Test', email: 'test@test.com' } };
      const next = userReducer(pre, { type: logout.fulfilled.type });
      expect(next.data).toBeNull();
    });

    test('rejected записывает ошибку', () => {
      const next = userReducer(state, {
        type: logout.rejected.type,
        payload: 'logout err'
      });
      expect(next.errorMessage).toBe('logout err');
    });
  });

  describe('getProfile', () => {
    test('pending: загрузка активна', () => {
      const next = userReducer(state, { type: getProfile.pending.type });
      expect(next.isLoading).toBe(true);
    });

    test('fulfilled: записывает пользователя', () => {
      const user = { name: 'Vologda', email: 'kozinak@yandex.go' };
      const next = userReducer(state, {
        type: getProfile.fulfilled.type,
        payload: user
      });
      expect(next.data).toEqual(user);
    });

    test('rejected: пишет ошибку', () => {
      const next = userReducer(state, {
        type: getProfile.rejected.type,
        payload: 'fetch fail'
      });
      expect(next.errorMessage).toBe('fetch fail');
    });
  });

  describe('updateProfile', () => {
    test('pending включает загрузку', () => {
      const next = userReducer(state, { type: updateProfile.pending.type });
      expect(next.isLoading).toBe(true);
    });

    test('fulfilled: обновляет профиль', () => {
      const updated = { name: 'Updated', email: 'updated@mail.com' };
      const next = userReducer(state, {
        type: updateProfile.fulfilled.type,
        payload: updated
      });
      expect(next.data).toEqual(updated);
    });

    test('rejected: ошибка обновления', () => {
      const next = userReducer(state, {
        type: updateProfile.rejected.type,
        payload: 'update err'
      });
      expect(next.errorMessage).toBe('update err');
    });
  });

  describe('sendResetEmail', () => {
    test('pending активирует загрузку', () => {
      const next = userReducer(state, { type: sendResetEmail.pending.type });
      expect(next.isLoading).toBe(true);
    });

    test('fulfilled: устанавливает resetEmailSent', () => {
      const next = userReducer(state, { type: sendResetEmail.fulfilled.type });
      expect(next.resetEmailSent).toBe(true);
      expect(next.isLoading).toBe(false);
    });

    test('rejected: сохраняет ошибку', () => {
      const next = userReducer(state, {
        type: sendResetEmail.rejected.type,
        payload: 'email fail'
      });
      expect(next.errorMessage).toBe('email fail');
    });
  });

  describe('resetUserPassword', () => {
    test('pending: загрузка включена', () => {
      const next = userReducer(state, { type: resetUserPassword.pending.type });
      expect(next.isLoading).toBe(true);
    });

    test('fulfilled: сбрасывает resetEmailSent', () => {
      const pre = { ...state, resetEmailSent: true };
      const next = userReducer(pre, { type: resetUserPassword.fulfilled.type });
      expect(next.resetEmailSent).toBe(false);
    });

    test('rejected: сохраняет ошибку', () => {
      const next = userReducer(state, {
        type: resetUserPassword.rejected.type,
        payload: 'reset err'
      });
      expect(next.errorMessage).toBe('reset err');
    });
  });
});