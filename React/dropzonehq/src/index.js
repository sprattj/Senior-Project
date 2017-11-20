import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MainView from './Screens/MainView.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(<BrowserRouter>
    <MainView />
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
