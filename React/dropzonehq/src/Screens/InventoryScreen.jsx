import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from '../Tables/ItemTable.jsx';

import BlankItemDisplay from '../ItemDisplays/BlankItemDisplay.jsx';
import InventoryDisplayRig from '../ItemDisplays/InventoryDisplayRig.jsx';
import InventoryDisplayCanopy from '../ItemDisplays/InventoryDisplayCanopy.jsx';
import InventoryDisplayContainer from '../ItemDisplays/InventoryDisplayContainer.jsx';
import InventoryDisplayAAD from '../ItemDisplays/InventoryDisplayAAD.jsx';

import AddInventoryItemBtn from '../Buttons/AddInventoryItemBtn.jsx';
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

// values coming from Item_types table in db
const AAD_ITEM_TYPE_ID = 16;
const CANOPY_ITEM_TYPE_ID = 1;
const CONTAINER_ITEM_TYPE_ID = 4;
const RIG_ITEM_TYPE_ID = 3;
// const RESERVE_CANOPY_ITEM_TYPE_ID = 2;

/**
 * InventoryScreen displays all items and allows items to be edited,
 * added, or deleted.
 * @module InventoryScreen
 */
/** @const {Object} ITEM_TYPES - An object whose keys are the item type in all caps,
 * and whose values are the database entry for the item type */
const ITEM_TYPES = {
    CANOPY: "canopy",
    CONTAINER: "container",
    AAD: "aad",
    RIG: "rig",
    RESERVE: "reserve",
    RESERVE_CANOPY: "reserve_canopy"
}

/** @const {Object} ITEM_TYPE_ACCESSORS - An object whose keys are item type constants,
 * and whose values are the endpoint and map name accessors. 
 * Usage: this[ITEM_TYPE_ACCESSORS[ITEM_TYPES.CANOPY]] to access the this.canopies map,
 * or endpoint = ITEM_TYPE_ACCESSORS[ITEM_TYPES.CANOPY] to get the base canopies endpoint*/
const ITEM_TYPE_ACCESSORS = {
    [ITEM_TYPES.CANOPY]: "canopies",
    [ITEM_TYPES.CONTAINER]: "containers",
    [ITEM_TYPES.AAD]: "aads",
    [ITEM_TYPES.RIG]: "rigs",
    [ITEM_TYPES.RESERVE_CANOPY]: "reserves",
    [ITEM_TYPES.RESERVE]: "reserves"
}

/** * InventoryScreen displays all items and allows items to be edited,
 * added, or deleted.  */
