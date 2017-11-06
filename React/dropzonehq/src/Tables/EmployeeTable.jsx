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
    this.URLsection = "/employees";

    // this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);

    //   var rowData = [{ firstname: "Paul B", lastname: "Bayruns", info: "Senior Developer", jobs: ["Administrator"], actions: <EditEmployeeButton />, rowID: 1},
    //   { firstname: "Andres", lastname: "Blotta", info: "Senior Program", jobs: ["Rigger", "Packer"], actions: <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup>, rowID: 2 }
    //   ];

    //   this.processRows(rowData);

    this.state = {
      columns: [{
        Header: 'First Name',
        accessor: 'firstname' // String-based value accessors!
      }, 
      {
        Header: 'Last Name',
        accessor: 'lastname'
      },     
      {
        Header: 'Info',
        accessor: 'info',
      }, {
        Header: 'Job(s)',
        accessor: 'jobs'
      }, {
        Header: 'Actions',
        accessor: 'actions'
      }],
      rows: [],
      rowID: 0
    };
  }

  //Process the rows that are passed in to fill in the missing 
  //"Packed By" data with a PackButton
  processRows(rowData) {
    for (var i = 0; i < rowData.length; i++) {
      if (rowData[i.jobs]) {
        for (var j = 0; j < rowData[i].jobs.length; j++) {
          if (rowData[i].jobs[j] === "Administrator") {
            rowData[i].actions = <EditEmployeeButton />; //TODO
          } else {
            rowData[i].actions = <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup>; //ALSO TODO
          }
        }
      }
    }
  }


  componentDidMount() {
    this.fetchRows();
  }

  fetchRows() {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection;
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
        self.processRows(rowData);
        self.setState({
          rows: rowData
        });
      });
  }



  addEmployee(fname, lname, info, jobs) {
    var jobsString = "";
    var actionButtons = <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton id={this.state.rowID} onClick={this.deleteEmployee} /></ButtonGroup>;
    var newRowID = this.state.rowID;

    for (var i = 0; i < jobs.length; i++) {
      if (i === jobs.length - 1) {
        jobsString += jobs[i];
      } else {
        jobsString += jobs[i] + ", ";
      }
      if (jobs[i] === "Administrator") {
        actionButtons = <EditEmployeeButton />;
      }
    }

    var row = {
      firstname: fname,
      lastname: lname,
      info: info,
      jobs: jobsString,
      actions: actionButtons,
      rowID: newRowID
    };

    newRowID++;

    var newRows = Array.from(this.state.rows);
    newRows.push(row);

    this.setState({
      rows: newRows,
      rowID: newRowID
    })
  }

  deleteEmployee(id) {
    var newRows = Array.from(this.state.rows);
    for (var i = 0; i < newRows.length; i++) {
      if (newRows[i].rowID === id) {
        newRows.splice(i, 1);
      }
    }
    this.setState({
      rows: newRows
    })

  }





  render() {
    return (
      <TableSheet headerText="Employees"
        columns={this.state.columns}
        footer={<AddEmployeeButton
          authorize={this.addEmployee} />}>
        {this.state.rows}
      </TableSheet>
    );
  }
}
