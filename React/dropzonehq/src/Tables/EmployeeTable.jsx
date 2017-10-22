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
    this.URLsection = "/employeetable";

   // this.editEmployee = this.editEmployee.bind(this);
   // this.deleteEmployee = this.deleteEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);

    var rowData = [{ name: "Paul B", info: "Senior Developer", jobs: ["Administrator"], actions: <EditEmployeeButton /> },
    { name: "Andres B", info: "Senior Program", jobs:["Rigger","Packer"], actions: <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup> },
    { name: "Jatin B", info: "Full Stack Developer", jobs: ["Tandem"], actions: <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup> }];

    this.processRows(rowData);
    
    this.state ={
      columns: [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Info',
        accessor: 'info',
      }, {
        Header: 'Job(s)',
        accessor: 'jobs'
      }, {
        Header: 'Actions',
        accessor: 'actions'
      }],
      rows: rowData
    };
  }

  //Process the rows that are passed in to fill in the missing 
  //"Packed By" data with a PackButton
  processRows(rowData) {
    for (var i = 0; i < rowData.length; i++) {
      for(var j =0; j <rowData[i].jobs.length; j++){
        if(rowData[i].jobs[j] === "Administrator"){
          rowData[i].actions = <EditEmployeeButton />; //TODO
        }else{
          rowData[i].actions = <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup>; //ALSO TODO
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

  addEmployee(name, info, jobs) {
      var row = {
        name: name,
        info: info,
        jobs: jobs,
        actions: <ButtonGroup><EditEmployeeButton /><DeleteEmployeeButton /></ButtonGroup>
      };
      var newRows = Array.from(this.state.rows);
      newRows.push(row);
      this.setState({
        rows: newRows
      })
    }

  render() {
    return (
      <TableSheet headerText="Employees" 
                  columns={this.state.columns} 
                  footer={<AddEmployeeButton 
                  authorize={this.addEmployee}/>}>
        {this.state.rows}
      </TableSheet>
    );
  }
}