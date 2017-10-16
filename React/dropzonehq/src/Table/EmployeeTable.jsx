import React from 'react';
import TableSheet from './TableSheet.jsx';
import EditEmployeeButton from '../ModalButtons/EditEmployeeButton.jsx';
import DeleteEmployeeButton from '../ModalButtons/DeleteEmployeeButton.jsx';
import AddEmployeeButton from '../ModalButtons/AddEmployeeButton.jsx';

export default class EmployeeTable extends React.Component {
    render() {
        var header = "Tandem"
        
        var headerData = ["Name", "Info", "Job(s)", ""];
        
        var rowData = [{name: "Paul B",info:"Senior Developer",job: "Admin",button: <EditEmployeeButton/>},
        {name: "Andres B",info:"Senior Program",job: "Rigger/Packer",button: <span><EditEmployeeButton/><DeleteEmployeeButton/></span>},
        {name: "Jatin B",info:"Full Stack Developer",job: "Tandem",button: <span><EditEmployeeButton/><DeleteEmployeeButton/></span>}];  

        var possibleButton = <AddEmployeeButton />

        return (
            <TableSheet headerText={header} headers={headerData} rows={rowData} possibleButton={possibleButton}/>
        );
    }
}