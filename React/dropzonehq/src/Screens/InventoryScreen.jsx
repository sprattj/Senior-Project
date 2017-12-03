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
import { Row, Col, Card } from 'reactstrap';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import "react-table/react-table.css";

import RequestHandler from '../RequestHandler.js';
import Binder from '../Binder.js';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

var count = 0;

const ITEM_TYPES = {
    CANOPY: "canopy",
    CONTAINER: "container",
    AAD: "aad",
    RIG: "rig",
    RESERVE: "reserve",
    RESERVE_CANOPY: "reserve_canopy"
}

const ITEM_TYPE_ACCESSORS = {
    [ITEM_TYPES.CANOPY]: "canopies",
    [ITEM_TYPES.CONTAINER]: "containers",
    [ITEM_TYPES.AAD]: "aads",
    [ITEM_TYPES.RIG]: "rigs",
    [ITEM_TYPES.RESERVE_CANOPY]: "reserves",
    [ITEM_TYPES.RESERVE]: "reserves"
}



export default class InventoryScreen extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "items/";

        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryScreen);

        //initialize the maps of different item types
        this.initMaps();
        
        this.columnsAll = [{
            Header: 'Item manufacturer',
            accessor: 'manufacturer', // String-based value accessors!
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
        var endpoint = this.URLsection
        var self = this;
        var successMsg = "Fetched inventory data.";
        var errorMsg = "Problem fetching inventory data.";
        var callback = function (rowData) {
            self.getFilteredRows(rowData);
            self.setState({
                filter: "all",
                columns: self.columnsAll,
                rows: Array.from(self.all.values()), // rows: mapName.values() instead of rows: rowData
                index: 0,
                currentItem: <BlankItemDisplay headerText={"Inventory Item Details"} />
            });
        };
        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    ////////////////CONTAINER REQUESTS/////////////////////
    ////////////////CONTAINER REQUESTS/////////////////////
    ////////////////CONTAINER REQUESTS/////////////////////
    updateContainerRow(itemInfo, containerInfo) {
        //isPatch = true
        this.containerRequest(itemInfo, containerInfo, true);
    }

    addContainer(itemInfo, containerInfo) {
        //isPatch = false
        this.containerRequest(itemInfo, containerInfo, false);
    }

    containerRequest(itemInfo, containerInfo, isPatch) {
        //item type is container
        this.itemPatchPost(ITEM_TYPES.CONTAINER, itemInfo, containerInfo, isPatch)
    }

    ////////////////CANOPY REQUESTS/////////////////////
    ////////////////CANOPY REQUESTS/////////////////////
    ////////////////CANOPY REQUESTS/////////////////////
    updateCanopyRow(itemInfo, canopyInfo) {
        //isPatch = true
        this.canopyRequest(itemInfo, canopyInfo, true);
    }

    addCanopy(itemInfo, canopyInfo) {
        //isPatch = false
        this.canopyRequest(itemInfo, canopyInfo, false);
    }

    canopyRequest(itemInfo, canopyInfo, isPatch) {
        //item type is canopy
        this.itemPatchPost(ITEM_TYPES.CANOPY, itemInfo, canopyInfo, isPatch)
    }

    ////////////////AAD REQUESTS/////////////////////
    ////////////////AAD REQUESTS/////////////////////
    ////////////////AAD REQUESTS/////////////////////
    updateAADRow(itemInfo, AADInfo) {
        //isPatch = true
        this.AADRequest(itemInfo, AADInfo, true);
    }

    addAAD(itemInfo, AADInfo) {
        //isPatch = false
        this.AADRequest(itemInfo, AADInfo, false);
    }

    AADRequest(itemInfo, AADInfo, isPatch) {
        //item type is AAD
        this.itemPatchPost(ITEM_TYPES.AAD, itemInfo, AADInfo, isPatch)
    }


    ////////////////RIG REQUESTS/////////////////////
    ////////////////RIG REQUESTS/////////////////////
    ////////////////RIG REQUESTS/////////////////////
    updateRigRow(itemInfo, rigInfo) {
        //isPatch = true
        this.rigRequest(itemInfo, rigInfo, true);
    }

    addRig(itemInfo, rigInfo) {
        //isPatch = false
        this.rigRequest(itemInfo, rigInfo, false);
    }

    rigRequest(itemInfo, rigInfo, isPatch) {
        //item type is RIG
        this.itemPatchPost(ITEM_TYPES.RIG, itemInfo, rigInfo, isPatch)
    }


    ////////////////RESERVE REQUESTS/////////////////////
    ////////////////RESERVE REQUESTS/////////////////////
    ////////////////RESERVE REQUESTS/////////////////////
    updateReserveCanopyRow(itemInfo, reserveInfo) {
        //isPatch = true
        this.reserveRequest(itemInfo, reserveInfo, true);
    }

    addReserveCanopy(itemInfo, reserveInfo) {
        //isPatch = false
        this.reserveRequest(itemInfo, reserveInfo, false);
    }

    reserveCanopyRequest(itemInfo, reserveInfo, isPatch) {
        //item type is reserve
        this.itemPatchPost(ITEM_TYPES.RESERVE, itemInfo, reserveInfo, isPatch)
    }


    //////////GENERIC REQUEST METHODS///////////
    //////////GENERIC REQUEST METHODS///////////
    //////////GENERIC REQUEST METHODS///////////
    itemPatchPost(itemType, itemInfo, specificInfo, isPatch) {
        var combinedItemInfo = this.getCombinedItem(itemType, itemInfo, specificInfo);
        this.handleItemPatchPost(combinedItemInfo, itemType, isPatch);
    }

    //take an item type and an object that has the info from 
    //the item and an object that has info from the item subclass tables. 
    //Return one combined object whose names are compatible with the specific
    //variables needed for requests (i.e. canopy_sn becomes serial_number).
    getCombinedItem(itemType, genericInfo, specificInfo) {
        //start with the info from Item
        var combined = genericInfo;
        //merge all of the attributes from the subclass in
        Object.assign(combined, specificInfo);
        //add item type
        combined.item_type = itemType;
        //add any fields with their other name
        switch (itemType) {
            case ITEM_TYPES.AAD:
                //combined.lifespan = specificInfo.lifespan;
                combined.serial_number = specificInfo.aad_sn;
                break;
            case ITEM_TYPES.CANOPY || ITEM_TYPES.RESERVE_CANOPY:
                combined.serial_number = specificInfo.canopy_sn;
                //combined.size = specificInfo.size;
                //combined.jump_count = specificInfo.jump_count;
                break;
            case ITEM_TYPES.RESERVE_CANOPY:
                combined.rig_id = specificInfo.rig_id;
                combined.date_of_manufacture = specificInfo.date_of_manufacture;
                combined.last_repack_date = specificInfo.last_repack_date;
                combined.next_repack_date = specificInfo.next_repack_date;
                combined.packed_by_employee_id = specificInfo.packed_by_employee_id;
                //combined.ride_count = specificInfo.ride_count;
                break;
            case ITEM_TYPES.CONTAINER:
                combined.serial_number = specificInfo.container_sn;
                break;
            case ITEM_TYPES.RIG:
                combined.aad_id = specificInfo.aad;
                combined.container_id = specificInfo.container;
                //combined.isTandem = specificInfo.isTandem;
                break;
            default:
                break;
        }
        return combined;
    }

    /** 
     * Make a patch or a post to update or add an item. Item and variables passed/determined
     * from the single combined item object, the itemtype.
    * @param Object combinedItemInfo - an object that has both (1) the fields of Item and 
        (2) the fields of the 'subclass' that matches this item's type (i.e. canopy, aad, etc.)
        This is used as the request variables object.
    * @param String itemType - the type of the item
    * @param boolean isPatch - true if this request is a patch, false if it is a post
    */
    handleItemPatchPost(combinedItemInfo, itemType, isPatch) {
        var itemTypeAccessor = ITEM_TYPE_ACCESSORS[itemType];
        var endpoint = itemTypeAccessor + "/";
        var successMsg = itemType + " added successfully.";
        var errorMsg = "Problem adding " + itemType + ".";

        if (isPatch) {
            var item_id = combinedItemInfo.item_id;
            endpoint = endpoint + item_id;
            successMsg = "Successfully edited " + itemType + " info.";
            errorMsg = "Editing " + itemType + "  " + item_id + " failed.";
        }
        var self = this;
        var variables = combinedItemInfo;
        variables.pin = this.state.pin;
        var callback = function (responseData) {
            var item_id = responseData.item_id;
            //take any of the fields that have 2 possible names depending on context
            //and add the ones that are missing
            var rowItem = combinedItemInfo;//self.getCombinedItem(itemType, combinedItemInfo, combinedItemInfo);
            rowItem.item_id = item_id;
            self.all.set(item_id, rowItem);
            self[itemTypeAccessor].set(item_id, rowItem);

            var newRows = (self.state.filter === "all" ? self.all.values() : self[itemTypeAccessor].values());
            self.setState({
                rows: Array.from(newRows)
            });
        };

        var method = (isPatch ? "PATCH" : "POST");
        var handler = new RequestHandler();
        handler.makeRequest(endpoint, method, variables, successMsg, errorMsg, callback);
    }

    initMaps(){
        this.all = new Map();
        this.rigs = new Map();
        this.canopies = new Map(); 
        this.containers = new Map();
        this.aads = new Map();
        this.reserves = new Map();
    }

    getFilteredRows(rowData) {
        this.initMaps();
        // save everything first
        for (var i = 0; i < rowData.length; i++) {
            this.all.set(rowData[i].item_id, rowData[i]);
            var accessor = ITEM_TYPE_ACCESSORS[rowData[i].item_type];
            this[accessor].set(rowData[i].item_id, rowData[i]);
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

        this.displayChange(display, row.index);

        console.log("Selection count: " + count);
        count++;

        console.log("selected values => index: " + selectedIndex + " \n itemNum: " + this.state.rows[selectedIndex].manufacturer + " \n brand: "
            + this.state.rows[selectedIndex].brand + " \n itemdescription: " + this.state.rows[selectedIndex].description
            + " \n itemType: " + this.state.rows[selectedIndex].item_type);
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