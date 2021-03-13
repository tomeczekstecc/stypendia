import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { Beforeunload } from 'react-beforeunload';

ReactDOM.render(
  <React.StrictMode>
    <Beforeunload onBeforeunload={(event) => event.preventDefault()}>
      <App />
    </Beforeunload>
  </React.StrictMode>,

  document.getElementById('root')
);
