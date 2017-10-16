import React from 'react';
import Rigsheet from './Rigsheet.jsx';
import RigsheetRow from './RigsheetRow.jsx';
import PackButton from './ModalButtons/PackButton.jsx';


/* A StudentRigsheet is a rigsheet that contains all signouts for
  student rigs.
*/
export default class StudentRigsheet extends React.Component {
  getRigsheetRows() {
    
    var rowData = [{instructor: "Paul B",rigNum:"S9",planeLoad: "111",packedBy: <PackButton/>},
    {instructor: "Paul B",rigNum:"S9",planeLoad: "111",packedBy: "Brian K"},
    {instructor: "Paul B",rigNum:"S9",planeLoad: "111",packedBy: "Brian K"}];//get row data from ajax
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
    return (
      <Rigsheet style={this.props.style} headerText="Student">
        {sheetRows}
      </Rigsheet>
    );
  }
}