import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';


/*
  A Dropdown is a Reactstrap select Input whose id, 
  label text, and options can be specified with props.

  Options must be DropdownOptions, and they must be passed
  in via props.children

  A Dropdown must be rendered inside a Reactstrap form.
*/
export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    //bind onChange so it is available inside render
    this.onChange = this.onChange.bind(this);
  }

  //when the selected item is changed, send the newly selected 
  //index back to the component that rendered this dropdown
  onChange(event) {
    this.props.onChange(event.target.selectedIndex);
  }

  //render dropdown, get dropdown items from props.children
  render() {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon>{this.props.labelText}</InputGroupAddon>
          <Input type="select" name="select" id={this.props.id}
            onChange={this.onChange}>
            {this.props.children}
          </Input>
        </InputGroup>
      </FormGroup>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this dropdown (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
  //children: PropTypes.arrayOf(DropdownOption).isRequired //the items in the dropdown
}