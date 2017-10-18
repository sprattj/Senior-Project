import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { Form } from 'reactstrap';

export default class JobDropdown extends React.Component {

    getJobs() {

        var JobsData = [{ name: "Admin", id: "1" },
        { name: "Packer", id: "2" },
        { name: "Rigger", id: "3" },
        { name: "Rigger/Packer", id: "4" },
        { name: "Tandem", id: "5"}];
        var options = [];

        Object.keys(JobsData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={JobsData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    render() {
        var jobs = this.getJobs();
        return (
                <Dropdown id={"JobDropdown"} labelText="Job:">
                    {jobs}
                </Dropdown>
        );
    }
}