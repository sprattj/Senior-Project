import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { Form } from 'reactstrap';

export default class PlaneLoadDropdown extends React.Component {

    getPlaneloads() {

        var planeLoadData = [{ name: "111", id: "1" },
        { name: "222", id: "2" },
        { name: "333", id: "3" },
        { name: "444", id: "4" }];//get row data from ajax
        var options = []; //

        Object.keys(planeLoadData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={planeLoadData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    render() {
        var planeLoads = this.getPlaneloads();
        return (
                <Dropdown onChange={this.props.onChange} id={"planeLoadDropdown"} labelText="Plane Load:">
                    {planeLoads}
                </Dropdown>
        );
    }
}