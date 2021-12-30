import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Books from './components/books/Books';
import Nav from './components/navbar/Nav';
import NewBookForm from './components/newBookForm/NewBookForm';
import EditBookForm from './components/editBookForm/EditBookForm';
import PageNotFound from './components/PageNotFound/PageNotFound';

/**
 * The component with navigation bar and routes of the app.
 * @returns component with the entire app.
 */
function App() {
  useEffect(() => {});

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/add-book' element={<NewBookForm />} />
        <Route path='/edit-book/:id' element={<EditBookForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
