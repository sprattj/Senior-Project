import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';


export default class UsernameField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var username = event.target.value;
    this.props.onChange(this.props.id, username);
  }

  render() {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon>{this.props.labelText}</InputGroupAddon>
          <Input onChange={this.handleChange} type="username" name="username" id={this.props.id} placeholder={this.props.placeholder} />
        </InputGroup>
      </FormGroup>
    );
  }
}

UsernameField.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this textarea (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
}