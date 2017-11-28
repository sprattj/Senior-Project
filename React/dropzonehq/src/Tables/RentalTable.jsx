import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from './ItemTable.jsx';
import RentalDisplayRig from '../ItemDisplays/RentalDisplayRig.jsx';
import RentalDisplayCanopy from '../ItemDisplays/RentalDisplayCanopy.jsx';
import RentalDisplayContainer from '../ItemDisplays/RentalDisplayContainer.jsx';
import ReturnButton from '../Buttons/ReturnButton.jsx';
import RentButton from '../ModalButtons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';
import moment from 'moment';
import "react-table/react-table.css";


var display = "";
export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rental-items";

        //method binding-
        this.processRows = this.processRows.bind(this);

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

        this.testFunc = this.testFunc.bind(this);
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

        //FETCHROWS DATA RESPONSES
        //item_id: (int), manufacturer: (string), brand: (string), description: (string), is_rentable: (0 or 1 boolean), item_type: (string), rig_number: (int), aad: (int), container: (int), isTandem: (0 or 1 boolean), canopy_on_rig: (0 or 1 boolean), 
        //jump_count: (int), date_of_manufacture: (dateTime), size: (int), canopy_sn: (string),
        //next_repack_date: (dateTime), packed_by_employee_id: (int), ride_count: (int),
        //container_sn: (string),
        //deployment_timestamp: (timeStamp), aad_sn: (string), lifespan: (string)

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

    //idk if this is used anymore here? might need for itemTable but im not sure 
    processRows(rowData) {        
        this.setState({
            filter: "all",
            columns: this.columnsAll,
            rows: this.all
        });
    }

    /* ***************************************************************************************************************************************************************
       **************************************************************************FETCHING***************************************************************************** 
       ***************************************************************************************************************************************************************
    */

    //Fetch all the items from the database
    fetchRows(self) {
        //make sure we have the packages required to
        //make a fetch call (maybe not needed)
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        //Define our endpoint using the rootURL, the URL section 
        //that we set in our constructor
        var url = rootURL + this.URLsection;

        //save 'this' so that we can call functions
        //inside the fetch() callback
        //var self = this;

        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (allRentableItems) {
                //console.log("RentalTable: fetchRows: first line of successful fetchRows, next line is response, following is self.all:");
                //console.log(allRentableItems);

                self.all = allRentableItems;
                //console.log(self.all);
                self.sortFetchRows(self.all);

                //console.log("RentalTable: fetchRows: next fetchRigInfo");
                self.fetchRigInfo(self);        //call next fetch
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });
    }

    //Fetch the info from the database of everything
    //attached to all rigs    
    fetchRigInfo(self) {
        //make sure we have the packages required to
        //make a fetch call (maybe not needed)
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        //Define our endpoint using the rootURL, the URL section 
        //that we set in our constructor (like "/rigsheets"), and
        //the sheetType prop ("Tandems" or "Students")
        //(rootURL is imported from our rest info file)
        var url = rootURL + "/rig_info";

        //save 'this' so that we can call functions
        //inside the fetch() callback-------------
        //var self = this;

        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (response) {
                //console.log("RentalTable: first line of successful fetchRigInfo: next line is response, following is rigsInfo:");
                //console.log(response);

                self.rigsInfo = response;            //set the array for the rigInfo view to be the result
                //console.log(self.rigsInfo);
                self.addRigData(self.rigsInfo);     //function to attach rigsInfo to correct this.all item

                //console.log("RentalTable: fetchRows: next fetchActiveRentals");
                self.fetchActiveRentals(self);      //call next fetchActiveRentals
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });
    }

    //Fetch the info from the database of all the 
    //rentals on the rentals table in db
    fetchActiveRentals(self) {
        var url = rootURL + "/rentals/active";
        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (response) {
                //console.log("RentalTable: fetchActiveRentals: first line of successful fetchActiveRentals: next line is response, following is activeRentals:");
                //console.log(response);

                self.activeRentals = response;              //set the array for the rigInfo view to be the result
                //console.log(self.activeRentals);
                self.addRentalData(self.activeRentals);     //function to attach active rental data to correct this.all item

                console.log("RentalTable: fetchActiveRentals: here is this.activeRentals: ");
                console.log(self.activeRentals);
                console.log("RentalTable: fetchActiveRentals: everything has been fetched and sorted, here is the final this.all: ");
                console.log(self.all);
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });
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

    //Takes the whole set of data given from db call and split it into the types so the split doesnt
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
            for(var j = 0; j < rigData.length; j++) {
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
        /*var count = 0;
        while (count < rentalData.length) {
            var allCount = 0;
            var activeV = rentalData[count].item_id;
            while (allCount < this.all.length && this.all[allCount].item_id <= activeV) {
                if (this.all[allCount].item_id === activeV) {
                    this.all[allCount].renter_name = rentalData[count].renter_name;
                    this.all[allCount].rental_id = rentalData[count].rental_id;
                    count++;
                    activeV = rentalData[count];
                }
                allCount++;
            }*/
        console.log("rentalData: " + rentalData);

        for (var i = 0; i < this.all.length; i++) {             //loop thru all items
            for (var j = 0; j < rentalData.length; j++) {       //loop thru the active rental array         
                if (this.all[i].item_id === rentalData[j].item[0]) {    //if the this.all item_id matches the item_id returned in the rentalData 
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
        //reset colors in the TABLE-----------------------------------------------------TODO
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
        console.log("RentalTable: rentItem: index: " + index + ". item_id: " + item_id +
                        ". renter_name: " + renter_name);
        
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/rentals/";

        var self = this;
        var requestVariables = {
            pin: '222222',
            item_id: item_id,
            renter_name: renter_name
        };
        fetch(url, {
            method: "POST",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        })//when we get a response back
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Rent Item Failed. Bad response " + response.status + " from server");
                }
                return response.json();
            })//when the call succeeds
            .then(function (responseData) {
                //for (var i = 0; i < self.all.length; i++) {
                //    if (index === self.all[i].index && !self.all[i].is_available) {
                //        self.all[i].is_available = 0;
                //        self.all[i].renter_name = renter_name;
                //    }
                //}
                console.log("RentalTable: rentItem Function");
                self.fetchRows(self);   //when the call succeeds rerun the fetches(which will sort the data as well)
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });  
    }

    returnItem(index, rental_id) {
        console.log("RentalTable: returnItem: index: " + index + ". rental_id: " + rental_id);
        
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/rentals/" + rental_id;

        var self = this;
        var requestVariables = {
            pin: '222222',
            returned_date: moment()
        };
        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        })//when we get a response back
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Return Item Failed. Bad response " + response.status + " from server");
                }
                return response.json();
            })//when the call succeeds
            .then(function (responseData) {
                console.log("RentalTable: returnItem Function: index passed in: " + index);
                //for (var i = 0; i < self.all.length; i++) {
                //     if (index === self.all[i].index && !self.all[i].is_available) {
                //        self.all[i].is_available = 1;
                //        self.all[i].renter_name = "";
                //    }
                //}
                self.fetchRows(self);   //when the call succeeds rerun the fetches(which will sort the data as well)
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            }); 
    }

    pinChanged(id, pin) {
        this.setState({
            pin: pin
        })
        console.log("RentalTable: pinChanged: pin is now: "  + this.state.pin);
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