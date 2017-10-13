import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { Form } from 'reactstrap';

export default class RigDropdown extends React.Component {

    getRigs() {

        var rigData = [{ name: "Paul B", id: "1" },
        { name: "Paul B", id: "2" },
        { name: "Paul B", id: "3" },
        { name: "Paul B", id: "4" }];//get row data from ajax
        var options = []; //

        Object.keys(rigData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={rigData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    render() {
        var rigs = this.getRigs();
        return (
                <Dropdown id={"rigDropdown"} labelText="Rig:">
                    {rigs}
                </Dropdown>
        );
    }
}