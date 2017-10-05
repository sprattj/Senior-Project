import React from 'react';

export default class RigsheetRow extends React.Component {
  render() {
    return (
          <tr>
            <th scope="row">1</th>
            <td>{this.props.instructor}</td>
            <td>{this.props.planeLoad}</td>
            <td>{this.props.packedBy}</td>
          </tr>
    );
  }
}