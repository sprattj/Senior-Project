import React from 'react';
import SiteNavbar from './SiteNavbar.jsx';
import { NavItem, NavLink } from 'reactstrap';
import ChangeScreenButton from '../Buttons/ChangeScreenButton.jsx';
import MainScreen from '../Screens/MainScreen.jsx';


/*
    A SiteNavbar is a light styled Reactstrap Navbar that collapses on smaller screens.
    The brand text, brand link are passed via props.
    All of the NavItems are passed via props.children.
*/
export default class DropzoneHQNav extends React.Component {

    //svg link https://docs.google.com/uc?id=0ByDw0k4qQe74SXUyNWhXb2dPc1U
    render() {
        return (
            <SiteNavbar brandImage={"https://docs.google.com/uc?id=0ByDw0k4qQe74ZE5LVHY1eTZYaXM"} 
            brandText="Dropzone HQ" brandLink="#">
                <NavItem>
                    <ChangeScreenButton screen={<MainScreen changeScreen={this.props.changeScreen} />}
                                    changeScreen={this.props.changeScreen}
                                    buttonText="Return to Main" />
                </NavItem>
                <NavItem>
                    <NavLink href="#">Thing 2</NavLink>
                </NavItem>
            </SiteNavbar>
        );
    }
}