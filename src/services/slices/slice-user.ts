import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import exp from 'constants';

export type TUserSlice = {
  data: TUser | null;
  isLoading: boolean;
  errorMessage: string | null;
  resetEmailSent: boolean;
};

const initialState: TUserSlice = {
  data: null,
  isLoading: false,
  errorMessage: null,
  resetEmailSent: false
};

export const register = createAsyncThunk(
  'user/register',
  async (form: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(form);
      return {
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (credentials: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(credentials);
      return {
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; path=/; max-age=0';
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/update',
  async (partialData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(partialData);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendResetEmail = createAsyncThunk(
  'user/sendResetEmail',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await forgotPasswordApi({ email });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  'user/resetPassword',
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      await resetPasswordApi({ password, token });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearResetStatus: (state) => {
      state.resetEmailSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      })

      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      })

      .addCase(sendResetEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.resetEmailSent = true;
        state.isLoading = false;
      })
      .addCase(sendResetEmail.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      })

      .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.resetEmailSent = false;
        state.isLoading = false;
      })
      .addCase(resetUserPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      });
  }
});

export const { clearResetStatus } = slice.actions;
export const userReducer = slice.reducer;
export { initialState };