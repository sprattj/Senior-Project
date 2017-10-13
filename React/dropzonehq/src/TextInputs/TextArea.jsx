import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

/*
  A Dropdown is a Reactstrap select Input whose id, 
  label text, and options can be specified with props.

  Options must be DropdownOptions, and they must be passed
  in via props.children

  A Dropdown must be rendered inside a Reactstrap form.
*/
export default class TextArea extends React.Component {
  render() {
    return (
      <FormGroup>
      <Label for={this.props.id}>{this.props.labelText}</Label>
      <Input type="textarea" name="textarea" id={this.props.id} />
    </FormGroup>
    );
  }
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this textarea (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
}