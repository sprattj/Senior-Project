import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class InstructorDropdown extends React.Component {

    constructor(props) {
        super(props);

        //bind methods to allow callbacks
        this.createDropdownOptions = this.createDropdownOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //get instructor data from server
        var data = this.getInstructors();
        this.state = {
            instructorData: data
        }
    }

    //create drowdown options from the given instructor data
    createDropdownOptions(instructorData) {
        var options = [];
        Object.keys(instructorData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={instructorData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    //get all of the instructor data from server
    getInstructors() {
        var instructorData = [{ name: "Paul B", id: "1" },
        { name: "Jatin B", id: "2" },
        { name: "Andres B", id: "3" },
        { name: "Brian K", id: "4" },
        { name: "Jon S", id: "5" },
        { name: "Paul T", id: "6" }];//get row data from ajax
        return instructorData;
    }

    //send back the data for the dropdown item that was selected
    handleChange(index) {
        this.props.onChange(this.state.instructorData[index]);
    }

    //render a dropdown and pass it our data converted into dropdownoptions
    render() {
        return (
            <Dropdown onChange={this.handleChange} id={"instructorDropdown"} labelText="Instructor:">
                {this.createDropdownOptions(this.state.instructorData)}
            </Dropdown>
        );
    }
}