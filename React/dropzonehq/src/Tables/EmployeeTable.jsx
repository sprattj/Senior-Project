import React from 'react';
import TableSheet from './TableSheet.jsx';
import EditEmployeeButton from '../ModalButtons/EditEmployeeButton.jsx';
import DeleteEmployeeButton from '../ModalButtons/DeleteEmployeeButton.jsx';
import AddEmployeeButton from '../ModalButtons/AddEmployeeButton.jsx';
import {ButtonGroup} from 'reactstrap';
export default class EmployeeTable extends React.Component {
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
          var rowData = [{name: "Paul B",info:"Senior Developer",job: "Admin",actions: <EditEmployeeButton/>},
          {name: "Andres B",info:"Senior Program",job: "Rigger/Packer",actions: <ButtonGroup><EditEmployeeButton/><DeleteEmployeeButton/></ButtonGroup>},
          {name: "Jatin B",info:"Full Stack Developer",job: "Tandem",actions: <ButtonGroup><EditEmployeeButton/><DeleteEmployeeButton/></ButtonGroup>}];  
        return (
            <TableSheet headerText="Employees"
            columns={columns} >
                {rowData}
            </TableSheet> 
        );
    }
}