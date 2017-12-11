import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from './ItemTable.jsx';
import RentalDisplayRig from '../ItemDisplays/RentalDisplayRig.jsx';
import RentalDisplayCanopy from '../ItemDisplays/RentalDisplayCanopy.jsx';
import RentalDisplayContainer from '../ItemDisplays/RentalDisplayContainer.jsx';
import ReturnButton from '../Buttons/ReturnButton.jsx';
import RentButton from '../ModalButtons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import "react-table/react-table.css";
import RequestHandler from '../RequestHandler.js';
import Binder from '../Binder.js';


var display = "";
export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "rental-items/";

        //method binding-

        this.fetchRows = this.fetchRows.bind(this);
        this.fetchRigInfo = this.fetchRigInfo.bind(this);
        this.fetchActiveRentals = this.fetchActiveRentals.bind(this);

        this.sortFetchRows = this.sortFetchRows.bind(this);
        this.getFilteredRows = this.getFilteredRows.bind(this);
        this.addRigData = this.addRigData.bind(this);
        this.addRentalData = this.addRentalData.bind(this);

        this.filterChanged = this.filterChanged.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.rigSelected = this.rigSelected.bind(this);
        this.canopySelected = this.canopySelected.bind(this);
        this.containerSelected = this.containerSelected.bind(this);
        this.rentItem = this.rentItem.bind(this);
        this.returnItem = this.returnItem.bind(this);
        this.pinChanged = this.pinChanged.bind(this);

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, RentalTable);
        //method binding end-

        //variable arrays--
        this.all = [];              //all items returned from fetchRows()
        this.activeRentals = [];     //all current rental records returned from fetchActiveRentals()

        this.rigs = [];             //all rigs returned from fetchRows() sorted by getFilteredRows()
        this.rigsInfo = [];         //all rig pieces data returned from fetchRigInfo()

        this.canopies = [];         //all canopies returned from fetchRows()

        this.containers = [];       //all containers returned from fetchRows
        this.rentalContainers = []; //all rentable containers

        this.aads = [];             //all aads returned from fetchRows

        //variable arrays end--

        //column variables---
        this.columnsAll = [{
            Header: 'Item Type',
            accessor: 'item_type', // String-based value accessors!
            width: 150
        }, {
            Header: 'Item Description',
            accessor: 'description',
            width: 400
        }];

        this.columnsRigs = [{
            Header: 'Main',
            accessor: 'main_canopy_brand',
            width: 150
        }, {
            Header: 'Main Size',
            accessor: 'main_canopy_size',
            width: 150
        }, {
            Header: 'Container',
            accessor: 'container_brand',
            width: 250
        }];

        this.columnsCanopies = [{
            Header: 'Canopy Brand',
            accessor: 'brand',
            width: 150
        }, {
            Header: 'Canopy Size',
            accessor: 'size',
            width: 150
        }, {
            Header: 'Canopy Description',
            accessor: 'description',
            width: 250
        }];

        this.columnsContainers = [{
            Header: 'Container Brand',
            accessor: 'brand',
            width: 150
        }, {
            Header: 'Container Description',
            accessor: 'description',
            width: 400
        }];
        //column variables end---

        this.state = {
            filter: "all",
            columns: this.columnsAll,
            rows: this.all,
            index: 0,
            pin: ''
        };

    }//constructor end

    //When this RentalTable component loads on the page, fetch the rows
    //from the database and display them.
    componentWillMount() {
        this.fetchRows(this);
    }

    componentDidMount() {
    }

    /* ***************************************************************************************************************************************************************
       **************************************************************************FETCHING***************************************************************************** 
       ***************************************************************************************************************************************************************
    */

    //FETCHROWS DATA RESPONSES
    //item_id: (int), manufacturer: (string), brand: (string), description: (string), is_rentable: (0 or 1 boolean), item_type: (string), rig_number: (int), aad: (int), container: (int), isTandem: (0 or 1 boolean), canopy_on_rig: (0 or 1 boolean), 
    //jump_count: (int), date_of_manufacture: (dateTime), size: (int), canopy_sn: (string),
    //next_repack_date: (dateTime), packed_by_employee_id: (int), ride_count: (int),
    //container_sn: (string),
    //deployment_timestamp: (timeStamp), aad_sn: (string), lifespan: (string)


    //Fetch all the items from the database
    fetchRows(self) {

        var endpoint = this.URLsection
        var successMsg = "Fetched all rental data.";
        var errorMsg = "Problem fetching rental data.";
        var callback = function (allRentableItems) {
            self.all = allRentableItems;
            self.sortFetchRows(self.all);
            self.fetchRigInfo(self);        //call next fetch
        }
        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Fetch the info from the database of everything
    //attached to all rigs    
    fetchRigInfo(self) {
        var endpoint = "rig_info/";
        var successMsg = "Fetched rig data.";
        var errorMsg = "Problem fetching rig data.";
        var callback = function (response) {
            self.rigsInfo = response;            //set the array for the rigInfo view to be the result
            self.addRigData(self.rigsInfo);     //function to attach rigsInfo to correct this.all item
            self.fetchActiveRentals(self);      //call next fetchActiveRentals
        }
        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Fetch the info from the database of all the 
    //rentals on the rentals table in db
    fetchActiveRentals(self) {
        var endpoint = "rentals/active/"
        var successMsg = "Fetched data for active rentals.";
        var errorMsg = "Problem fetching active rentals.";
        var callback = function (response) {
            self.activeRentals = response;              //set the array for the rigInfo view to be the result
            self.addRentalData(self.activeRentals);     //function to attach active rental data to correct this.all item
        }
        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    /* ***************************************************************************************************************************************************************
       *************************************************************************FETCHING END**************************************************************************
       ***************************************************************************************************************************************************************
    */

    /* ***************************************************************************************************************************************************************
       ****************************************************************************SORTING****************************************************************************
       ***************************************************************************************************************************************************************
    */

    sortFetchRows(allItemData) {
        this.getFilteredRows(allItemData);               //sort all items into types 
        this.setState({ rows: this.all, columns: this.columnsAll });
    }

    //Takes the whole set of data given from db call and split it into the 4 types so the split doesnt
    //need to take place more than once after each db call not when filter is selected
    getFilteredRows(rowData) {
        //reset the arrays so we're not pushing onto old data below
        this.rigs = [];
        this.canopies = [];
        this.containers = [];
        this.aads = [];

        for (var i = 0; i < rowData.length; i++) {
            if (rowData[i].item_type === "rig") {               //if the type is rig
                this.rigs.push(rowData[i]);
            } else if (rowData[i].item_type === "canopy") {     //if the type is canopy
                this.canopies.push(rowData[i]);
            } else if (rowData[i].item_type === "container") {  //if the type is container
                this.containers.push(rowData[i]);
            } else if (rowData[i].item_type === "aad") {
                this.aads.push(rowData[i]);
            }
        }
    }

    //This method loops through this.all and compairs the "rig_number" from Rental Items View
    //to the "rig_id" that comes from the the Rig Info View
    addRigData(rigData) {
        for (var i = 0; i < this.all.length; i++) {
            for (var j = 0; j < rigData.length; j++) {
                if (this.all[i].rig_number === rigData[j].rig_id) {
                    this.all[i].main_canopy_size = rigData[j].main_canopy_size;
                    this.all[i].main_canopy_brand = rigData[j].main_canopy_brand;
                    this.all[i].reserve_canopy_size = rigData[j].reserve_canopy_size;
                    this.all[i].reserve_canopy_brand = rigData[j].reserve_canopy_brand;
                    this.all[i].container_brand = rigData[j].container_brand;
                    this.all[i].aad_lifespan = rigData[j].aad_lifespan;
                }
            }
        }
    }

    //This method loops through this.all and compairs the "item_id" from Rental Items View
    //to the "rental_id" that comes from the the Rentals View
    addRentalData(rentalData) {        
        for (var i = 0; i < this.all.length; i++) {                         //loop thru all items
            for (var j = 0; j < rentalData.length; j++) {                   //loop thru the active rental array         
                if (this.all[i].item_id === rentalData[j].item[0]) {        //if the this.all item_id matches the item_id returned in the rentalData 
                    this.all[i].renter_name = rentalData[j].renter_name;    //set those variables in the row of this.all
                    this.all[i].rental_id = rentalData[j].rental_id;
                }
            }
        }
    }

    /* ***************************************************************************************************************************************************************
       **************************************************************************SORTING END**************************************************************************      
       ***************************************************************************************************************************************************************
    */

    /* ***************************************************************************************************************************************************************
       **************************************************************************CHANGING*****************************************************************************      
       ***************************************************************************************************************************************************************
    */

    pinChanged(id, pin) {
        this.setState({
            pin: pin
        })
    }

    //When a selection is made on FilterDropdown this function should 
    //be called to change the values on the RentalTable 
    filterChanged(selection) {
        switch (selection) {
            case "Show All":
                this.setState({ filter: "all", rows: this.all, columns: this.columnsAll });
                break;
            case "Rigs Only":
                this.setState({ filter: "rig", rows: this.rigs, columns: this.columnsRigs });
                break;
            case "Canopies Only":
                this.setState({ filter: "canopy", rows: this.canopies, columns: this.columnsCanopies });
                break;
            case "Containers Only":
                this.setState({ filter: "container", rows: this.containers, columns: this.columnsContainers });
                break;
            default:
                this.setState({ filter: "all", rows: this.all, columns: this.columnsAll });
                break;
        }        
        this.props.resetDisplay();
    }

    testFunc() {
        console.log("ReturnButton Test");
    }

    //calls up to the screen change the display on the right
    itemSelected(selectedIndex) {
        var row = this.state.rows[selectedIndex];   //use the selectedIndex to find the row in the rows state
        var rentalButton;                           //variable Rent or Return button shows if Available or Rented         

        console.log("selectedIndex: " + selectedIndex);
        console.log("itemID: " + row.item_id);
        if (row.is_available) {     //if the item is rented set the rentalButton var to Return
            rentalButton = <RentButton pinChanged={this.pinChanged} buttonText={"Rent"} rent={this.rentItem}
                index={selectedIndex} item_id={row.item_id} />;
        } else {                //if the item isnt rented set the rentalButton var to Rent
            console.log("row rentalID: " + row.rental_id);
            rentalButton = <ReturnButton pinChanged={this.pinChanged} buttonText={"Return"} return={this.returnItem}
                index={selectedIndex} item_id={row.item_id} rental_id={row.rental_id} />;
        }

        //select the type of Rental Item Display will be shown based on the selected item's .item_type
        switch (row.item_type) {
            case ("rig"):
                this.rigSelected(row, rentalButton);
                break;

            case ("canopy"):
                this.canopySelected(row, rentalButton);
                break;

            case ("container"):
                this.containerSelected(row, rentalButton);
                break;
            default:
            break;
        }
        this.props.displayChange(display, row.index);          //pass it up thru props method call
    }

    //Rigs should display main_canopy_brand, main_canopy_size, reserve_canopy_brand,
    // reserve_canopy_size, containerBrand, aadExpirationDate, description
    rigSelected(row, rentalButton) {
        for (var i = 0; i < this.rigsInfo.length; i++) {        //loop thru the rigsInfo fetched
            if (this.rigsInfo[i].rig_id === row.rig_number) {   //if the rig_number on the selected row matches the rig_id of the list set the variables
                this.currentMainSize = this.rigsInfo[i].main_canopy_size;
                this.currentMainBrand = this.rigsInfo[i].main_canopy_brand;
                this.currentReserveSize = this.rigsInfo[i].reserve_canopy_size;
                this.currentReserveBrand = this.rigsInfo[i].reserve_canopy_brand;
                this.currentContainerBrand = this.rigsInfo[i].container_brand;
                this.currentAAD = this.rigsInfo[i].aad_lifespan;
            }
        }

        //create the display to show on the side
        display = <RentalDisplayRig
            item_id={row.item_id}
            is_available={row.is_available}
            description={row.description}

            renter_name={row.renter_name}

            main_canopy_brand={this.currentMainBrand}
            main_canopy_size={this.currentMainSize}
            reserve_canopy_brand={this.currentReserveBrand}
            reserve_canopy_size={this.currentReserveSize}
            container_brand={this.currentContainerBrand}
            aad_lifespan={this.currentAAD}

            button={rentalButton}
        />;
    }

    canopySelected(row, rentalButton) {
        display = <RentalDisplayCanopy
            item_id={row.item_id}
            is_available={row.is_available}
            description={row.description}

            renter_name={row.renter_name}
            brand={row.brand}
            size={row.size}

            button={rentalButton}
        />;
    }

    containerSelected(row, rentalButton) {
        display = <RentalDisplayContainer
            item_id={row.item_id}
            is_available={row.is_available}
            description={row.description}

            renter_name={row.renter_name}
            brand={row.brand}

            button={rentalButton}
        />;
    }


    rentItem(index, renter_name, item_id) {
        var endpoint = "rentals/";
        var self = this;
        var variables = {
            pin: '222222',
            item_id: item_id,
            renter_name: renter_name
        };
        var successMsg = "Item rented successfully.";
        var errorMsg = "Renting item failed.";
        var callback = function (responseData) {
            console.log("RentalTable: rentItem callback");
            self.fetchRows(self);   //when the call succeeds rerun the fetches(which will sort the data as well)
        };
        //make the request via handler
        var handler = new RequestHandler();
        handler.post(endpoint, variables, successMsg, errorMsg, callback);
    }

    returnItem(index, rental_id) {

        var endpoint = "rentals/" + rental_id;
        var successMsg = "Item rental " + rental_id + " returned.";
        var errorMsg = "Problem returning rental " + rental_id + ".";
        var self = this;
        var variables = {
            pin: '222222',
            returned_date: moment()
        };

        var callback = function (responseData) {
            console.log("RentalTable: returnItem Function: index passed in: " + index);
            //for (var i = 0; i < self.all.length; i++) {
            //     if (index === self.all[i].index && !self.all[i].is_available) {
            //        self.all[i].is_available = 1;
            //        self.all[i].renter_name = "";
            //    }
            //}
            self.fetchRows(self);   //when the call succeeds rerun the fetches(which will sort the data as well)
        }
        var handler = new RequestHandler();
        handler.patch(endpoint, variables, successMsg, errorMsg, callback);
    }
    

    /* ***************************************************************************************************************************************************************
       *************************************************************************CHANGING END**************************************************************************       
       ***************************************************************************************************************************************************************
    */


    render() {
        var filterDropdown = <FilterDropdown
            onChange={this.filterChanged}
            labelText="Rental Item Filters:"
            id="RentalFilterDropdown"
        />
        return (
            <div>
                <Row>
                    <Col>
                        <ItemTable
                            columns={this.state.columns}
                            rows={this.state.rows}
                            top={filterDropdown}
                            bottom={""}
                            itemSelected={this.itemSelected}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

}//class end