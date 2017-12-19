import React from 'react';
import TableSheet from './TableSheet.jsx';
import EditEmployeeButton from '../ModalButtons/EditEmployeeButton.jsx';
import EmployeeStatusButton from '../ModalButtons/EmployeeStatusButton.jsx';
import AddEmployeeButton from '../ModalButtons/AddEmployeeButton.jsx';
import StatButton from '../ModalButtons/StatButton';
import { ButtonGroup } from 'reactstrap';
import RequestHandler from '../RequestHandler.js';
import Binder from '../Binder.js';

export default class EmployeeTable extends React.Component {

  constructor(props) {
    super(props)
    this.URLsection = "employees/";

    //create a new binder and bind all of the methods in this class
    var binder = new Binder();
    binder.bindAll(this, EmployeeTable);

    this.state = {
      columns: [
        {
          Header: 'ID',
          accessor: 'employee_id' // String-based value accessors!
        }, {
          Header: 'First Name',
          accessor: 'firstname' // String-based value accessors!
        }, {
          Header: 'Last Name',
          accessor: 'lastname',
        },
        {
          Header: 'Email',
          accessor: 'email',
        }, {
          Header: 'Job(s)',
          accessor: 'jobs'
        }, {
          Header: 'Actions',
          accessor: 'actions'
        }
      ],
      rows: [],
      rowID: 0
    };
  }

  //Process the rows that are passed in to fill in the missing
  //"Packed By" data with a PackButton
  processRows(rowData) {
    var newRows = [];
    for (var i = 0; i < rowData.length; i++) {
      newRows[i] = {}
      newRows[i].employee_id = rowData[i].employee_id;
      newRows[i].firstname = rowData[i].first_name;
      newRows[i].lastname = rowData[i].last_name;
      newRows[i].actions = <ButtonGroup>
        <EditEmployeeButton
          id={rowData[i].employee_id}
          authorize={this.editEmployee}
          roles={rowData[i].roles}
          firstName={rowData[i].first_name}
          lastName={rowData[i].last_name}
          email={rowData[i].email}
        />
        <EmployeeStatusButton
          id={rowData[i].employee_id}
          toggleEmployeeStatus={this.toggleEmployeeStatus}
          firstName={rowData[i].first_name}
          lastName={rowData[i].last_name}
          status={rowData[i].is_active} />

        <StatButton
          firstName={rowData[i].first_name}
          lastName={rowData[i].last_name}
          id={rowData[i].employee_id} />
          
      </ButtonGroup>;
      newRows[i].is_active = rowData[i].is_active + "";
      newRows[i].email = rowData[i].email;
      var jobs = "";
      for (var j = 0; j < rowData[i].roles.length; j++) {
        jobs = jobs + rowData[i].roles[j].role;
        if (j < rowData[i].roles.length - 1) {
          jobs = jobs + ", ";
        }
      }
      newRows[i].jobs = jobs;
    }
    return newRows;
  }


  componentDidMount() {
    this.fetchRows();
  }

  fetchRows() {
    //employees
    var endpoint = this.URLsection;

    //save 'this' so we can reference it in callback
    var self = this;
    var successMsg = "Fetched employee data.";
    var errorMsg = "Problem fetching employee data.";
    var callback = function (rowData) {
      var newRows = self.processRows(rowData);
      self.setState({
        rows: newRows
      });
    };

    var handler = new RequestHandler();
    handler.get(endpoint, successMsg, errorMsg, callback);
  }

