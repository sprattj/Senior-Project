import React from 'react';
import TableSheet from './TableSheet.jsx';
import EditEmployeeButton from '../ModalButtons/EditEmployeeButton.jsx';
import DeleteEmployeeButton from '../ModalButtons/DeleteEmployeeButton.jsx';
import AddEmployeeButton from '../ModalButtons/AddEmployeeButton.jsx';
import { ButtonGroup } from 'reactstrap';
import { rootURL } from '../restInfo.js';


export default class EmployeeTable extends React.Component {

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
          if (rowData[i].job === "Admin") {
            rowData[i].actions = <EditEmployeeButton />;
          } else {
            rowData[i].actions = <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup>
          };
        }
        self.setState({
          rows: rowData
        });
      });
  }

  render() {

    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Info',
      accessor: 'info',
    }, {
      Header: 'Job(s)',
      accessor: 'load_number'
    }, {
      Header: 'Actions',
      accessor: 'actions'
    }]
    var rowData = [{ name: "Paul B", info: "Senior Developer", job: "Admin", actions: <EditEmployeeButton /> },
    { name: "Andres B", info: "Senior Program", job: "Rigger/Packer", actions: <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup> },
    { name: "Jatin B", info: "Full Stack Developer", job: "Tandem", actions: <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup> }];
    return (
      <TableSheet headerText="Employees" columns={columns} footer={<AddEmployeeButton />}>
        {rowData}
      </TableSheet>
    );
  }
}