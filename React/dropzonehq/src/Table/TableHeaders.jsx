import React from 'react';


export default class TableHeaders extends React.Component {

  getTableHeaders(headerArray) {
    
    var headers = []; 

    Object.keys(headerArray).forEach(function (i) {
      var nextCol = <th>{headerArray[i]}</th>
      headers.push(nextCol);
    });
    var cols = <thead><tr>{headers}</tr></thead>
    return cols;
  }

  render() {
    var tableHeaders = this.getTableHeaders(this.props.headerArray);
    return tableHeaders;
  }
}