  addEmployee(firstName, lastName, email, jobs) {

    var endpoint = this.URLsection;
    var self = this;
    var status = true;
    var variables = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: jobs.splice(0, 1),
      dropzone_id: 1, //TODO UUHHHHHHH
      status: status
    };
    var successMsg = "Employee added successfully.";
    var errorMsg = "Problem adding employee.";
    var callback = function (response) {
      var jobsString = "";
      var actionButtons = <ButtonGroup>
        <EditEmployeeButton
          id={response.employee_id}
          authorize={self.editEmployee}
          firstName={response.first_name}
          lastName={response.last_name}
          email={response.email} />
        <EmployeeStatusButton
          id={response.employee_id}
          toggleEmployeeStatus={self.toggleEmployeeStatus}
          firstName={firstName}
          lastName={lastName}
          status={status} />
      </ButtonGroup>;
      var newRowID = self.state.rowID;

      for (var i = 0; i < jobs.length; i++) {
        if (i === jobs.length - 1) {
          jobsString += jobs[i];
        } else {
          jobsString += jobs[i] + ", ";
        }
        if (jobs[i] === "Administrator") {
          actionButtons = <EditEmployeeButton
            id={response.employee_id}
            authorize={self.editEmployee}
            firstName={response.first_name}
            lastName={response.last_name}
            email={response.email} />;
        }
      }

      var row = {
        employee_id: response.employee_id,
        firstname: firstName,
        lastname: lastName,
        email: email,
        jobs: jobsString,
        actions: actionButtons,
        rowID: newRowID,
        is_active: status
      };

      newRowID++;

      var newRows = Array.from(self.state.rows);
      newRows.unshift(row);

      self.setState({
        rows: newRows,
        rowID: newRowID
      })
    };
    //make the request via handler
    var handler = new RequestHandler();
    handler.post(endpoint, variables, successMsg, errorMsg, callback);
  }

  editEmployee(id, firstName, lastName, email, jobs) {

    var endpoint = this.URLsection + id;
    var successMsg = "Edited info for " + firstName + " " + lastName + " (" + id + ").";
    var errorMsg = "Problem editing info for " + firstName + " " + lastName + " (" + id + ").";
    var self = this;
    var variables = {
      pin: this.state.pin
    };
    if (firstName) {
      variables.first_name = firstName
    } if (lastName) {
      variables.last_name = lastName
    } if (email) {
      variables.email = email
    } if (jobs.length > 0) {
      variables.roles = jobs
    }

    var callback = function (response) {
      var newRows = Array.from(self.state.rows);
      for (var i = 0; i < newRows.length; i++) {
        if (newRows[i].employee_id === id) {
          newRows[i].firstname = response.first_name;
          newRows[i].lastname = response.last_name;
          newRows[i].email = response.email;
          newRows[i].roles = response.roles;
          break;
        }
      }
      self.setState({
        rows: newRows
      })
      console.log(self.state.rows);
      return true;
    };

    if (Object.keys(variables).length > 0) {
      var handler = new RequestHandler();
      handler.patch(endpoint, variables, successMsg, errorMsg, callback);
    }
    //TODO what happens if the request shouldnt be made because they put everything as blank?
  }


  deleteEmployee(id) {

    var endpoint = this.URLsection + id + "/";
    var self = this;
    var successMsg = "Deleted employee " + id + ".";
    var errorMsg = "Problem deleting employee " + id + ".";
    var callback = function (rowData) {
      var newRows = Array.from(self.state.rows);
      for (var i = 0; i < newRows.length; i++) {
        if (newRows[i].rowID === id) {
          newRows.splice(i, 1);
        }
      }
      self.setState({
        rows: newRows
      })
      return true;
    };

    var handler = new RequestHandler();
    handler.delete(endpoint, successMsg, errorMsg, callback);
  }

  toggleEmployeeStatus(id, status) {
    console.log(id, status)
    var endpoint = this.URLsection + id + "/";
    var self = this;
    var variables = {
      is_active: !status
    }
    var successMsg = "Changed status of employee " + id + ".";
    var errorMsg = "Problem changing status for employee " + id + ".";
    var callback = function (response) {
      var newRows = Array.from(self.state.rows);
      for (var i = 0; i < newRows.length; i++) {
        if (newRows[i].employee_id === id) {
          console.log("what is UP with you right now dude?")
          newRows[i].is_active = response.is_active + "";
          newRows[i].actions = <ButtonGroup>
            <EditEmployeeButton
              id={response.employee_id}
              authorize={self.editEmployee}
              firstName={response.first_name}
              lastName={response.last_name}
              email={response.email} />
            <EmployeeStatusButton
              id={response.employee_id}
              toggleEmployeeStatus={self.toggleEmployeeStatus}
              firstName={response.first_name}
              lastName={response.last_name}
              status={response.is_active} />
          </ButtonGroup>;
        }
      }
      self.setState({
        rows: newRows
      })
      
    };
    var handler = new RequestHandler();
    handler.patch(endpoint, variables, successMsg, errorMsg, callback);
    return true;
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
