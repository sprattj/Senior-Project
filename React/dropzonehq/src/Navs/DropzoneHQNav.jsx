import React from 'react';
import SiteNavbar from './SiteNavbar.jsx';
import { NavItem, NavLink } from 'reactstrap';
import ChangeScreenButton from '../Buttons/ChangeScreenButton.jsx';
import MainScreen from '../Screens/MainScreen.jsx';
import { Link } from 'react-router-dom'

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
                    <NavLink>
                        <Link to='/dropzone-home'>Dropzone Home</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/employee-info'>Employee Info</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/employee-management'>Employee Admin</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/rental-menu'>Rentals</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/rig-sheets'>Rigsheets</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/inventory-menu'>Inventory</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/loft-menu'>Loft</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to='/test-fetch'>Test</Link>
                    </NavLink>
                </NavItem>
            </SiteNavbar >
        );
    }
}