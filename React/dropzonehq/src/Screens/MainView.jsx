import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter, Table } from 'reactstrap';
import MainScreen from './MainScreen.jsx';
import EmployeeAdminScreen from './EmployeeAdminScreen.jsx';
import SheetsScreen from './SheetsScreen.jsx';
import ToEmployeeButton from '../Buttons/ToEmployeeButton.jsx';
import ToInventoryButton from '../Buttons/ToInventoryButton.jsx';
import ToRigSheetsButton from '../Buttons/ToRigSheetsButton.jsx';
import ToLoftButton from '../Buttons/ToLoftButton.jsx';
import ToRentalsButton from '../Buttons/ToRentalsButton.jsx';
import ToReportsButton from '../Buttons/ToReportsButton.jsx';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

var showScreen = null;  //set up an empty variable to hold the current screen that needs to be rendered

/*
    MainView is the main wrapper class to decide what to render. 
    It should have a state that can be changed by the buttons inside the nav bar 
    and on certain screens. The Navbar is Rendered at the top. In the Second Row are 
    all the Screens as the user works their way through them.     
*/
export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "main",  //set the initial screen to main so the user can select
                //^^should be set to "login" once LoginScreen is operational
        };
    }

    //function to change the state of the MainView so the screen will re-render
    changeScreen(newScreen) {
        this.setState({
            currentScreen: newScreen
        })
    }
    
    //Switch through the values of the currentScreen state and apply that component to the variable to be rendered
    screenSelection() {
        switch (this.state.currentScreen) {
            case "login" :
            break;            
            case "main" :
            showScreen = <MainScreen current={this.state.currentScreen} />;
            break; 
            case "employeeAdmin" :
            showScreen = <EmployeeAdminScreen />;
            break;
            case "inventory" :
            break;           
            case "rigSheets" :
            showScreen = <SheetsScreen />;
            break;
            case "loft" :
            break;
            case "rentals" :
            break;
            case "reports" :
            break;                        
        }
    }

    render() {       
       this.screenSelection();
        
        return (
            <div>
                <Row> 
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row >
                    <Col>
                        {showScreen} 
                    </Col>                   
                </Row>
            </div>
            
        );
    }
};
