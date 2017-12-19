import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';


const rentalFiltersData =
    [{ name: "Show All", id: "1" },
    { name: "Rigs Only", id: "2" },
    { name: "Canopies Only", id: "3" },
    { name: "Containers Only", id: "4" },];
//the filters will probably end up different
const itemFiltersData =
    [{ name: "Show All", id: "1" },
    { name: "Rigs Only", id: "2" },
    { name: "Canopies Only", id: "3" },
    { name: "Containers Only", id: "4" },
    { name: "AADs Only", id: "5" }];

const addItemFiltersData =
    [{ name: "Select Item type", id: "1" },
    { name: "Add Rig", id: "2" },
    { name: "Add Canopy", id: "3" },
    { name: "Add Container", id: "4" },
    { name: "Add AAD", id: "5" }];

const defaultFiltersData = rentalFiltersData

//a class to call the dropdowns of any filter we may need
//based on the "id" required in Dropdown we can provide different FilterOptionData
export default class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
        }
    }

    getFilterOptions() {
        var options = [];
        var choice;
        switch (this.props.id) {
            case "RentalFilterDropdown":
                choice = rentalFiltersData;
                break;
            case "InventoryFilterDropdown":
                choice = itemFiltersData;
                break;
            case "InventoryAddItemFilterDropdown":
                choice = addItemFiltersData;
                break;
            default:
                choice = defaultFiltersData;
                break;
        }

        Object.keys(choice).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={choice[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    onChange(index) {
        
        var choice;
        switch (this.props.id) {
            case "RentalFilterDropdown":
                this.props.onChange(rentalFiltersData[index].name.toString());
                break;
            case "InventoryFilterDropdown":
                this.props.onChange(itemFiltersData[index].name.toString());
                break;
            case "InventoryAddItemFilterDropdown":
                this.props.onChange(addItemFiltersData[index].name.toString());
                break;
            default:
                choice = defaultFiltersData;
                break;
        }
    }

    render() {
        var Filtered = this.getFilterOptions();
        return (
            <div>
                <Dropdown
                    onChange={this.onChange}
                    labelText={this.props.labelText}
                    id={this.props.id}>
                    {Filtered}
                </Dropdown>
            </div>
        );
    }
}