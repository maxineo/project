import React, { memo, ReactElement } from 'react';

import style from './PageNotFound.module.scss';

/**
 * Function which returns 404 page.
 *
 * @returns page not found component.
 */
const PageNotFound = (): ReactElement => {
  return (
    <div className={style.container}>
      <h2>404</h2>
      <p>Page not found</p>
    </div>
  );
};

export default memo(PageNotFound);
