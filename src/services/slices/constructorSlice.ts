import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export interface ConstructorSliceState {
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const defaultState: ConstructorSliceState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const sendOrderThunk = createAsyncThunk(
  'constructor/sendOrder',
  (ingredientIds: string[]) => orderBurgerApi(ingredientIds)
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: defaultState,
  reducers: {
    addIngredient: (state, action) => {
      const item = action.payload;
      if (item.type === 'bun') {
        state.constructorItems.bun = item;
      } else {
        state.constructorItems.ingredients.push({
          ...item,
          id: nanoid()
        });
      }
    },
    removeIngredient: (state, action) => {
      const idToRemove = action.payload;
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
        (item) => item.id !== idToRemove
      );
    },
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },
    moveIngredientDown: (state, action) => {
      const idx = action.payload;
      const list = state.constructorItems.ingredients;
      [list[idx], list[idx + 1]] = [list[idx + 1], list[idx]];
    },
    moveIngredientUp: (state, action) => {
      const idx = action.payload;
      const list = state.constructorItems.ingredients;
      [list[idx], list[idx - 1]] = [list[idx - 1], list[idx]];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message ?? 'Ошибка при отправке заказа';
      })
      .addCase(sendOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = payload.order;
        state.constructorItems = { bun: null, ingredients: [] };
      });
  }
});

export { defaultState as constructorInitialState };

export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setNullOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;

export const { getConstructorSelector } = constructorSlice.selectors;

export default constructorSlice.reducer;
