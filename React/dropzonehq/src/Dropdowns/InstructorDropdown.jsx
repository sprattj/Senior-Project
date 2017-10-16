import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { Form } from 'reactstrap';

export default class InstructorDropdown extends React.Component {

    getInstructors() {

        var instructorData = [{ name: "Paul B", id: "1" },
        { name: "Paul B", id: "2" },
        { name: "Paul B", id: "3" },
        { name: "Paul B", id: "4" }];//get row data from ajax
        var options = []; //

        Object.keys(instructorData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={instructorData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    render() {
        var instructors = this.getInstructors();
        return (
            
                <Dropdown id={"instructorDropdown"} labelText="Instructor:">
                    {instructors}
                </Dropdown>
        );
    }
}