import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (
        <div className="not-found">
          <h1>Whoops! Page not found.</h1>
          <h1>Return <Link to='/'>home</Link></h1>
        </div>
      );
    }}/>
  );
};