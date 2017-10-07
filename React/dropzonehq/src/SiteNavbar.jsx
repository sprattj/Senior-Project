import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';

/*
    A SiteNavbar is a light styled Reactstrap Navbar that collapses on smaller screens.
    The brand text, brand link are passed via props.
    All of the NavItems are passed via props.children.
*/
export default class SiteNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href={this.props.brandLink}>{this.props.brandText}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                {this.props.children}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

SiteNavbar.propTypes = {
    brandText: PropTypes.string.isRequired, //the brand text of the nav
    brandLink: PropTypes.string.isRequired, //what the brand text links to
    //children: PropTypes.arrayOf(PropTypes.instanceOf(NavItem)).isRequired //the children of a SiteNavbar must be Reactstrap Navitems.
}

