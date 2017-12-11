import React from 'react';
import SiteNavbar from './SiteNavbar.jsx';
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom'

/*
    A SiteNavbar is a light styled Reactstrap Navbar that collapses on smaller screens.
    The brand text, brand link are passed via props.
    All of the NavItems are passed via props.children.
*/
export default class DropzoneHQNav extends React.Component {

    render() {
        return (
            <SiteNavbar brandImage={"http://svgshare.com/i/3vT.svg"}
                brandText="Dropzone HQ" brandLink="#">
                <NavItem className="dzhq_nav_item">
                        <Link to='/dropzone-home'>Home</Link>
                </NavItem>
                        <NavItem className="dzhq_nav_item">
                <Link to='/employee-info'>Stats</Link>
                </NavItem>
                <NavItem className="dzhq_nav_item">
                        <Link to='/employee-management'>Employee Admin</Link>
                </NavItem>
                <NavItem className="dzhq_nav_item">
                        <Link to='/rental-menu'>Rentals</Link>
                </NavItem>
                <NavItem className="dzhq_nav_item">
                        <Link to='/rig-sheets'>Rigsheets</Link>
                </NavItem>
                <NavItem className="dzhq_nav_item">
                        <Link to='/inventory-menu'>Inventory</Link>
                </NavItem>
                <NavItem className="dzhq_nav_item">
                        <Link to='/loft-menu'>Loft</Link>
                </NavItem>
            </SiteNavbar >
        );
    }
}