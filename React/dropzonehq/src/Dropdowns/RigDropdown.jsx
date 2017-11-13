import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class RigDropdown extends React.Component {

    //method to get all of the data for rigs
    getRigs() {

        var rigData = [{ rigID: 111, id: "1" },
        { rigID: 222, id: "2" },
        { rigID: 333, id: "3" },
        { rigID: 444, id: "4" }];//get row data from ajax
        var options = []; //

        Object.keys(rigData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={rigData[i].rigID} />
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