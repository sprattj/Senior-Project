import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';


export default class PasswordField extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var password = event.target.value;
    this.props.onChange(this.props.id, password);
  }

  render() {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon>{this.props.labelText}</InputGroupAddon>
          <Input onChange={this.handleChange} type="password" name="password" id={this.props.id} placeholder={this.props.placeholder} />
        </InputGroup>
      </FormGroup>
    );
  }
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this textarea (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
}