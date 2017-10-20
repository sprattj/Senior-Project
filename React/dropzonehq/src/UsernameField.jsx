import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';


export default class UsernameField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(event) {
    var username = event.target.value;
    this.props.onChange(this.props.id, username);
  }

  render() {
    return (
        <FormGroup>
          <Label for={this.props.id}>{this.props.labelText}</Label>
          <Input onChange={this.handleChange} type="username" name="username" id={this.props.id} placeholder={this.props.placeholder} />
        </FormGroup>
    );
  }
}

UsernameField.propTypes = {
  id: PropTypes.string.isRequired, //the id to identify this textarea (For label)
  labelText: PropTypes.string.isRequired, //the text for the label
}