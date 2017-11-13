import React from 'react';
import { Row, Col } from 'reactstrap';
import MainScreen from './MainScreen.jsx';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        this.changeScreen = this.changeScreen.bind(this);   //bind the changeScreen function
        this.state = {
            currentScreen: <MainScreen changeScreen={this.changeScreen} />      //render MainScreen the first time MainView is rendered
        };
    }

    //function to change the state of the MainView so the screen will render
    changeScreen(newScreen) {
        this.setState({
            currentScreen: newScreen
        })
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
                <Row>
                    <Col lg={{ size:12 }}>
                        <DropzoneHQNav changeScreen={this.changeScreen} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.currentScreen}
                    </Col>
                </Row>
            </div>
        );
    }

}