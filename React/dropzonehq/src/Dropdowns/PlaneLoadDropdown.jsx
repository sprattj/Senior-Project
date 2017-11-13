import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class PlaneLoadDropdown extends React.Component {

    constructor(props) {
        super(props);

        //bind methods to allow callbacks
        this.createDropdownOptions = this.createDropdownOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //get plane load data from server
        var planeLoads = this.getPlaneLoads();
        this.state = {
            planeLoadData: planeLoads
        }
    }

    //get all of the planeload data from server
    getPlaneLoads() {
        var planeLoadData = [{ name: "111", id: "1" },
        { name: "222", id: "2" },
        { name: "333", id: "3" },
        { name: "444", id: "4" }];//get row data from ajax
        return planeLoadData;
    }

    //create drowdown options from the given planeload data
    createDropdownOptions(planeLoadData) {
        var options = []; //

        Object.keys(planeLoadData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={planeLoadData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    //send back the data for the dropdown item that was selected
    handleChange(selectedIndex) {
        this.props.onChange(this.state.planeLoadData[selectedIndex]);
    }

    //render a dropdown and pass it our data converted into dropdownoptions
    render() {
        return (
            <Dropdown onChange={this.handleChange} id={"rigDropdown"} labelText="Plane Load:">
                {this.createDropdownOptions(this.state.planeLoadData)}
            </Dropdown>
        );
    }
}