import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SheetsScreen from './SheetsScreen.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<SheetsScreen />, document.getElementById('root'));
registerServiceWorker();
