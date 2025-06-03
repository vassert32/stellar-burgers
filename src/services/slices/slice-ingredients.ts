import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  errorMessage: string | null;
};

const defaultState: TIngredientsState = {
  data: [],
  isLoading: false,
  errorMessage: null
};

export const loadIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/loadAll', async (_, { rejectWithValue }) => {
  try {
    const result = await getIngredientsApi();
    return result;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload ?? 'Ошибка загрузки ингредиентов';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export { defaultState };