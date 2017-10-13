import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { Form } from 'reactstrap';

export default class ProblemTypesDropdown extends React.Component {

    getProblemTypes() {

        var problemTypesData = [{ name: "Paul B", id: "1" },
        { name: "Paul B", id: "2" },
        { name: "Paul B", id: "3" },
        { name: "Paul B", id: "4" }];//get row data from ajax
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
                <Dropdown id={"problemTypesDropdown"} labelText="Problem:">
                    {problemTypes}
                </Dropdown>
        );
    }
}