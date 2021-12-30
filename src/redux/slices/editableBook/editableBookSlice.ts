import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from '../../../interfaces/Book/Book';

/**
 * Interface for editable book state.
 */
interface EditableBookState {
  editableBook: Book;
}

const initialState: EditableBookState = {
  editableBook: {
    id: '',
    title: '',
    authors: [''],
    publicationYear: '',
    rating: '',
    ISBN: '',
  },
};

const editableBookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateEditableBookValues(state, action: PayloadAction<Book>) {
      state.editableBook = action.payload;
    },
    resetEditableBookValues(state) {
      state.editableBook = initialState.editableBook;
    },
  },
});

export default editableBookSlice.reducer;

export const { updateEditableBookValues, resetEditableBookValues } =
  editableBookSlice.actions;
