import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TFeedState = {
  list: TOrder[];
  totalCount: number;
  todayCount: number;
  isFetching: boolean;
  failReason: string | null;
};

const defaultFeedState: TFeedState = {
  list: [],
  totalCount: 0,
  todayCount: 0,
  isFetching: false,
  failReason: null
};

export const loadFeed = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>('feed/load', async (_, { rejectWithValue }) => {
  try {
    const result = await getFeedsApi();
    return {
      orders: result.orders,
      total: result.total,
      totalToday: result.totalToday
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState: defaultFeedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state) => {
        state.isFetching = true;
        state.failReason = null;
      })
      .addCase(loadFeed.fulfilled, (state, action: PayloadAction<{ orders: TOrder[]; total: number; totalToday: number }>) => {
        state.list = action.payload.orders;
        state.totalCount = action.payload.total;
        state.todayCount = action.payload.totalToday;
        state.isFetching = false;
      })
      .addCase(loadFeed.rejected, (state, action) => {
        state.isFetching = false;
        state.failReason = action.payload ?? 'Ошибка получения ленты заказов';
      });
  }
});

export const feedReducer = feedSlice.reducer;
export { defaultFeedState };