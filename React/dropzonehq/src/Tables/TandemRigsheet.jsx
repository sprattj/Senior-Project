import React from 'react';
import PropTypes from 'prop-types';
import TableSheet from './TableSheet.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';
import { rootURL } from '../restInfo.js';


/* A TandemRigsheet is a rigsheet that contains all signouts for
  tandem rigs.
*/
export default class TandemRigsheet extends React.Component {

  constructor(props) {
    super(props);
    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.packRow = this.packRow.bind(this);
    this.validateUsername = this.validateUsername.bind(this);

    var rowData = [
      { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: null },
      { jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by: "Brian K" }
    ];
    for (var i = 0; i < rowData.length; i++) {
      if (rowData[i].packed_by === null)
        rowData[i].packed_by = <PackButton rig={rowData[i].rig_id}
          instructor={rowData[i].jumpmaster}
          load={rowData[i].load_number}
          usernameChanged={this.usernameChanged}
          passwordChanged={this.passwordChanged}
          authorize={this.packRow}
          index={i} />;
    };

    this.state = {
      rows:  rowData,
      username: '',
      password: ''
    };
  }

  //when the username is changed, update our state
  usernameChanged(id, username) {
    this.setState({
      username: username
    })
    console.log(this.state.username);
  }

  //when the password is changed, update our state
  passwordChanged(id, password) {
    this.setState({
      password: password
    })
    console.log(this.state.password);
  }

  componentDidMount() {
    this.fetchRows();
  }

  fetchRows() {
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
        for (var i = 0; i < rowData.length; i++) {
          if (rowData[i].packed_by === null)
            rowData[i].packed_by = <PackButton rig={rowData[i].rig_id}
              instructor={rowData[i].jumpmaster}
              load={rowData[i].load_number}
              usernameChanged={self.usernameChanged}
              passwordChanged={self.passwordChanged}
              authorize={self.packRow}
              index={i} />;
        };
        self.setState({
          rows: rowData
        });
      });
  }

  packRow(key, instructor) {
    console.log(key);
    if (this.validateUsername(this.state.username, this.state.password)) {
      this.state.rows[key].packed_by = instructor;
      console.log('username validated');
    } else {
      console.log('error');
    }
  }

  validateUsername(username, password) {
    return true;
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

    //change to {this.state.rowData when running from server}
    return (
      <TableSheet headerText={"Tandem"} columns={columns} footer={<SignoutButton />}>
        {this.state.rows}
      </TableSheet>);
  }
}

TableSheet.propTypes = {
  headerText: PropTypes.string.isRequired, //the text in the header of the rigsheet
  //children: PropTypes.arrayOf(RigsheetRow).isRequired //an array of rigsheet rows
}