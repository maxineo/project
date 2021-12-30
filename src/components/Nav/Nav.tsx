import { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './Nav.module.scss';

/**
 * Function which returns navigation bar.
 *
 * @returns component with navigation bar.
 */
const Nav = (): ReactElement => {
  return (
    <nav className={style.nav}>
      <Link to='/' className={style.title}>
        <h1>Books</h1>
      </Link>
      <ul className={style['nav-list']}>
        <Link to='/'>
          <li className={style['nav-item']}>Book list</li>
        </Link>
        <Link to='/add-book'>
          <li className={style['nav-item']}>Add book</li>
        </Link>
      </ul>
    </nav>
  );
};

export default memo(Nav);
