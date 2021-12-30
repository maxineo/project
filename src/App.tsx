import React, { memo, ReactElement } from 'react';

import AppRouter from './components/AppRouter/AppRouter';

import Nav from './components/Nav/Nav';

/**
 * The component with navigation bar and routes of the app.
 *
 * @returns component with the entire app.
 */
const App = (): ReactElement => {
  return (
    <div>
      <Nav />
      <AppRouter />
    </div>
  );
};

export default memo(App);
