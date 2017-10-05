import React from 'react';
import Dropdown from './Dropdown.jsx';
import Rigsheet from './Rigsheet.jsx';
import RigsheetRow from './RigsheetRow.jsx';
import {Button} from 'reactstrap';

export default class StudentRigsheet extends React.Component {
  render() {
    return (
        <Rigsheet headerText="Student">
            <tr>
            <th scope="row">1</th>
            <td>Paul Bayruns</td>
            <td>16</td>
            <td><Button color="info">Pack</Button></td>
          </tr>
        </Rigsheet>
    );
  }
}