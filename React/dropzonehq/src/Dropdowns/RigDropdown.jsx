import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class RigDropdown extends React.Component {

    constructor(props) {
        super(props);

        //bind methods to allow callbacks
        this.createDropdownOptions = this.createDropdownOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //get rig data from server
        var rigs = this.getRigs();
        this.state = {
            rigData: rigs
        }
    }

    //create drowdown options from the given rig data
    createDropdownOptions(rigData) {
        var options = [];
        Object.keys(rigData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={rigData[i].rigID} />
            options.push(nextOption);
        });
        return options;
    }

    //get all of the rig data from server
    getRigs() {
        var rigData = [{ rigID: 111, id: "1" },
        { rigID: 222, id: "2" },
        { rigID: 333, id: "3" },
        { rigID: 444, id: "4" }];//get row data from ajax
        return rigData;
    }

    //send back the data for the dropdown item that was selected
    handleChange(selectedIndex) {
        this.props.onChange(this.state.rigData[selectedIndex]);
    }

    //render a dropdown and pass it our data converted into dropdownoptions
    render() {
        return (
            <Dropdown onChange={this.handleChange} id={"rigDropdown"} labelText="Rig:">
                {this.createDropdownOptions(this.state.rigData)}
            </Dropdown>
        );
    }
}