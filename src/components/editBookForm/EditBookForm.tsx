import React, { memo, useEffect, ReactElement } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikValues,
} from 'formik';

import { FirebaseService } from '../../services/FirebaseService';

import { Book } from '../../interfaces/Book/Book';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  resetEditableBookValues,
  updateEditableBookValues,
} from '../../redux/slices/editableBook/editableBookSlice';

import isISBN from '../../utils/isISBN';

import style from './EditBookForm.module.scss';

/**
 * Function which validates values from the form.
 *
 * @param values - values from the form.
 * @returns object with errors.
 */
const validateForm = (values: Book) => {
  const errors: FormikErrors<FormikValues> = {};

  if (!values.title.trim()) {
    errors.title = 'Title must not be empty';
  }
  if (values.title.trim() && values.title.trim().length > 100) {
    errors.title = 'Title length must be lower than 100';
  }

  errors.authors = ['You have to provide at least one author'];
  for (let author of values.authors) {
    if (author.trim()) {
      delete errors.authors;
      break;
    }
  }

  if (values.publicationYear && values.publicationYear < 1800) {
    errors.publicationYear = 'Publication year must be more than 1800';
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (values.publicationYear && values.publicationYear > currentYear) {
    errors.publicationYear = `Publication year must be lower than ${
      currentYear + 1
    }`;
  }

  if (values.rating && values.rating < 0) {
    errors.rating = 'Rating must not be negative value';
  }

  if (values.rating && values.rating > 10) {
    errors.rating = 'Rating must be lower than 10';
  }

  if (values.ISBN && !isISBN(values.ISBN)) {
    errors.ISBN = 'ISBN wrong';
  }

  return errors;
};

/**
 * Component with the form to edit the book.
 *
 * @returns Component with the form to edit the book.
 */
const EditBookForm = (): ReactElement => {
  const searchParams = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  /**
   * React hook to get values of the editable book from the Firestore and dispatch them to redux.
   */
  useEffect(() => {
    dispatch(resetEditableBookValues());

    const fetchEditableBook = async () => {
      const response: Book | null = searchParams.id
        ? await FirebaseService.getBookById(searchParams.id)()
        : null;
      if (response?.title) {
        dispatch(updateEditableBookValues(response));
      } else {
        navigate('/404');
      }
    };
    fetchEditableBook();
  }, [dispatch, searchParams.id, navigate]);

  const initialValues = useAppSelector(
    (state) => state.editableBook.editableBook
  );

  return (
    <div className={style.container}>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        enableReinitialize={true}
        validateOnChange={false}
        onSubmit={async (
          values: Book,
          { setSubmitting, resetForm }: FormikHelpers<Book>
        ) => {
          try {
            await FirebaseService.editBook(searchParams.id!, values)();

            setSubmitting(false);

            resetForm({});

            navigate('/');
          } catch (error) {
            throw error;
          }
        }}
      >
        {({ values, errors, touched }) => (
          <Form className={style.form}>
            <div
              className={
                touched.title && errors.title
                  ? `${style['form-block']} ${style['wrong-input']}`
                  : `${style['form-block']}`
              }
            >
              <label htmlFor='title'>Title</label>
              <Field
                id='title'
                name='title'
                placeholder='Title'
                className={style['field-row']}
              />
              {touched.title && errors.title && <div>{errors.title}</div>}
            </div>

            <FieldArray name='authors'>
              {({ remove, push }) => {
                return (
                  <div
                    className={
                      touched.authors && errors.authors
                        ? `${style['form-block']} ${style['wrong-input']}`
                        : `${style['form-block']}`
                    }
                  >
                    {values.authors.length < 2 ? (
                      <div className={style.authors}>
                        <label htmlFor='authors.0'>Authors</label>
                        <Field
                          id='authors.0'
                          name='authors.0'
                          placeholder='Author`s name'
                          className={style['field-row']}
                        />
                      </div>
                    ) : (
                      <div className={style.authors}>
                        <label htmlFor={`authors.1`}>Authors</label>
                        {values.authors.map((item, index) => (
                          <div key={index} className={style.authors}>
                            <Field
                              id={`authors.${index}`}
                              name={`authors.${index}`}
                              placeholder='Author`s name'
                              className={style['field-row']}
                            />
                            <button
                              type='button'
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {touched.authors && errors.authors && (
                      <div>{errors.authors}</div>
                    )}
                    <button
                      type='button'
                      onClick={() => {
                        push('');
                      }}
                    >
                      Another author
                    </button>
                  </div>
                );
              }}
            </FieldArray>

            <div
              className={
                touched.publicationYear && errors.publicationYear
                  ? `${style['form-block']} ${style['wrong-input']}`
                  : `${style['form-block']}`
              }
            >
              <label htmlFor='publicationYear'>Publication year</label>
              <Field
                id='publicationYear'
                name='publicationYear'
                placeholder='Publication year'
                type='number'
                min='1800'
                step='1'
                className={style['field-row']}
              />
              {touched.publicationYear && errors.publicationYear && (
                <div>{errors.publicationYear}</div>
              )}
            </div>

            <div
              className={
                touched.rating && errors.rating
                  ? `${style['form-block']} ${style['wrong-input']}`
                  : `${style['form-block']}`
              }
            >
              <label htmlFor='rating'>Rating</label>
              <Field
                id='rating'
                name='rating'
                placeholder='Rating'
                type='number'
                min='0'
                max='10'
                step='1'
                className={style['field-row']}
              />
              {touched.rating && errors.rating && <div>{errors.rating}</div>}
            </div>

            <div
              className={
                touched.ISBN && errors.ISBN
                  ? `${style['form-block']} ${style['wrong-input']}`
                  : `${style['form-block']}`
              }
            >
              <label htmlFor='ISBN'>ISBN</label>
              <Field
                id='ISBN'
                name='ISBN'
                placeholder='ISBN'
                className={style['field-row']}
              />
              {touched.ISBN && errors.ISBN && <div>{errors.ISBN}</div>}
            </div>

            <button type='submit'>Edit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(EditBookForm);
