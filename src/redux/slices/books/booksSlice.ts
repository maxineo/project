import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from '../../../interfaces/Book/Book';
import { BooksState } from '../../../interfaces/Book/BooksState';

const initialState: BooksState = {
  books: { booksWithoutDate: [] },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateBookList(state, action: PayloadAction<Book[]>) {
      const newState: BooksState = {
        books: { booksWithoutDate: [] },
      };
      action.payload.forEach((item: Book) => {
        const year = item.publicationYear;
        if (typeof year === 'number') {
          if (year in newState.books) {
            newState.books[year] = [...newState.books[year], item];
          } else {
            newState.books[year] = [item];
          }
        } else {
          newState.books.booksWithoutDate = [
            ...newState.books.booksWithoutDate,
            item,
          ];
        }
      });
      state.books = newState.books;
    },
  },
});

export default booksSlice.reducer;

export const { updateBookList } = booksSlice.actions;
