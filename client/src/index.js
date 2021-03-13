import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Beforeunload } from 'react-beforeunload';

ReactDOM.render(
  <Beforeunload
    onBeforeunload={(event) => 'Możliwa utrata niezapisanych danych!!!'}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
    , document.getElementById('root')
  </Beforeunload>
);
