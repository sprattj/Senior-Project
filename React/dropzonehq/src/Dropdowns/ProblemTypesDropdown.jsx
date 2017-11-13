import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class ProblemTypesDropdown extends React.Component {

    constructor(props) {
        super(props);

        //bind methods to allow callbacks
        this.createDropdownOptions = this.createDropdownOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //get problem types data from server
        var problemTypes = this.getProblemTypes();
        this.state = {
            problemTypesData: problemTypes
        }
    }

    //get all of the problem type data from server
    getProblemTypes() {
        var problemTypesData = [{ name: "Problem Type 1", id: "1" },
        { name: "Problem Type 2", id: "2" },
        { name: "Problem Type 3", id: "3" },
        { name: "Problem Type 4", id: "4" }];//get row data from ajax
        return problemTypesData;
    }

    //create drowdown options from the given problem types data
    createDropdownOptions(problemTypesData) {
        var options = []; //
        Object.keys(problemTypesData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={problemTypesData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    //send back the data for the dropdown item that was selected
    handleChange(selectedIndex) {
        this.props.onChange(this.state.rigData[selectedIndex]);
    }

    //render a dropdown and pass it our data converted into dropdownoptions
    render() {
        return (
            <Dropdown onChange={this.handleChange} id={"problemTypesDropdown"} labelText="Problem:">
                {this.createDropdownOptions(this.state.problemTypesData)}
            </Dropdown>
        );
    }
}