import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { Form } from 'reactstrap';

export default class PlaneLoadDropdown extends React.Component {

    getPlaneloads() {

        var planeLoadData = [{ name: "Paul B", id: "1" },
        { name: "Paul B", id: "2" },
        { name: "Paul B", id: "3" },
        { name: "Paul B", id: "4" }];//get row data from ajax
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
                <Dropdown id={"planeLoadDropdown"} labelText="Plane Load:">
                    {planeLoads}
                </Dropdown>
        );
    }
}