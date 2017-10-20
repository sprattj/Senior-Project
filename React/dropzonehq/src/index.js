import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SheetsScreen from './Screens/SheetsScreen.jsx';
import EmployeeAdminScreen from './Screens/EmployeeAdminScreen.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<EmployeeAdminScreen />, document.getElementById('root'));
registerServiceWorker();
