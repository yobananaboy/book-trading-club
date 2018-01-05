import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.scss';
import App from '../../app/component/App';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from '../../app/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('application')
);