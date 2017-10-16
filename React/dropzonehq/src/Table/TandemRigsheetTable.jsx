import React from 'react';
import TableSheet from './TableSheet.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';

export default class TandemRigsheetTable extends React.Component {

    render() {
        var header = "Tandem"
        
        var headerData = ["Instructor", "Rig #", "Plane Load", "Packed By"];
        
        var rowData = [{instructor: "Paul B",rigNum:"S9",planeLoad: "111",packedBy: <PackButton/>},
        {instructor: "Paul B",rigNum:"S9",planeLoad: "111",packedBy: "Brian K"},
        {instructor: "Paul B",rigNum:"S9",planeLoad: "111",packedBy: "Brian K"}]; 

        var possibleButton = <SignoutButton />

        return (
            <TableSheet headerText={header} headers={headerData} rows={rowData} possibleButton={possibleButton}/>
        );
    }
}