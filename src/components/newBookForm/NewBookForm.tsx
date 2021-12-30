import React, { memo, ReactElement } from 'react';

import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikValues,
} from 'formik';

import { Book } from '../../interfaces/book/Book';

import { FirebaseService } from '../../services/FirebaseService';

import style from './NewBookForm.module.scss';

/**
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

  return errors;
};

/**
 * Component with the form to add the book.
 * @returns Component with the form to add the book.
 */
const NewBookForm = (): ReactElement => {
  return (
    <div className={style.container}>
      <Formik
        initialValues={{
          title: '',
          authors: [''],
          publicationYear: '',
          rating: '',
          ISBN: '',
        }}
        validate={validateForm}
        validateOnChange={false}
        onSubmit={async (
          values: Book,
          { setSubmitting, resetForm }: FormikHelpers<Book>
        ) => {
          try {
            await FirebaseService.addBook(values)();
            setSubmitting(false);
            resetForm({});
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
                  ? `${style.formBlock} ${style.wrongInput}`
                  : `${style.formBlock}`
              }
            >
              <label htmlFor='title'>Title</label>
              <Field
                id='title'
                name='title'
                placeholder='title'
                className={style.fieldRow}
              />
              {touched.title && errors.title && <div>{errors.title}</div>}
            </div>

            <FieldArray name='authors'>
              {({ remove, push }) => {
                return (
                  <div
                    className={
                      touched.authors && errors.authors
                        ? `${style.formBlock} ${style.wrongInput}`
                        : `${style.formBlock}`
                    }
                  >
                    {values.authors.length < 2 ? (
                      <div className={style.authors}>
                        <label htmlFor='authors.0'>Authors</label>
                        <Field
                          id='authors.0'
                          name='authors.0'
                          placeholder='author'
                          className={style.fieldRow}
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
                              placeholder='author'
                              className={style.fieldRow}
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
                  ? `${style.formBlock} ${style.wrongInput}`
                  : `${style.formBlock}`
              }
            >
              <label htmlFor='publicationYear'>Publication year</label>
              <Field
                id='publicationYear'
                name='publicationYear'
                placeholder='publicationYear'
                type='number'
                min='1800'
                step='1'
                className={style.fieldRow}
              />
              {touched.publicationYear && errors.publicationYear && (
                <div>{errors.publicationYear}</div>
              )}
            </div>

            <div
              className={
                touched.rating && errors.rating
                  ? `${style.formBlock} ${style.wrongInput}`
                  : `${style.formBlock}`
              }
            >
              <label htmlFor='rating'>Rating</label>
              <Field
                id='rating'
                name='rating'
                placeholder='rating'
                type='number'
                min='0'
                max='10'
                step='1'
                className={style.fieldRow}
              />
              {touched.rating && errors.rating && <div>{errors.rating}</div>}
            </div>

            <div
              className={
                touched.ISBN && errors.ISBN
                  ? `${style.formBlock} ${style.wrongInput}`
                  : `${style.formBlock}`
              }
            >
              <label htmlFor='ISBN'>ISBN</label>
              <Field
                id='ISBN'
                name='ISBN'
                placeholder='ISBN'
                className={style.fieldRow}
              />
              {touched.ISBN && errors.ISBN && <div>{errors.ISBN}</div>}
            </div>

            <button type='submit'>Add</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(NewBookForm);
