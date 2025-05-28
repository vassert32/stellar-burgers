import { orderBurgerApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  loading: boolean;
  error: string | null;
  builderItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isOrderProcessing: boolean;
  modalOrder: TOrder | null;
};

const defaultState: TConstructorState = {
  loading: false,
  error: null,
  builderItems: {
    bun: null,
    ingredients: []
  },
  isOrderProcessing: false,
  modalOrder: null
};

export const submitOrder = createAsyncThunk(
  'constructor/submitOrder',
  async (ids: string[]) => {
    const result = await orderBurgerApi(ids);
    return result;
  }
);

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState: defaultState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.builderItems.bun = action.payload;
        } else {
          state.builderItems.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const uid = nanoid();
        return { payload: { ...item, id: uid } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.builderItems.ingredients = state.builderItems.ingredients.filter(
        (el) => el.id !== action.payload.id
      );
    },
    shiftItemUp: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i > 0) {
        const list = state.builderItems.ingredients;
        [list[i - 1], list[i]] = [list[i], list[i - 1]];
      }
    },
    shiftItemDown: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      const list = state.builderItems.ingredients;
      if (i < list.length - 1) {
        [list[i + 1], list[i]] = [list[i], list[i + 1]];
      }
    },
    resetState: () => defaultState
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isOrderProcessing = true;
        state.error = null;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isOrderProcessing = false;
        state.error = action.error.message || 'order failed';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isOrderProcessing = false;
        state.modalOrder = action.payload.order;
        state.builderItems.bun = null;
        state.builderItems.ingredients = [];
        state.error = null;
      });
  },
  selectors: {
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
    selectOrderStatus: (state) => state.isOrderProcessing,
    selectModalOrder: (state) => state.modalOrder,
    selectBuilderItems: (state) => state.builderItems
  }
});

export default constructorSlice;

export const {
  selectBuilderItems,
  selectOrderStatus,
  selectModalOrder,
  selectLoading,
  selectError
} = constructorSlice.selectors;

export const {
  addItem,
  deleteItem,
  shiftItemUp,
  shiftItemDown,
  resetState
} = constructorSlice.actions;
