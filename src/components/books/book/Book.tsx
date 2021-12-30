import React, { memo, ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Book } from '../../../interfaces/Book/Book';

import { FirebaseService } from '../../../services/FirebaseService';

import style from './Book.module.scss';

/**
 * Function which returns component with book information.
 *
 * @param id - id of the book.
 * @param title - title of the book.
 * @param authors - array with the names of the authors.
 * @param publicationYear - publication year of the book.
 * @param rating - rating of the book.
 * @param ISBN - ISBN of the book.
 * @returns component with book information.
 */
const BookComponent = ({
  id,
  title,
  authors,
  publicationYear,
  rating,
  ISBN,
}: Book): ReactElement => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>{title}</h3>
      </div>
      <div className={style.header}>
        <div className={style.authors}>
          {authors.map((item, index, array) => {
            return index !== array.length - 1 ? (
              <p key={index}>{`${item},`}</p>
            ) : (
              <p key={index}>{`${item}`}</p>
            );
          })}
        </div>
        <div className={style['publication-year']}>
          <p>{publicationYear}</p>
        </div>
      </div>
      <div className={style.rating}>
        <div className={style['rating-circle']}>
          <p>{rating ? rating : 0}</p>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.isbn}>
          <p>{ISBN}</p>
        </div>
        <div className={style.buttons}>
          <Link to={`/edit-book/${id}`} className={style.button}>
            Edit
          </Link>
          <button
            className={style.button}
            onClick={FirebaseService.removeBook(id!)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(BookComponent);
