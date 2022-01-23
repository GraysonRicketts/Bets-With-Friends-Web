import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './app/App';
import ReactGA from 'react-ga';
import { NODE_ENV } from './config';

// Setup analytics
if (NODE_ENV === 'production') {
  ReactGA.initialize('G-HZ8BVZD9RD');
  ReactGA.pageview(window.location.pathname + window.location.search);
} 

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <App />
      </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
