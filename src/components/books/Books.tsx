import React, { memo, ReactElement, useEffect } from 'react';

import BookComponent from './book/Book';

import { Book } from '../../interfaces/book/Book';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BooksState } from '../../redux/slices/books/booksSlice';

import { FirebaseService } from '../../services/FirebaseService';

import style from './Books.module.scss';

/**
 *
 * @returns component with recommended book and books grouped by publication year and sorted by name.
 */
const Books = (): ReactElement => {
  const dispatch = useAppDispatch();
  const bookList: BooksState = useAppSelector((state) => state.books);
  const years = Object.keys(bookList.books).reverse().splice(1);

  /**
   * React hook which uses FirebaseService to subscribe to Firestore and dispatch changes to redux.
   */
  useEffect(() => {
    const firebaseUpdater = FirebaseService.dynamicUpdateBooks(dispatch)();

    return firebaseUpdater;
  }, [dispatch]);

  let recommendedBookList: Book[] = [];
  const currentYear = new Date().getFullYear();
  let maxRating = 0;
  years.forEach((year) => {
    if (currentYear - Number(year) >= 3) {
      for (let i = 0; i < bookList.books[Number(year)].length; i++) {
        if (bookList.books[Number(year)][i].rating! > maxRating) {
          recommendedBookList = [bookList.books[Number(year)][i]];
          maxRating = Number(bookList.books[Number(year)][i].rating);
        } else if (bookList.books[Number(year)][i].rating! === maxRating) {
          recommendedBookList.push(bookList.books[Number(year)][i]);
        }
      }
    }
  });

  const recommendedBook: Book | null = recommendedBookList.length
    ? recommendedBookList[
        Math.floor(Math.random() * recommendedBookList.length)
      ]
    : null;

  return (
    <div className={style.container}>
      {recommendedBook && (
        <div className={style.yearGroup}>
          <h4>Recommended book</h4>
          <div className={style.books}>
            <BookComponent
              id={recommendedBook.id}
              title={recommendedBook.title}
              authors={recommendedBook.authors}
              publicationYear={recommendedBook.publicationYear}
              rating={recommendedBook.rating}
              ISBN={recommendedBook.ISBN}
            />
          </div>
        </div>
      )}
      {years.map((item, index) => {
        return (
          <div className={style.yearGroup} key={index}>
            <h4>{item}</h4>
            <div className={style.books}>
              {bookList.books[Number(item)].map((item: Book, index) => {
                return (
                  <BookComponent
                    id={item.id}
                    title={item.title}
                    authors={item.authors}
                    publicationYear={item.publicationYear}
                    rating={item.rating}
                    ISBN={item.ISBN}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      {bookList.books['booksWithoutDate'].length !== 0 && (
        <div className={style.yearGroup}>
          <h4>Books without publication date</h4>
          <div className={style.books}>
            {bookList.books['booksWithoutDate'].map((item: Book, index) => {
              return (
                <BookComponent
                  id={item.id}
                  title={item.title}
                  authors={item.authors}
                  publicationYear={item.publicationYear}
                  rating={item.rating}
                  ISBN={item.ISBN}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Books);
