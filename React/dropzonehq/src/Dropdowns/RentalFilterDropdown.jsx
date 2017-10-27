import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';

export default class RentalFilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.props.onChange.bind(this);
        this.state = {
            
        }
    }

    getRentalItems() {

        var rentalFiltersData = 
        [{ name: "Show All",  id: "1" },
        { name: "Rigs Only", id: "2" },
        { name: "Canopies Only", id: "3" },
        { name: "Containers Only", id: "4" },];//get row data from ajax
        var options = []; //

        Object.keys(rentalFiltersData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={rentalFiltersData[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    
    render() {
        var rentalFilters = this.getRentalItems();
        return (
            <div>                
                <Dropdown handleChange={() => this.props.onChange("test")}  labelText="Rental Filters:" id="rentalFilterDropdown">
                    {rentalFilters}
                </Dropdown>                
            </div>
        );
    }
}