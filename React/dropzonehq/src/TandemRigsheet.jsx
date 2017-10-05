import React from 'react';
import Dropdown from './Dropdown.jsx';
import Rigsheet from './Rigsheet.jsx';
import RigsheetRow from './RigsheetRow.jsx';
import {Button} from 'reactstrap';

export default class TandemRigsheet extends React.Component {
  render() {
    return (
        <Rigsheet headerText="Tandem">
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