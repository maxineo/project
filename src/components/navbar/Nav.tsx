import { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './Nav.module.scss';

/**
 *
 * @returns component with navigation bar.
 */
const Nav = (): ReactElement => {
  return (
    <div className={style.nav}>
      <h1 className={style.title}>Books</h1>

      <ul className={style.navList}>
        <Link to='/'>
          <li className={style.navItem}>Book list</li>
        </Link>
        <Link to='/add-book'>
          <li className={style.navItem}>Add book</li>
        </Link>
      </ul>
    </div>
  );
};

export default memo(Nav);
