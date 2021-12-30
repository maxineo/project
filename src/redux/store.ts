import { combineReducers, configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/books/booksSlice';
import editableBookReducer from './slices/editableBook/editableBookSlice';

const reducers = combineReducers({
  books: booksReducer,
  editableBook: editableBookReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
