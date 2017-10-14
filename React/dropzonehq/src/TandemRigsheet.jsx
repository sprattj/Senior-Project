import React from 'react';
import Rigsheet from './Rigsheet.jsx';
import RigsheetRow from './RigsheetRow.jsx';
import PackButton from './ModalButtons/PackButton.jsx';


/* A TandemRigsheet is a rigsheet that contains all signouts for
  tandem rigs.
*/
export default class TandemRigsheet extends React.Component {

  getRigsheetRows() {
    var rowData;

    require('isomorphic-fetch');
    require('es6-promise').polyfill();
   
    var url = 'http://www.dropzonehq.com/evs';
   
    fetch(url)
       .then(function(response) {
       if (response.status >= 400) {
          throw new Error("Bad response from server");
       }
       return response.json();
     })
     .then(function(data) {
        rowData = data;
     });

    /* Optionally the request above could also be done as
    axios.get('http://www.dropzonehq.com/evs', {
      params: {
        isTandem: true
      }
    })
      .then(function (response) {
        rowData = response;
      })
      .catch(function (error) {
        console.log(error);
      });*/

    rowData = [{ instructor: "Paul B", rigNum: "S9", planeLoad: "111", packedBy: <PackButton /> },
    { instructor: "Paul B", rigNum: "S9", planeLoad: "111", packedBy: "Brian K" },
    { instructor: "Paul B", rigNum: "S9", planeLoad: "111", packedBy: "Brian K" }];//get row data from ajax
    var rows = []; //

    Object.keys(rowData).forEach(function (i) {
      var nextRow = <RigsheetRow
        key={i}
        instructor={rowData[i].instructor}
        rigNum={rowData[i].rigNum}
        planeLoad={rowData[i].planeLoad}
        packedBy={rowData[i].packedBy} />
      rows.push(nextRow);
    });
    return rows;
  }

  render() {
    var sheetRows = this.getRigsheetRows();
    return <Rigsheet headerText="Tandem">{sheetRows}</Rigsheet>;
  }
}