import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type OrdersState = {
  orders: TOrder[];
  current: TOrder | null;
  isLoading: boolean;
  errorMessage: string | null;
};

const ordersInitialState: OrdersState = {
  orders: [],
  current: null,
  isLoading: false,
  errorMessage: null
};

export const loadOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/loadAll', async (_, { rejectWithValue }) => {
  try {
    const result = await getOrdersApi();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const submitOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[],
  { rejectValue: string }
>('orders/submit', async (ingredientIds, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(ingredientIds);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loadOrderByNumber = createAsyncThunk<
  TOrder[],
  number,
  { rejectValue: string }
>('orders/loadByNumber', async (num, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(num);
    return data.orders;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {
    resetCurrentOrder(state) {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loadOrders.fulfilled, (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || 'Ошибка при загрузке заказов';
      })

      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orders.unshift(order);
        state.current = order;
        state.isLoading = false;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || 'Ошибка при оформлении заказа';
      })

      .addCase(loadOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loadOrderByNumber.fulfilled, (state) => {
        state.current = null;
        state.isLoading = false;
      })
      .addCase(loadOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || 'Ошибка при получении заказа';
      });
  }
});

export const { resetCurrentOrder } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;
export { ordersInitialState };