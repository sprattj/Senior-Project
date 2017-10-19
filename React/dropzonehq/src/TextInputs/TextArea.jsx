import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

/*
 
*/
export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(event) {
    var text = event.target.value;
    this.props.onChange(this.props.id, text);
  }

  render() {
    return (
      <FormGroup>
      <Label for={this.props.id}>{this.props.labelText}</Label>
      <Input type="textarea" name="textarea" value={this.props.value} id={this.props.id} onChange={this.handleChange} />
    </FormGroup>
    );
  }
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this textarea (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
}