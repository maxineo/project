import { Book } from './Book';

/**
 * Interface for books state.
 */
export interface BooksState {
  books: {
    [key: number]: Book[];
    booksWithoutDate: Book[];
  };
}
