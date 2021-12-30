import { memo, ReactElement } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Path } from '../../interfaces/Path/Path';

import Books from '../Books/Books';
import EditBookForm from '../editBookForm/EditBookForm';
import NewBookForm from '../NewBookForm/NewBookForm';
import PageNotFound from '../PageNotFound/PageNotFound';

import style from './AppRouter.module.scss';

const paths: Path[] = [
  { path: '/', element: <Books /> },
  { path: '/add-book', element: <NewBookForm /> },
  { path: '/edit-book/:id', element: <EditBookForm /> },
  { path: '*', element: <PageNotFound /> },
];

/**
 * Function which returns app router.
 *
 * @returns component with app router.
 */
const AppRouter = (): ReactElement => {
  return (
    <div className={style.wrapper}>
      <Routes>
        {paths.map((item: Path) => {
          return <Route path={item.path} element={item.element} />;
        })}
      </Routes>
    </div>
  );
};

export default memo(AppRouter);
