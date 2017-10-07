import React from 'react';
import SiteNavbar from './SiteNavbar.jsx';
import { NavItem, NavLink } from 'reactstrap';


/*
    A SiteNavbar is a light styled Reactstrap Navbar that collapses on smaller screens.
    The brand text, brand link are passed via props.
    All of the NavItems are passed via props.children.
*/
export default class DropzoneHQNav extends React.Component {

    render() {
        return (
            <SiteNavbar brandText="Dropzone HQ" brandLink="#">
                <NavItem>
                    <NavLink href="#">Thing</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Thing 2</NavLink>
                </NavItem>
            </SiteNavbar>
        );
    }
}