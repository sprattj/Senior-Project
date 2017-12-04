import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from '../Tables/ItemTable.jsx';

import BlankItemDisplay from '../ItemDisplays/BlankItemDisplay.jsx';
import InventoryDisplayRig from '../ItemDisplays/InventoryDisplayRig.jsx';
import InventoryDisplayCanopy from '../ItemDisplays/InventoryDisplayCanopy.jsx';
import InventoryDisplayContainer from '../ItemDisplays/InventoryDisplayContainer.jsx';
import InventoryDisplayAAD from '../ItemDisplays/InventoryDisplayAAD.jsx';

import AddInventoryItemBtn from '../Buttons/AddInventoryItemBtn.jsx';
import PropTypes from 'prop-types';
import { Row, Col, Card, ButtonGroup } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import "react-table/react-table.css";
import { toast } from 'react-toastify';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

var count = 0;

export default class InventoryScreen extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/items";

        //this.toggleRented = this.toggleRented.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
        this.getFilteredRows = this.getFilteredRows.bind(this);

        this.itemSelected = this.itemSelected.bind(this);
        this.rigSelected = this.rigSelected.bind(this);
        this.canopySelected = this.canopySelected.bind(this);
        this.reserveCanopySelected = this.reserveCanopySelected.bind(this);
        this.containerSelected = this.containerSelected.bind(this);
        this.aadSelected = this.aadSelected.bind(this);

        this.setupDisplay = this.setupDisplay.bind(this);
        this.displayChange = this.displayChange.bind(this);
        this.displayAddView = this.displayAddView.bind(this);
        this.resetDisplay = this.resetDisplay.bind(this);
        this.updateAADRow = this.updateAADRow.bind(this);
        this.updateCanopyRow = this.updateCanopyRow.bind(this);
        this.updateReserveCanopyRow = this.updateReserveCanopyRow.bind(this);
        this.updateContainerRow = this.updateContainerRow.bind(this);
        this.updateRigRow = this.updateRigRow.bind(this);

        this.displayAddContainer = this.displayAddContainer.bind(this);
        this.displayAddCanopy = this.displayAddCanopy.bind(this);
        this.addAAD = this.addAAD.bind(this);
        this.addContainer = this.addContainer.bind(this);
        this.addCanopy = this.addCanopy.bind(this);

        this.all = new Map();
        this.rigs = new Map();
        this.canopies = new Map();
        this.containers = new Map();
        this.aads = new Map();

        this.columnsAll = [{
            Header: 'Item manufacturer',
            accessor: 'manufacturer',                       // String-based value accessors!
            width: 150
        }, {
            Header: 'Item Description',
            accessor: 'description',
            width: 400
        }];

        this.columnsRigs = [{
            Header: 'Main',
            accessor: 'mainBrand',
            width: 150
        }, {
            Header: 'Main Size',
            accessor: 'mainSize',                           //TODO How will i get data back for the items attached to rigs?
            width: 150
        }, {
            Header: 'Container',
            accessor: 'containerBrand',
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

        this.columnsAAD = [{
            Header: 'Lifespan',
            accessor: 'lifespan',
            width: 150
        }, {
            Header: 'Deployment Date',
            accessor: 'deployment_timestamp',
            width: 150
        }];

        //Test Data to fill the table until we connect to the DB
        /*var rowData =
            [{ index: 0, item_id: 0, manufacturer: "00", description: "Red and Black Mirage", is_rentable: true, isRented: true, item_type: "container", brand: "Mirage" },
            { index: 1, item_id: 1, manufacturer: "01", description: "Blue and White Saber 170. Pink and Blue Javelin", is_rentable: true, isRented: true, brand: "Frank", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Saber", mainSize: "170", containerBrand: "Javelin" },
            { index: 2, item_id: 2, manufacturer: "02", description: "Red and Green Pilot 220. Black and Yellow Mirage", is_rentable: true, isRented: false, brand: "", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Pilot", mainSize: "220", containerBrand: "Mirage" },
            { index: 3, item_id: 3, manufacturer: "03", description: "Brown Navigator 190. Black and White Mirage", is_rentable: true, isRented: false, brand: "", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Navigator", mainSize: "190", containerBrand: "Mirage" },
            { index: 4, item_id: 4, manufacturer: "04", description: "Old Yellow and Gray Pilot 240. Brown and Black Javelin", is_rentable: true, isRented: true, brand: "Sam", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Pilot", mainSize: "240", containerBrand: "Javelin" },
            { index: 5, item_id: 5, manufacturer: "05", description: "Green, Orange, White Navigator 210 fater lines. Brown and Black Javelin", is_rentable: true, isRented: true, brand: "Sue", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Navigator", mainSize: "210", containerBrand: "Javelin" },
            { index: 6, item_id: 6, manufacturer: "06", description: "Green, Orange, White Navigator 170. Brown and Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Navigator", mainSize: "170", containerBrand: "Javelin" },
            { index: 7, item_id: 7, manufacturer: "07", description: "Green, Orange, White Navigator 150. Brown and Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Navigator", mainSize: "150", containerBrand: "Javelin" },
            { index: 8, item_id: 8, manufacturer: "08", description: "Green, Yellow, Purple Navigator 190. Brown and Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Navigator", mainSize: "190", containerBrand: "Javelin" },
            { index: 9, item_id: 9, manufacturer: "09", description: "Black Main in Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
            { index: 10, item_id: 10, manufacturer: "10", description: "Red, White, Yellow Saber2 170. Red Javelin", is_rentable: true, isRented: true, brand: "Ralph", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
            { index: 11, item_id: 11, manufacturer: "11", description: "Blue and Black Main. Blue and Black Mirage", is_rentable: true, isRented: false, brand: "", item_type: "rig", reserve_canopy_brand: "rc brand 1", main_canopy_brand: "mc brand", mainBrand: "Pilot", mainSize: "190", containerBrand: "Mirage" },
            { index: 12, item_id: 12, manufacturer: "12", description: "Red and Black Navigator", is_rentable: true, isRented: false, item_type: "canopy", brand: "Navigator", size: "210" },
            { index: 13, item_id: 13, manufacturer: "13", description: "Blue and Black Mirage", is_rentable: true, isRented: false, item_type: "container", brand: "Mirage" },
            { index: 14, item_id: 14, manufacturer: "14", description: "Orange and Black Mirage", is_rentable: true, isRented: false, item_type: "aad", brand: "theBrand", lifespan: "Mirage", deployment_timestamp: "11/19/2017" },
            { index: 15, item_id: 15, manufacturer: "15", description: "Cyan and Black", is_rentable: true, isRented: false, item_type: "aad", brand: "Zoey's brand", lifespan: "Apple", deployment_timestamp: "11/24/2017" }
            ];

        this.getFilteredRows(rowData);*/

        this.state = {
            filter: "all",
            columns: this.columnsAll,
            rows: Array.from(this.all.values()), // rows: mapName.values() instead of rows: rowData
            index: 0,
            currentItem: <BlankItemDisplay headerText={"Inventory Item Details"} />
        };
    }

    //When this RentalTable component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchRows();
    }

    //Fetch the items from the database that are 
    //rentals and update the RentalTable's state to display them.
    fetchRows() {

        //make sure we have the packages required to
        //make a fetch call (maybe not needed)
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + this.URLsection;

        //save 'this' so that we can call functions
        //inside the fetch() callback
        var self = this;

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
            .then(function (rowData) {
                self.getFilteredRows(rowData);
                self.setState({
                    filter: "all",
                    columns: self.columnsAll,
                    rows: Array.from(self.all.values()), // rows: mapName.values() instead of rows: rowData
                    index: 0,
                    currentItem: <BlankItemDisplay headerText={"Inventory Item Details"} />
                });
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });;
    }



    updateAADRow(itemInfo, AADInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/AADs/" + itemInfo.item_id;

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.lifespan = AADInfo.lifespan;
        requestVariables.serial_number = AADInfo.aad_sn;

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing AAD failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var AAD = self.all.get(itemInfo.item_id);
            AAD.manufacturer = itemInfo.manufacturer;
            AAD.description = itemInfo.description;
            AAD.is_on_rig = itemInfo.is_on_rig;
            AAD.brand = itemInfo.brand;
            AAD.is_rentable = itemInfo.is_rentable;
            AAD.lifespan = AADInfo.lifespan;
            AAD.serial_number = AADInfo.aad_sn;

            self.all.set(itemInfo.item_id, AAD);
            self.aads.set(itemInfo.item_id, AAD);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in AAD display
                self.setState({
                    rows: Array.from(self.aad.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    updateReserveCanopyRow(item_id, manufacturer, description, isOnRig, brand,
        isRentable, rig_id, serial_number, size, date_of_manufacture,
        jump_count, last_repack_date, next_repack_date, packed_by_employee_id, ride_count) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/canopies/reserve/" + item_id;

        var self = this;
        var requestVariables = {
            manufacturer: manufacturer,
            description: description,
            is_on_rig: isOnRig,
            brand: brand,
            is_rentable: isRentable,
            rig_id: rig_id,
            serial_number: serial_number,
            size: size,
            date_of_manufacture: date_of_manufacture,
            jump_count: jump_count,
            last_repack_date: last_repack_date,
            next_repack_date: next_repack_date,
            packed_by_employee_id: packed_by_employee_id,
            ride_count: ride_count,
            pin: this.state.pin
        };

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing reserve canopy failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var reserveCanopy = self.all.get(item_id);
            reserveCanopy.manufacturer = manufacturer;
            reserveCanopy.description = description;
            reserveCanopy.is_on_rig = isOnRig;
            reserveCanopy.brand = brand;
            reserveCanopy.is_rentable = isRentable;
            reserveCanopy.serial_number = serial_number;
            reserveCanopy.size = size;
            reserveCanopy.date_of_manufacture = date_of_manufacture;
            reserveCanopy.jump_count = jump_count;

            self.all.set(item_id, reserveCanopy);
            self.canopies.set(item_id, reserveCanopy);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // TODO: CHANGE TO RESERVECANOPIES MAP instead of "all"
                // must be in reserve_canopy display
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });

    }

    updateCanopyRow(itemInfo, canopyInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        console.log("item info in fetch call: " + JSON.stringify(itemInfo));
        var url = rootURL + "/canopies/" + itemInfo.item_id;

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.pin = this.state.pin;
        requestVariables.rig_id = canopyInfo.rig_num;
        requestVariables.serial_number = canopyInfo.canopy_sn;
        requestVariables.size = canopyInfo.size;
        requestVariables.jump_count = canopyInfo.jump_count;

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing canopy failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var canopy = self.all.get(itemInfo.item_id);
            canopy.manufacturer = itemInfo.manufacturer;
            canopy.description = itemInfo.description;
            canopy.is_on_rig = itemInfo.is_on_rig;
            canopy.brand = itemInfo.brand;
            canopy.is_rentable = itemInfo.is_rentable;
            canopy.serial_number = canopyInfo.canopy_sn;
            canopy.size = canopyInfo.size;
            canopy.jump_count = canopyInfo.jump_count;

            self.all.set(itemInfo.item_id, canopy);
            self.canopies.set(itemInfo.item_id, canopy);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in Canopies display
                self.setState({
                    rows: Array.from(self.canopies.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    updateRigRow(itemInfo, rigInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/rigs/" + itemInfo.item_id;

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.aad_id = rigInfo.aad;
        requestVariables.container_id = rigInfo.container;
        requestVariables.isTandem = rigInfo.isTandem;
        requestVariables.pin = this.state.pin;

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing rig failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {

            var rig = self.all.get(itemInfo.item_id);
            rig.manufacturer = itemInfo.manufacturer;
            rig.description = itemInfo.description;
            rig.brand = itemInfo.brand;
            rig.is_rentable = itemInfo.isRentable;
            rig.container_id = rigInfo.container;
            rig.aad_id = rigInfo.aad;
            rig.isTandem = rigInfo.isTandem;

            self.all.set(itemInfo.item_id, rig);
            self.rigs.set(itemInfo.item_id, rig);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in Rigs display
                self.setState({
                    rows: Array.from(self.rigs.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    updateContainerRow(itemInfo, containerInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        console.log("item_id: " + itemInfo.item_id);
        
        var url = rootURL + "/containers/" + itemInfo.item_id;

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.serial_number = containerInfo.container_sn;
        requestVariables.pin = this.state.pin;

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing container failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var container = self.all.get(itemInfo.item_id);
            container.manufacturer = itemInfo.manufacturer;
            container.description = itemInfo.description;
            container.is_on_rig = itemInfo.is_on_rig;
            container.brand = itemInfo.brand;
            container.is_rentable = itemInfo.is_rentable;
            container.container_sn = containerInfo.container_sn;

            self.all.set(itemInfo.item_id, container);
            self.containers.set(itemInfo.item_id, container);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in Containers display
                self.setState({
                    rows: Array.from(self.containers.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    getFilteredRows(rowData) {
        this.all = new Map();
        this.rigs = new Map();
        this.canopies = new Map();
        this.containers = new Map();
        this.aads = new Map();

        // save everything first
        for (var i = 0; i < rowData.length; i++) {
            // map row to item_id in that row
            this.all.set(rowData[i].item_id, rowData[i]);
            if (rowData[i].item_type === "rig") {
                //if the type is rig
                this.rigs.set(rowData[i].item_id, rowData[i]);
            } else if (rowData[i].item_type === "canopy") {
                // if the type is canopy
                this.canopies.set(rowData[i].item_id, rowData[i]);
            } else if (rowData[i].item_type === "container") {
                // if the type is container
                this.containers.set(rowData[i].item_id, rowData[i]);
            } else if (rowData[i].item_type === "aad") {
                // if the type is AAD
                this.aads.set(rowData[i].item_id, rowData[i]);
            }
        }
    }


    //changes the display of the right side of the screen by
    //taking in a EditInventoryItemDisplay and setting it in the currentItem state
    displayChange(itemDisplay, selectedIndex) {
        if (!(itemDisplay === "")) {
            console.log("Inventory Screen-> displayChange> index: " + selectedIndex);
            this.setState({
                currentItem: itemDisplay,
                index: selectedIndex
            });
        } else {
            console.log("check what 'itemDisplay' is");
        }
    }

    //for the dropdown    
    filterChanged(selection) {
        switch (selection) {
            case "Show All":
                this.setState({ filter: "all", rows: Array.from(this.all.values()), columns: this.columnsAll });
                break;
            case "Rigs Only":
                this.setState({ filter: "rig", rows: Array.from(this.rigs.values()), columns: this.columnsRigs });
                break;
            case "Canopies Only":
                this.setState({ filter: "canopy", rows: Array.from(this.canopies.values()), columns: this.columnsCanopies });
                break;
            case "Containers Only":
                this.setState({ filter: "container", rows: Array.from(this.containers.values()), columns: this.columnsContainers });
                break;
            case "AADs Only":
                this.setState({ filter: "aad", rows: Array.from(this.aads.values()), columns: this.columnsAAD });
                break;
            default:
                this.setState({ filter: "all", rows: Array.from(this.all.values()), columns: this.columnsAll });
                break;
        }

        this.resetDisplay();
        //this.processRows(this.state.rows, this.state.filter);
    }

    resetDisplay() {
        this.setState({
            currentItem: <BlankItemDisplay headerText={"Inventory Item Details"} />
        });
    }

    //calls up to the screen change the display on the right
    itemSelected(selectedIndex) {

        console.log("selectedIndex: " + selectedIndex);

        var row = this.state.rows[selectedIndex];   //use the selectedIndex to find the row in the rows state

        var display = this.setupDisplay(row);

        this.displayChange(display, selectedIndex);

        console.log("Selection count: " + count);
        count++;

        console.log("selected values => index: " + selectedIndex + " \n itemNum: " + this.state.rows[selectedIndex].manufacturer + " \n brand: "
            + this.state.rows[selectedIndex].brand + " \n itemdescription: " + this.state.rows[selectedIndex].description
            + " \n itemType: " + this.state.rows[selectedIndex].item_type
            + " \n is_rentable: " + this.state.rows[selectedIndex].is_rentable);
    }

    // set up the display component, based on Item Type
    setupDisplay(row) {
        var display;

        // select the type of Inventory Item Display will be shown 
        // based on the selected item's .item_type
        var itemInfo = {
            item_id: row.item_id,
            item_type: row.item_type,
            manufacturer: row.manufacturer,
            description: row.description,
            is_on_rig: row.is_on_rig,
            brand: row.brand,
            is_rentable: row.is_rentable
        };
        console.log("itemType: " + row.item_type);
        switch (row.item_type) {
            case ("rig"):
                display = this.rigSelected(row, itemInfo);
                break;
            case ("canopy"):
                display = this.canopySelected(row, itemInfo);
                break;
            case ("reserve_canopy"):
                display = this.reserveCanopySelected(row, itemInfo);
                break;
            case ("container"):
                display = this.containerSelected(row, itemInfo);
                break;
            case ("aad"):
                display = this.aadSelected(row, itemInfo);
                break;
        }
        return display;
    }

    rigSelected(row, itemInfo) {
        var rigInfo = {
            container: row.container,
            aad: row.aad,
            isTandem: row.isTandem
        }
        return <InventoryDisplayRig
            itemInfo={itemInfo}
            rigInfo={rigInfo}
            updateRigRow={this.updateRigRow}
        />;
    }

    canopySelected(row, itemInfo) {
        var canopyInfo = {
            rig_id: row.rig_id,
            canopy_sn: row.canopy_sn,
            size: row.size,
            date_of_manufacture: row.date_of_manufacture,
            jump_count: row.jump_count
        }
        return <InventoryDisplayCanopy
            itemInfo={itemInfo}
            canopyInfo={canopyInfo}
            updateCanopyRow={this.updateCanopyRow}
        />;
    }

    reserveCanopySelected(row, itemInfo) {
        var canopyInfo = {
            rig_id: row.rig_id,
            canopy_sn: row.canopy_sn,
            size: row.size,
            date_of_manufacture: row.date_of_manufacture,
            jump_count: row.jump_count
        }
        return <InventoryDisplayCanopy
            itemInfo={itemInfo}
            canopyInfo={canopyInfo}
            updateCanopyRow={this.updateCanopyRow}
        />;
    }

    containerSelected(row, itemInfo) {
        var containerInfo = {
            container_sn: row.container_sn
        }
        return <InventoryDisplayContainer
            itemInfo={itemInfo}
            containerInfo={containerInfo}
            updateContainerRow={this.updateContainerRow}
        />;
    }

    aadSelected(row, itemInfo) {
        var AADInfo = {
            aad_sn: row.aad_sn,
            lifespan: row.lifespan
        }
        return <InventoryDisplayAAD
            itemInfo={itemInfo}
            AADInfo={AADInfo}
            updateAADRow={this.updateAADRow}
        />;
    }


    // calls on "ADD" btn click to change right side view to empty field values by default
    displayAddView() {
        console.log("hit displayAddView funct");
        // set up the display component
        var AADInfo = {
            aad_sn: '',
            lifespan: ''
        }
        var itemInfo = {
            item_id: null,
            item_type: 'aad',
            manufacturer: null,
            description: null,
            is_on_rig: null,
            brand: null,
            is_rentable: true,
            item_type_id: 16 //TODO update
        };
        var display = <InventoryDisplayAAD
            AADInfo={AADInfo}
            itemInfo={itemInfo}
            updateAADRow={this.addAAD}
        />;

        // this.displayChange(display, row.index);  

        this.setState({
            // index: selectedIndex,
            currentItem: display
        });
    }

    displayAddContainer() {
        console.log("hit displayAddContainer funct");
        // set up the display component
        var containerInfo = {
            container_sn: null
        }
        var itemInfo = {
            item_id: null,
            item_type: 'container',
            manufacturer: null,
            description: null,
            is_on_rig: null,
            brand: null,
            is_rentable: true,
            item_type_id: 4 //TODO update
        };
        var display = <InventoryDisplayContainer
            containerInfo={containerInfo}
            itemInfo={itemInfo}
            updateContainerRow={this.addContainer}
        />;

        // this.displayChange(display, row.index);  

        this.setState({
            // index: selectedIndex,
            currentItem: display
        });
    }

    displayAddCanopy() {
        var canopyInfo = {
            rig_id: null,
            canopy_sn: null,
            size: null,
            date_of_manufacture: null,
            jump_count: null
        }
        var itemInfo = {
            item_id: null,
            item_type: 'canopy',
            manufacturer: null,
            description: null,
            is_on_rig: null,
            brand: null,
            is_rentable: true,
            item_type_id: 1 //TODO update
        };
        var display = <InventoryDisplayCanopy
            itemInfo={itemInfo}
            canopyInfo={canopyInfo}
            updateCanopyRow={this.addCanopy}
        />;

        // this.displayChange(display, row.index);  

        this.setState({
            // index: selectedIndex,
            currentItem: display
        });
    }

    addAAD(itemInfo, AADInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/AADs/";

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.lifespan = AADInfo.lifespan;
        requestVariables.serial_number = AADInfo.aad_sn;

        fetch(url, {
            method: "POST",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Adding AAD failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var AAD = {};
            AAD.manufacturer = itemInfo.manufacturer;
            AAD.description = itemInfo.description;
            AAD.is_on_rig = itemInfo.is_on_rig;
            AAD.brand = itemInfo.brand;
            AAD.is_rentable = itemInfo.is_rentable;
            AAD.lifespan = AADInfo.lifespan;
            AAD.serial_number = AADInfo.aad_sn;
            AAD.item_type = 'aad';
            self.all.set(responseData.item_id, AAD);
            self.aads.set(responseData.item_id, AAD);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in AAD display
                self.setState({
                    rows: Array.from(self.aads.values())
                })
            }
        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    addContainer(itemInfo, containerInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/containers/";

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.serial_number = containerInfo.container_sn;
        requestVariables.pin = this.state.pin;

        fetch(url, {
            method: "POST",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing container failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var container = {};
            container.manufacturer = itemInfo.manufacturer;
            container.description = itemInfo.description;
            container.is_on_rig = itemInfo.is_on_rig;
            container.brand = itemInfo.brand;
            container.is_rentable = itemInfo.is_rentable;
            container.container_sn = containerInfo.container_sn;
            container.item_type = 'container'
            self.all.set(responseData.item_id, container);
            self.containers.set(responseData.item_id, container);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in Containers display
                self.setState({
                    rows: Array.from(self.containers.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    addCanopy(itemInfo, canopyInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/canopies/";

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.pin = this.state.pin;
        requestVariables.rig_id = canopyInfo.rig_num;
        requestVariables.serial_number = canopyInfo.canopy_sn;
        requestVariables.size = canopyInfo.size;
        requestVariables.jump_count = canopyInfo.jump_count;

        fetch(url, {
            method: "POST",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing canopy failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var canopy = {};
            canopy.manufacturer = itemInfo.manufacturer;
            canopy.description = itemInfo.description;
            canopy.is_on_rig = itemInfo.is_on_rig;
            canopy.brand = itemInfo.brand;
            canopy.is_rentable = itemInfo.is_rentable;
            canopy.serial_number = canopyInfo.canopy_sn;
            canopy.size = canopyInfo.size;
            canopy.jump_count = canopyInfo.jump_count;
            canopy.item_type = 'canopy';

            self.all.set(responseData.item_id, canopy);
            self.canopies.set(responseData.item_id, canopy);

            if (self.state.filter === "all") {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else {
                // must be in Canopies display
                self.setState({
                    rows: Array.from(self.canopies.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }


    render() {
        var filterDropdown = <FilterDropdown
            onChange={this.filterChanged}
            labelText="Inventory Item Filters:"
            id="InventoryFilterDropdown"
        />;

        var buttons = <div>
            <AddInventoryItemBtn buttonText={"Add AAD"} onClick={this.displayAddView} />
            <AddInventoryItemBtn buttonText={"Add Container"} onClick={this.displayAddContainer} />
            <AddInventoryItemBtn buttonText={"Add Canopy"} onClick={this.displayAddCanopy} />
        </div>
        return (
            <div>
                <Row>
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 5, offset: 1 }}>
                        <ItemTable
                            columns={this.state.columns}
                            rows={this.state.rows}
                            top={filterDropdown}
                            bottom={buttons}
                            itemSelected={this.itemSelected}
                        />
                    </Col>
                    <Col lg={{ size: 5 }}>
                        <Card>
                            {this.state.currentItem}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}