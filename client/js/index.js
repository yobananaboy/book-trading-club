import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.scss';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from '../../app/routes/routes';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../app/store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('application')
);