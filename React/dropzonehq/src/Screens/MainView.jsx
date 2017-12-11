import React from 'react';
import MainScreen from './MainScreen.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Switch, Route } from 'react-router-dom'
import EmployeeAdminScreen from '../Screens/EmployeeAdminScreen.jsx';
import RentalScreen from '../Screens/RentalScreen.jsx';
import SheetsScreen from '../Screens/SheetsScreen.jsx';
import EmployeeInfoScreen from '../Screens/EmployeeInfoScreen.jsx';
import InventoryScreen from '../Screens/InventoryScreen.jsx';
import LoftScreen from '../Screens/LoftScreen.jsx';
import CreateDropzoneScreen from './CreateDropzoneScreen.jsx';
import LoginScreen from './LoginScreen.jsx';
import PasswordResetScreen from './PasswordResetScreen.jsx';
import LandingScreen from './LandingScreen.jsx';
import NotFoundScreen from './NotFoundScreen.jsx';

/*
    MainView is the main wrapper component to decide what to render.
    It has a state "currentScreen" that holds Screens to render and can be 
    changed by passing changeScreen() to the ChangeScreenButton. The Navbar is rendered here to
    reduce the duplication and layering of rendering it on each screen. 
    Below that is the screen that is currently being rendered
*/
export default class MainView extends React.Component {

    //Render the Navbar and the screen below it
    render() {
        return (
            <div>
                <ToastContainer
                    position="top-center"
                    type="error"
                    autoClose={7000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                />
                <main>
                    <Switch>
                        <Route exact path='/' component={MainScreen} />
                        <Route path='/main-menu' component={MainScreen} />
                        <Route path='/dropzone-home' component={LandingScreen}/>
                        <Route path='/login' component={LoginScreen} />
                        <Route path='/reset' component={PasswordResetScreen} />
                        <Route path='/create-dropzone' component={CreateDropzoneScreen} />
                        <Route path='/employee-info' component={EmployeeInfoScreen} />
                        <Route path='/employee-management' component={EmployeeAdminScreen} />
                        <Route path='/rental-menu' component={RentalScreen} />
                        <Route path='/rig-sheets' component={SheetsScreen} />
                        <Route path='/inventory-menu' component={InventoryScreen} />
                        <Route path='/loft-menu' component={LoftScreen} />
                        <Route path='*' exact={true} component={NotFoundScreen} />
                    </Switch>
                </main>
            </div>
        );
    }
}