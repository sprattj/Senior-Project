import React from 'react';
import MainScreen from './MainScreen.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Switch, Route, Redirect } from 'react-router-dom'
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
import VerifyPINScreen from './VerifyPINScreen.jsx';
import Binder from '../Binder.js';
/*
    MainView is the main wrapper component to decide what to render.
    It has a state "currentScreen" that holds Screens to render and can be 
    changed by passing changeScreen() to the ChangeScreenButton. The Navbar is rendered here to
    reduce the duplication and layering of rendering it on each screen. 
    Below that is the screen that is currently being rendered
*/
export default class MainView extends React.Component {

    constructor(props) {

        super(props);

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, LoftScreen);

    }
    isLoggedIn() {
        return false;
    }

    isVerified(){
        return false;
    }
    renderRequireLogin(next, component){
        if(this.isLoggedIn()){
            if(this.isVerified()){
                return component;
            }else{
                return <Redirect to={"/verify-PIN/" + next}/>;
            }
        }else{
            return <Redirect to={"/login/verify-PIN/" + next}/>;
        };
    }

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
                        <Route path='/verify-pin/:target' component={VerifyPINScreen}/>
                        <Route path='/dropzone-home' component={LandingScreen} onEnter={this.requireAuth} />
                        <Route path='/login/:target' component={LoginScreen} />
                        <Route path='/reset' component={PasswordResetScreen} />
                        <Route path='/create-dropzone' component={CreateDropzoneScreen} />
                        <Route path='/employee-info' render={() => this.renderRequireLogin('employee-info', <EmployeeInfoScreen/>)}/>
                        <Route path='/employee-management' render={() => this.renderRequireLogin('employee-management', <EmployeeAdminScreen/>)}/>
                        <Route path='/rental-menu' render={() => this.renderRequireLogin('rental-menu', <RentalScreen/>)} />
                        <Route path='/rig-sheets' component={SheetsScreen} onEnter={this.requireAuth} />
                        <Route path='/inventory-menu' render={() => this.renderRequireLogin('inventory-menu', <InventoryScreen/>)} />
                        <Route path='/loft-menu' render={() => this.renderRequireLogin('loft-menu', <LoftScreen/>)} />
                        <Route path='*' exact={true} component={NotFoundScreen} />
                    </Switch>
                </main>
            </div>
        );
    }
}