import React from 'react';
import Rigsheet from './Rigsheet.jsx';
import RigsheetRow from './RigsheetRow.jsx';
import PackButton from './ModalButtons/PackButton.jsx';


/* A TandemRigsheet is a rigsheet that contains all signouts for
  tandem rigs.
*/
export default class TandemRigsheet extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = 'http://127.0.0.1:8000/evs/';

    const params = {
      isTandem: true
    };
    var self = this;
    fetch(url, {
      method: "GET",
      mode: 'cors',

    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
      .then(function (rowData) {
        var rows = [];
        for (var i = 0; i < rowData.length; i++) {
          if(rowData[i].packed_by === null)
            rowData[i].packed_by = <PackButton/>; 
          var nextRow = <RigsheetRow
            key={i}
            instructor={rowData[i].jumpmaster}
            rigNum={rowData[i].rig_id}
            planeLoad={rowData[i].load_number}
            packedBy={rowData[i].packed_by} />
          rows.push(nextRow);
        };
        self.setState({
          rows: rows
        });
      });
  }


  /*getRigsheetRows() {
    
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = 'http://127.0.0.1:8000/evs/';

    const params = {
      isTandem: true
    };
    fetch(url, {
      method: "GET",
      mode: 'cors',

    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
      .then(function (data) {
        console.log(data);
        return this.processRigRows(data);
      });   
  }*/


  render() {
    return <Rigsheet headerText="Tandem">{this.state.rows}</Rigsheet>;
  }
}