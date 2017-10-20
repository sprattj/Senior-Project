import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import DropdownOption from './DropdownOption.jsx';

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
    //bind handlechange so it is available inside render
    this.handleChange = this.handleChange.bind(this);
  }

  //when the selected item in this dropdown is changed
  //grab its new value from the selection event
  //and pass it to the parent component's passed-in
  //onChange method. This allows the value of this 
  //dropdown to be available to parent components.
  handleChange(event) {
        var value = event.target.value;
        this.props.onChange(this.props.id, value);
    }

  //indicate this.handlechange as the onChange method
  //so that values are properly updated when this
  //dropdown has a new value selected
  render() {
    return (
        <FormGroup>
          <InputGroup>
          <InputGroupAddon>{this.props.labelText}</InputGroupAddon>
          <Input type="select" name="select" id={this.props.id}
                onChange={this.handleChange}>
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