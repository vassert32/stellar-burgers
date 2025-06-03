import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from 'src/utils/types';

export type TBurgerState = {
  base: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
};

const defaultBurgerState: TBurgerState = {
  base: null,
  fillings: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState: defaultBurgerState,
  reducers: {
    assignBun: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.base = action.payload;
      },
      prepare(rawItem: TIngredient) {
        return {
          payload: {
            ...rawItem,
            id: nanoid()
          }
        };
      }
    },
    dropBun(state) {
      state.base = null;
    },
    insertFilling: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.fillings.push(action.payload);
      },
      prepare(item: TIngredient) {
        return {
          payload: {
            ...item,
            id: nanoid()
          }
        };
      }
    },
    deleteFilling(state, action: PayloadAction<string>) {
      state.fillings = state.fillings.filter((el) => el.id !== action.payload);
    },
    rearrangeFilling(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const [item] = state.fillings.splice(from, 1);
      state.fillings.splice(to, 0, item);
    },
    resetBurger(state) {
      state.base = null;
      state.fillings = [];
    }
  }
});

export const {
  assignBun,
  dropBun,
  insertFilling,
  deleteFilling,
  rearrangeFilling,
  resetBurger
} = burgerSlice.actions;

export const constructorReducer = burgerSlice.reducer;
export { defaultBurgerState };