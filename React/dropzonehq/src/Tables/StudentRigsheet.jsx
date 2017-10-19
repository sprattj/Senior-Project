import React from 'react';
import Rigsheet from './Rigsheet.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';


/* A StudentRigsheet is a rigsheet that contains all signouts for
  Student rigs.
*/
export default class StudentRigsheet extends React.Component {


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
      isStudent: true
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
        };
        self.setState({
          rows: rowData
        });
      });
  }

  render() {
    var rowData = [{ jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: "Brian K" },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: "Brian K" },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
    { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
  ];//get row data from ajax

    //change to {this.state.rowData when running from server}
    return <Rigsheet headerText="Student" footerContent={<SignoutButton/>}>{rowData}</Rigsheet>;
  }
}
