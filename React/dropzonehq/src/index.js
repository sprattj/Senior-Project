import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MainView from './Screens/MainView.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import EmployeeAdminScreen from './Screens/EmployeeAdminScreen.jsx';

ReactDOM.render(<MainView />, document.getElementById('root'));
registerServiceWorker();
