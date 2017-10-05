import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

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