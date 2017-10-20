import React from 'react';
import PropTypes from 'prop-types';
import TableSheet from './TableSheet.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';
import { rootURL } from '../restInfo.js';


/* A StudentRigsheet is a rigsheet that contains all signouts for
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

    var url = rootURL + '/evs/';
    var self = this;

    fetch(url, {
      method: "GET",
      mode: 'CORS'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
      .then(function (rowData) {
        var rows = [];
        for (var i = 0; i < rowData.length; i++) {
          if (rowData[i].packed_by === null)
            rowData[i].packed_by = <PackButton />;
        };
        self.setState({
          rows: rowData
        });
      });
  }

  render() {
    const columns = [{
      Header: 'Instructor',
      accessor: 'jumpmaster' // String-based value accessors!
    }, {
      Header: 'Rig ID',
      accessor: 'rig_id',
    }, {
      Header: 'Plane Load',
      accessor: 'load_number'
    }, {
      Header: 'Packed By',
      accessor: 'packed_by'
    }]

    var rowData = [
      { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: <PackButton /> },
      { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: "Brian K" }
    ];

    //change to {this.state.rowData when running from server}
    return (
      <TableSheet headerText={"Student"} columns={columns} footer={<SignoutButton />}>
        {rowData}
      </TableSheet>
      );
  }
}

TableSheet.propTypes = {
  headerText: PropTypes.string.isRequired, //the text in the header of the rigsheet
  //children: PropTypes.arrayOf(RigsheetRow).isRequired //an array of rigsheet rows
}