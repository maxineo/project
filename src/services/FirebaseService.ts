import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

import db from '../firebase';

import { Book } from '../interfaces/Book/Book';
import { BooksState } from '../interfaces/Book/BooksState';

import { updateBookList } from '../redux/slices/books/booksSlice';

/**
 * Service for working with Firestore DB.
 */
export class FirebaseService {
  /**
   * Method for dynamical update of books.
   * @param dispatch - Dispatch function from redux.
   * @returns Function to start dynamic update.
   */
  public static dynamicUpdateBooks(
    dispatch: Dispatch<AnyAction> &
      ThunkDispatch<
        {
          books: BooksState;
        },
        null,
        AnyAction
      > &
      ThunkDispatch<
        {
          books: BooksState;
        },
        undefined,
        AnyAction
      >
  ) {
    return () =>
      onSnapshot(collection(db, 'books'), (snapshot) => {
        dispatch(
          updateBookList(
            snapshot.docs
              .map((item) => ({ ...item.data(), id: item.id } as Book))
              .sort((first: Book, second: Book) =>
                first.title > second.title ? 1 : -1
              )
          )
        );
      });
  }

  /**
   * Method for adding the book to the DB.
   * @param values - Values of the new book.
   * @returns Async function for adding the book to the DB.
   */
  public static addBook(values: Book) {
    return async () => {
      try {
        await addDoc(collection(db, 'books'), values);
      } catch (error) {
        throw error;
      }
    };
  }

  /**
   * Method for removing the book from the DB.
   * @param id - Id of the book to remove.
   * @returns Async function for removing the book from the DB.
   */
  public static removeBook(id: string) {
    return async () => {
      try {
        await deleteDoc(doc(db, 'books', id));
      } catch (error) {
        throw error;
      }
    };
  }

  /**
   * Method for updating the book in the DB.
   * @param id - Id of the book to update.
   * @param values - New values to update.
   * @returns Async function for updating the book in the DB.
   */
  public static editBook(id: string, values: Book) {
    return async () => {
      try {
        await setDoc(doc(db, 'books', id), values);
      } catch (error) {
        throw error;
      }
    };
  }

  /**
   * Method for getting the book with the given id.
   * @param id Id of the book.
   * @returns Async function which returns the book.
   */
  public static getBookById(id: string) {
    return async () => {
      try {
        const book = await getDoc(doc(db, 'books', id));
        return { ...book.data(), id: book.id } as Book;
      } catch (error) {
        throw error;
      }
    };
  }
}
