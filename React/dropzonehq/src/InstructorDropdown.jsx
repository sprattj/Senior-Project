import React from 'react';
import Dropdown from './Dropdown.jsx';
import { FormGroup, Label, Input } from 'reactstrap';

export default class instructorDropdown extends React.Component {
  render() {
      var id = "instructorDropdown";
      var labelText = "Instructor: ";
    return (
        <Dropdown id={id} labelText={labelText}>
            <option>instructor 1</option>
            <option>instructor 2</option>
        </Dropdown>
    );
  }
}