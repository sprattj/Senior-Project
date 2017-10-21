import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class RigDropdown extends React.Component {

    //method to get all of the data for rigs
    getRigs() {

        var rigData = [{ name: "S1", id: "1" },
        { name: "S2", id: "2" },
        { name: "S3", id: "3" },
        { name: "S4", id: "4" }];//get row data from ajax
        var options = []; //

        Object.keys(rigData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={rigData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    //when rendering the dropdown, pass the prop of onChange
    //in so that the child Dropdown can send its data back
    //to the parent component that contains this RigDropdown.
    render() {
        var rigs = this.getRigs();
        return (
            <Dropdown onChange={this.props.onChange} id={"rigDropdown"} labelText="Rig:">
                {rigs}
            </Dropdown>
        );
    }
}