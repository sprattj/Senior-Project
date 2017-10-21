import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class InstructorDropdown extends React.Component {

    getInstructors() {

        var instructorData = [{ name: "Paul B", id: "1" },
        { name: "Jatin B", id: "2" },
        { name: "Andres B", id: "3" },
        { name: "Brian K", id: "4" },
        { name: "Jon S", id: "5" },
        { name: "Paul T", id: "6" }];//get row data from ajax
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
            
                <Dropdown onChange={this.props.onChange} id={"instructorDropdown"} labelText="Instructor:">
                    {instructors}
                </Dropdown>
        );
    }
}