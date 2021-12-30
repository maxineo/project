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

import { Book } from '../interfaces/book/Book';

import { BooksState, updateBookList } from '../redux/slices/books/booksSlice';

/**
 * Service for working with Firestore DB
 */
export class FirebaseService {
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
              .map((item) => {
                return { ...item.data(), id: item.id } as Book;
              })
              .sort((first: Book, second: Book) => {
                return first.title > second.title ? 1 : -1;
              })
          )
        );
      });
  }

  public static addBook(values: Book) {
    return async () => {
      try {
        await addDoc(collection(db, 'books'), values);
        return 'success';
      } catch (error) {
        throw error;
      }
    };
  }

  public static removeBook(id: string) {
    return async () => {
      try {
        await deleteDoc(doc(db, 'books', id));
      } catch (error) {
        throw error;
      }
    };
  }

  public static editBook(id: string, values: Book) {
    return async () => {
      try {
        await setDoc(doc(db, 'books', id), values);
      } catch (error) {
        throw error;
      }
    };
  }

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
