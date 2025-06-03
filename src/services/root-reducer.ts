import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/slice-ingredients';
import { feedReducer } from './slices/slice-feeds';
import { ordersReducer } from './slices/slice-orders';
import { userReducer } from './slices/slice-user';
import { constructorReducer } from './slices/slice-constructor';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  orders: ordersReducer,
  user: userReducer,
  constructorBurger: constructorReducer
});

export type RootState = ReturnType<typeof rootReducer>;