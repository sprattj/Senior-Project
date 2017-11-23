import React from 'react';
import TableSheet from './TableSheet.jsx';
import EditEmployeeButton from '../ModalButtons/EditEmployeeButton.jsx';
import EmployeeStatusButton from '../ModalButtons/EmployeeStatusButton.jsx';
import AddEmployeeButton from '../ModalButtons/AddEmployeeButton.jsx';
import { ButtonGroup } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';


export default class EmployeeTable extends React.Component {

  constructor(props) {
    super(props)
    this.URLsection = "/employees";

    this.editEmployee = this.editEmployee.bind(this);
    this.toggleEmployeeStatus = this.toggleEmployeeStatus.bind(this);
    this.addEmployee = this.addEmployee.bind(this);


    this.processRows = this.processRows.bind(this);

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
        },
        {
          Header: 'Status',
          accessor: 'status'
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
          roles={rowData[i].roles} />
        <EmployeeStatusButton
          id={rowData[i].employee_id}
          toggleEmployeeStatus={this.toggleEmployeeStatus}
          firstName={rowData[i].first_name}
          lastName={rowData[i].last_name}
          status={rowData[i].is_active} />
      </ButtonGroup>;
      newRows[i].status = rowData[i].is_active;
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
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection;
    var self = this;

    fetch(url, {
      method: "GET",
      mode: 'cors',

    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Fetching rows failed. Bad response " + response.status + " from server");
      }
      return response.json();
    })
      .then(function (rowData) {
        var newRows = self.processRows(rowData);
        self.setState({
          rows: newRows
        });
      }).catch(function (error) {
        toast.error(error + "\n" + url);
      });;
  }

  addEmployee(firstName, lastName, email, jobs) {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection + "/";

    var self = this;
    var employee_id = (Date.now() % 100000); //TODO
    var status = true;
    var requestVariables = {
      employee_id: employee_id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      roles: jobs,
      status: status,
      dropzone_id: 1 //TODO
    };
    fetch(url, {
      method: "POST",
      mode: 'CORS',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestVariables)
    })//when we get a response back
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Adding employee failed. Bad response " + response.status + " from server.");
        }
        return response.json();
      })//when the call succeeds
      .then(function (rowData) {
        var jobsString = "";
        var actionButtons = <ButtonGroup>
          <EditEmployeeButton
            id={employee_id}
            authorize={self.editEmployee} />
          <EmployeeStatusButton
            employee_id={employee_id}
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
            actionButtons = <EditEmployeeButton id={employee_id} authorize={self.editEmployee} />;
          }
        }

        var row = {
          employee_id: employee_id,
          firstname: firstName,
          lastname: lastName,
          email: email,
          jobs: jobsString,
          actions: actionButtons,
          rowID: newRowID,
          status: status
        };

        newRowID++;

        var newRows = Array.from(self.state.rows);
        newRows.unshift(row);

        self.setState({
          rows: newRows,
          rowID: newRowID
        })
      }).catch(function (error) {
        toast.error(error + "\n" + url);
        return false;
      });
  }

  editEmployee(id, firstName, lastName, email, jobs) {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection + "/" + id;

    var self = this;
    var requestVariables = {}
    if (firstName) {
      requestVariables.first_name = firstName
    } if (lastName) {
      requestVariables.last_name = lastName
    } if (email) {
      requestVariables.email = email
    }
    if (jobs.length > 0) {
      requestVariables.roles = jobs
    }
    if (Object.keys(requestVariables).length > 0) {
      fetch(url, {
        method: "PATCH",
        mode: 'CORS',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestVariables)
      })//when we get a response back
        .then(function (response) {
          if (response.status >= 400) {
            throw new Error("Editing employee failed. Bad response " + response.status + " from server.");
          }
          return response.json();
        })//when the call succeeds
        .then(function (rowData) {

          var newRows = Array.from(self.state.rows);
          for (var i = 0; i < newRows.length; i++) {
            if (newRows[i].employee_id === id) {
              if (firstName) {
                newRows[i].first_name = firstName
              } if (lastName) {
                newRows[i].last_name = lastName
              } if (email) {
                newRows[i].email = email
              }
              if (jobs.length > 0) {
                newRows[i].roles = jobs
              }
              break;
            }
          }
          self.setState({
            rows: newRows
          })
          console.log(self.state.rows);
          return true;
        }).catch(function (error) {
          toast.error(error + "\n" + url);
          return false;
        });
    }
  }

  deleteEmployee(id) {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection + "/" + id + "/";

    var self = this;

    return fetch(url, {
      method: "DELETE",
      mode: 'CORS',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })//when we get a response back
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Deleting employee failed. Bad response " + response.status + " from server.");
        }
        return response.json();
      })//when the call succeeds
      .then(function (rowData) {
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
      }).catch(function (error) {
        toast.error(error + "\n" + url);
        return false;
      });
  }

  toggleEmployeeStatus(id) {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection + "/" + id + "/";

    var self = this;

    return fetch(url, {
      method: "PATCH",
      mode: 'CORS',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })//when we get a response back
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Toggling employee failed. Bad response " + response.status + " from server.");
        }
        return response.json();
      })//when the call succeeds
      .then(function (rowData) {
        var newRows = Array.from(self.state.rows);
        for (var i = 0; i < newRows.length; i++) {
          if (newRows[i].rowID === id) {
            if (newRows[i].is_active === true) {
              newRows[i].is_active = false;
            } else {
              newRows[i].is_active = true;
            }
          }
        }
        self.setState({
          rows: newRows
        })
        return true;
      }).catch(function (error) {
        toast.error(error + "\n" + url);
        return false;
      });
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
