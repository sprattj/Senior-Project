import React from 'react';
import EditEmployeeButton from '../ModalButtons/EditEmployeeButton.jsx';
import DeleteEmployeeButton from '../ModalButtons/DeleteEmployeeButton.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';
export default class TableRows extends React.Component {

  getTableRows(rowArray) {
    
    var rows = []; 

    Object.keys(rowArray).forEach(function (i) {
      var nextRow = rowArray[i];
      var data = [];
      Object.keys(nextRow).forEach(function(j){
        data.push(<td>{nextRow[j]}</td>)
      });
      rows.push(<tr>{data}</tr>);
    });
    return <tbody>{rows}</tbody>;
  }

  render() {
    var tableRows = this.getTableRows(this.props.rowArray);
    return tableRows;
  }
}