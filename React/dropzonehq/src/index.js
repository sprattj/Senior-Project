import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SheetsScreen from './Screens/SheetsScreen.jsx';
import EmployeeAdminScreen from './Screens/EmployeeAdminScreen.jsx';
import StatisticsScreen from './Screens/StatisticsScreen.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<StatisticsScreen />, document.getElementById('root'));
registerServiceWorker();
