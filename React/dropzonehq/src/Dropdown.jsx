import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import DropdownOption from './DropdownOption.jsx';

/*
  A Dropdown is a Reactstrap select Input whose id, 
  label text, and options can be specified with props.

  Options must be DropdownOptions, and they must be passed
  in via props.children

  A Dropdown must be rendered inside a Reactstrap form.
*/
export default class Dropdown extends React.Component {
  render() {
    return (
        <FormGroup>
          <Label for={this.props.id}>{this.props.labelText}</Label>
          <Input type="select" name="select" id={this.props.id}>
            {this.props.children}
          </Input>
        </FormGroup>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this dropdown (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
  //children: PropTypes.arrayOf(DropdownOption).isRequired //the items in the dropdown
}