import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import ingredientsReducer from './slices/IngredientsSlice';
import constructorReducer from './slices/constructorSlice';

import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook
} from 'react-redux';

const reducerMap = {
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  constructorbg: constructorReducer
};

export const rootReducer = combineReducers(reducerMap);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => useAppDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
