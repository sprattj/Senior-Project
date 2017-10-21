import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class ProblemTypesDropdown extends React.Component {

    getProblemTypes() {

        var problemTypesData = [{ name: "Problem Type 1", id: "1" },
        { name: "Problem Type 2", id: "2" },
        { name: "Problem Type 3", id: "3" },
        { name: "Problem Type 4", id: "4" }];//get row data from ajax
        var options = []; //

        Object.keys(problemTypesData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={problemTypesData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    render() {
        var problemTypes = this.getProblemTypes();
        return (
                <Dropdown id={"problemTypesDropdown"} onChange={this.props.onChange} labelText="Problem:">
                    {problemTypes}
                </Dropdown>
        );
    }
}