export default class InventoryScreen extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "items/";

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryScreen);

        //initialize the maps of different item types
        this.initMaps();

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

    //When this InventoryScreen component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchRows();
    }

    /**
     * Fetch the rows of item data from the all items endpoint
     * and update the ItemTable's state to display them.
     */
    fetchRows() {
        var endpoint = this.URLsection;
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
    ////////////////CONTAINER REQUESTS/////////////////////
    ////////////////CONTAINER REQUESTS/////////////////////
    /**
     * Edit a container on the frontend and backend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} containerInfo - the fields&values from the Container needed for this request.
     */
    updateContainerRow(itemInfo, containerInfo) {
        //isPatch = true
        this.containerPatchPost(itemInfo, containerInfo, true);
    }


/*     updateAADRow(itemInfo, AADInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        console.log("item_id: " + itemInfo.item_id);

        console.log("-----aad lifespan: " + AADInfo.lifespan);
        console.log("-----aad sn: " + AADInfo.aad_sn);

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
                    rows: Array.from(self.aads.values())
                })
            }

            // FOR DEBUGGING:
            var size = self.all.size;
            var allIter = self.all.values();
            if (size > 0)
            {
                for (var i = 0; i < size; i++)
                {
                    console.log("all types map: " + i + " element: " + JSON.stringify(allIter.next().value));
                    // console.log("aads map: " + self.aads);
                }       
            }

        }).catch(function (error) {
            // toast.error(error + "\n" + url);
        });
    }  */
    /**
     * Add a new container to the backend and display it on the frontend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} containerInfo - the fields&values from the Container needed for this request.
     */
    addContainer(itemInfo, containerInfo) {
        //isPatch = false
        this.containerPatchPost(itemInfo, containerInfo, false);
    }

    /**
     * Make a post or patch request for a container
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} containerInfo - the fields&values from the Container needed for this request.
     * @param {boolean} isPatch - true if this is a patch, false if it is a post.
     */
    containerPatchPost(itemInfo, containerInfo, isPatch) {
        //item type is container
        this.itemPatchPost(ITEM_TYPES.CONTAINER, itemInfo, containerInfo, isPatch)
    }

    ////////////////CANOPY REQUESTS/////////////////////
    ////////////////CANOPY REQUESTS/////////////////////
    ////////////////CANOPY REQUESTS/////////////////////
    ////////////////CANOPY REQUESTS/////////////////////
    ////////////////CANOPY REQUESTS/////////////////////
    /**
     * Edit a canopy on the frontend and backend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} canopyInfo - the fields&values from the canopy needed for this request.
     */
    updateCanopyRow(itemInfo, canopyInfo) {
        //isPatch = true
        this.canopyPatchPost(itemInfo, canopyInfo, true);
    }

    /**
     * Add a new canopy to the backend and display it on the frontend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} canopyInfo - the fields&values from the canopy needed for this request.
     */
    addCanopy(itemInfo, canopyInfo) {
        //isPatch = false
        this.canopyPatchPost(itemInfo, canopyInfo, false);
    }

    /**
     * Make a post or patch request for a canopy
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} canopyInfo - the fields&values from the canopy needed for this request.
     * @param {boolean} isPatch - true if this is a patch, false if it is a post.
     */
    canopyPatchPost(itemInfo, canopyInfo, isPatch) {
        //item type is canopy
        this.itemPatchPost(ITEM_TYPES.CANOPY, itemInfo, canopyInfo, isPatch)
    }

    ////////////////AAD REQUESTS/////////////////////
    ////////////////AAD REQUESTS/////////////////////
    ////////////////AAD REQUESTS/////////////////////
    ////////////////AAD REQUESTS/////////////////////
    ////////////////AAD REQUESTS/////////////////////
    /**
     * Edit an AAD on the frontend and backend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} AADInfo - the fields&values from the AAD needed for this request.
     */
    updateAADRow(itemInfo, AADInfo) {
        //isPatch = true
        this.AADPatchPost(itemInfo, AADInfo, true);
    }

    /**
     * Add a new AAD to the backend and display it on the frontend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} AADInfo - the fields&values from the AAD needed for this request.
     */
    addAAD(itemInfo, AADInfo) {
        //isPatch = false
        this.AADPatchPost(itemInfo, AADInfo, false);
    }

    /**
     * Make a post or patch request for an AAD
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} AADInfo - the fields&values from the AAD needed for this request.
     * @param {boolean} isPatch - true if this is a patch, false if it is a post.
     */
    AADPatchPost(itemInfo, AADInfo, isPatch) {
        //item type is AAD
        this.itemPatchPost(ITEM_TYPES.AAD, itemInfo, AADInfo, isPatch)
    }


    ////////////////RIG REQUESTS/////////////////////
    ////////////////RIG REQUESTS/////////////////////
    ////////////////RIG REQUESTS/////////////////////
    ////////////////RIG REQUESTS/////////////////////
    ////////////////RIG REQUESTS/////////////////////
    /**
     * Edit a rig on the frontend and backend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} rigInfo - the fields&values from the rig needed for this request.
     */
    updateRigRow(itemInfo, rigInfo) {
        //isPatch = true
        this.rigPatchPost(itemInfo, rigInfo, true);
    }

    /**
     * Add a new rig to the backend and display it on the frontend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} rigInfo - the fields&values from the rig needed for this request.
     */
    addRig(itemInfo, rigInfo) {
        //isPatch = false
        this.rigPatchPost(itemInfo, rigInfo, false);
    }

    /**
     * Make a put or patch request for an rig
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} canopyInfo - the fields&values from the rig needed for this request.
     * @param {boolean} isPatch - true if this is a patch, false if it is a post.
     */
    rigPatchPost(itemInfo, rigInfo, isPatch) {
        //item type is RIG
        this.itemPatchPost(ITEM_TYPES.RIG, itemInfo, rigInfo, isPatch)
    }

    ////////////////RESERVE REQUESTS/////////////////////
    ////////////////RESERVE REQUESTS/////////////////////
    ////////////////RESERVE REQUESTS/////////////////////
    ////////////////RESERVE REQUESTS/////////////////////
    ////////////////RESERVE REQUESTS/////////////////////
    /**
     * Edit a reserve canopy on the frontend and backend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} reserveInfo - the fields&values from the reserve canopy needed for this request.
     */
    updateReserveCanopyRow(itemInfo, reserveInfo) {
        //isPatch = true
        this.reserveRequest(itemInfo, reserveInfo, true);
    }

    /**
     * Add a new reserve canopy to the backend and display it on the frontend.
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} reserveInfo - the fields&values from the reserve canopy needed for this request.
     */
    addReserveCanopy(itemInfo, reserveInfo) {
        //isPatch = false
        this.reserveRequest(itemInfo, reserveInfo, false);
    }

    /**
     * Make a put or patch request for an reserve canopy
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request
     * @param {Object} reserveInfo - the fields&values from canopy and reserve canopy needed for this request.
     * @param {boolean} isPatch - true if this is a patch, false if it is a post.
     */
    reserveCanopyPatchPost(itemInfo, reserveInfo, isPatch) {
        //item type is reserve
        this.itemPatchPost(ITEM_TYPES.RESERVE, itemInfo, reserveInfo, isPatch)
    }

    //////////GENERIC REQUEST METHODS///////////
    //////////GENERIC REQUEST METHODS///////////
    //////////GENERIC REQUEST METHODS///////////
    //////////GENERIC REQUEST METHODS///////////
    //////////GENERIC REQUEST METHODS///////////

    /**
     * Handle a patch or a post for an item
     * @param {string} itemType - the type of item that is being patched/posted
     * @param {Object} itemInfo - the fields&values from Item needed to perform this request.
     * @param {Object} specificInfo - the fields&values from the [itemType] subclass needed for this request.
     * @param {boolean} isPatch - true if this request is a patch, false if it is a post.
     */
    itemPatchPost(itemType, itemInfo, specificInfo, isPatch) {
        var combinedItemInfo = this.getCombinedItem(itemType, itemInfo, specificInfo);
        this.handleItemPatchPost(combinedItemInfo, itemType, isPatch);
    }

        // IS THIS HERE ALREADY?
        // var url = rootURL + "/containers/" + itemInfo.item_id;
    //
    /**
     * Take an item type and 2 objects (one for item fields, one for subclass fields). Combine
     * them and return a version whose attribute names work with requests (all items view has 
     * different names than are needed for endpoint inserts)
     * @param {string} itemType - the type of item subclass whose specific fields are in specificInfo
     * @param {Object} genericInfo - an object that has the info from the item table.
     * @param {Object} specificInfo - an object that has info from the specific item subclass.
     * @return - one combined object whose accessor names are compatible with the specific
     * variables needed for requests (i.e. canopy_sn becomes serial_number).
     */
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
    * @param {Object} combinedItemInfo - an object that has both (1) the fields of Item and 
        (2) the fields of the 'subclass' that matches this item's type (i.e. canopy, aad, etc.)
        This is used as the request variables object.
    * @param {string} itemType - the type of the item
    * @param {boolean} isPatch - true if this request is a patch, false if it is a post
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

    /**
     * Initialize the maps that hold different inventory item types.
     */
    initMaps() {
        this.all = new Map();
        this.rigs = new Map();
        this.canopies = new Map();
        this.containers = new Map();
        this.aads = new Map();
        this.reserves = new Map();
    }

    /**
     * 
     * @param {Object} rowData - A JSON response from the all items endpoint. Each row
     * contains info about all types of items, with nulls where not applicable. 
     */
    getFilteredRows(rowData) {
        this.initMaps();
        // loop through the JSON data
        for (var i = 0; i < rowData.length; i++) {
            //save everything to all first
            this.all.set(rowData[i].item_id, rowData[i]);
            //if the row has an item type
            if (rowData[i].item_type) {
                //use that item type to grab the corresponding field accessor
                var accessor = ITEM_TYPE_ACCESSORS[rowData[i].item_type];
                //use this accessor to access the corresponding map (i.e. this['rigs'].set(...))
                this[accessor].set(rowData[i].item_id, rowData[i]);
            }
        }
    }


    /**
     * Changes the display of the right side of the screen by
     * taking in an EditInventoryItemDisplay and setting it in the currentItem state.
     * @param {EditInventoryItemDisplay} itemDisplay - the EditInventoryItemDisplay to display
     * @param {int} selectedIndex - The index of the row that was just clicked
     */
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

    /**
     * Update the rows and columns in the table based on the table's filter dropdown.
     * @param {string} selection - The text of the filter that was selected. 
     */
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

    /**
     * Reset the right hand item display to a blank display.
     */
    resetDisplay() {
        this.setState({
            currentItem: <BlankItemDisplay headerText={"Inventory Item Details"} />
        });
    }

    /**
     * Changes the display on the right side of the screen when an item row is clicked.
     * @param {int} selectedIndex - the index of the row in the table that was selected 
     */
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

    /**
     * Finds the item type from the given row and calls the correct method
     * to display the detail display for that item type.
     * @param {Object} row - The row of the inventory table to show a display for.
     */
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
            default:
                console.error("Setup display did not recognize the item type " + row.item_type);
                break;
        }
        return display;
    }

    /**
     * Update the detail display on the inventory screen to show a rig display.
     * @param {Object} row - the row of the all items view to display info for 
     * @param {Object} itemInfo - an object containing the fields in the row that are in the Item table.
     */
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
    /**
    * Update the detail display on the inventory screen to show a canopy display.
    * @param {Object} row - the row of the all items view to display info for 
    * @param {Object} itemInfo - an object containing the fields in the row that are in the Item table.
    */
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
    /**
    * Update the detail display on the inventory screen to show a reserve canopy display.
    * @param {Object} row - the row of the all items view to display info for 
    * @param {Object} itemInfo - an object containing the fields in the row that are in the Item table.
    */
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

    /**
    * Update the detail display on the inventory screen to show a container display.
    * @param {Object} row - the row of the all items view to display info for 
    * @param {Object} itemInfo - an object containing the fields in the row that are in the Item table.
    */
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

    /**
     * Update the detail display on the inventory screen to show an AAD display.
     * @param {Object} row - the row of the all items view to display info for 
     * @param {Object} itemInfo - an object containing the fields in the row that are in the Item table.
     */
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

    setDefaultItemInfoDetails(itemType, itemTypeID)
    {
        var itemInfo = 
        {
            item_id: "",
            item_type: itemType,
            manufacturer: "",
            description: "",
            is_on_rig: false,
            brand: "",
            is_rentable: true,
            item_type_id: itemTypeID
        };

        return itemInfo;
    }

    // calls on "ADD" btn click to change right side view to empty field values by default
    displayAddAADView(itemType, itemTypeID) 
    {
        console.log("hit displayAddAADView funct");
        // set up the display component
        var AADInfo = 
        {
            aad_sn: "",
            lifespan: ""
        }

        var itemInfo = this.setDefaultItemInfoDetails(itemType, itemTypeID);

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

    displayAddContainer(itemType, itemTypeID) 
    {
        console.log("hit displayAddContainer funct");
        // set up the display component
        var containerInfo = 
        {
            container_sn: ""
        }

        var itemInfo = this.setDefaultItemInfoDetails(itemType, itemTypeID);

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

    displayAddCanopy(itemType, itemTypeID) 
    {
        var canopyInfo = 
        {
            rig_id: "",
            canopy_sn: "",
            size: "",
            date_of_manufacture: "",
            jump_count: ""
        }
        
        var itemInfo = this.setDefaultItemInfoDetails(itemType, itemTypeID);

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

/*     addAAD(itemInfo, AADInfo) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        // var url = rootURL + "/AADs/";

        console.log("in addAAD: itemInfo.item_type_id: " + itemInfo.item_type_id);

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

            // FOR DEBUGGING:
            var size = self.all.size;
            var allIter = self.all.values();
            if (size > 0)
            {
                for (var i = 0; i < size; i++)
                {
                    console.log("all types map: " + i + " element: " + allIter.next().value);
                    // console.log("aads map: " + self.aads);
                }       
            }

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
           // toast.error(error + "\n" + url);
        });
    } */

/*     addContainer(itemInfo, containerInfo) {
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
    } */

/*     addCanopy(itemInfo, canopyInfo) {
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
    } */

    addItemfilterChanged(selection)
    {
        console.log("in addItemfilterChanged " );
        switch (selection) 
        {
            case "Select Item type":
                this.resetDisplay();
                break;
            case "Add Rig":
                // TODO create displayAddRig(itemType, itemTypeID) function
                break;
            case "Add Canopy":
                this.displayAddCanopy('canopy', CANOPY_ITEM_TYPE_ID);
                break;
            case "Add Container":
                this.displayAddContainer('container', CONTAINER_ITEM_TYPE_ID);
                break;
            case "Add AAD":
                this.displayAddAADView('aad', AAD_ITEM_TYPE_ID);
                break;
            default:
                this.resetDisplay();
                break;
        }        
    }

    render() {
        var filterDropdown = <FilterDropdown
            onChange={this.filterChanged}
            labelText="Inventory Item Filters:"
            id="InventoryFilterDropdown"
        />;

        var buttons = <div>
{/*             <AddInventoryItemBtn buttonText={"Add AAD"} onClick={this.displayAddAADView} />
            <AddInventoryItemBtn buttonText={"Add Container"} onClick={this.displayAddContainer} />
            <AddInventoryItemBtn buttonText={"Add Canopy"} onClick={this.displayAddCanopy} />
            <AddInventoryItemBtn buttonText={"Add Item"} onClick={this.displayAddItem} /> */}

            <FilterDropdown onChange={this.addItemfilterChanged} labelText="Add Item:"
                            id="InventoryAddItemFilterDropdown" />
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