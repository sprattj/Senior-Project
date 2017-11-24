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
import { rootURL } from '../restInfo.js';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import "react-table/react-table.css";
import { toast } from 'react-toastify';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

var count = 0;
var display; //= <EditInventoryItemDisplay var1={"nothing to"} var2={"see here"} />;

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
        this.setupDisplay = this.setupDisplay.bind(this);
        this.displayChange = this.displayChange.bind(this);
        this.changeRowData = this.changeRowData.bind(this);
        this.displayAddView = this.displayAddView.bind(this);
        this.resetDisplay = this.resetDisplay.bind(this);

/*         this.all = [];
        this.rigs = [];
        this.canopies = [];
        this.containers = [];
        this.aad = []; */
        this.all = new Map();
        this.rigs = new Map();
        this.canopies = new Map();
        this.containers = new Map();
        this.aad = new Map();

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
            accessor: 'date',
            width: 150
        }];

        //Test Data to fill the table until we connect to the DB
        var rowData =
        [{ index: 0, item_id: 0, manufacturer: "00", description: "Red and Black Mirage", is_rentable: true, isRented: true, item_type: "container", brand: "Mirage" },
        { index: 1, item_id: 1, manufacturer: "01", description: "Blue and White Saber 170. Pink and Blue Javelin", is_rentable: true, isRented: true, brand: "Frank", item_type: "rig", mainBrand: "Saber", mainSize: "170", containerBrand: "Javelin" },
        { index: 2, item_id: 2, manufacturer: "02", description: "Red and Green Pilot 220. Black and Yellow Mirage", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Pilot", mainSize: "220", containerBrand: "Mirage" },
        { index: 3, item_id: 3, manufacturer: "03", description: "Brown Navigator 190. Black and White Mirage", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Navigator", mainSize: "190", containerBrand: "Mirage" },
        { index: 4, item_id: 4, manufacturer: "04", description: "Old Yellow and Gray Pilot 240. Brown and Black Javelin", is_rentable: true, isRented: true, brand: "Sam", item_type: "rig", mainBrand: "Pilot", mainSize: "240", containerBrand: "Javelin" },
        { index: 5, item_id: 5, manufacturer: "05", description: "Green, Orange, White Navigator 210 fater lines. Brown and Black Javelin", is_rentable: true, isRented: true, brand: "Sue", item_type: "rig", mainBrand: "Navigator", mainSize: "210", containerBrand: "Javelin" },
        { index: 6, item_id: 6, manufacturer: "06", description: "Green, Orange, White Navigator 170. Brown and Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Navigator", mainSize: "170", containerBrand: "Javelin" },
        { index: 7, item_id: 7, manufacturer: "07", description: "Green, Orange, White Navigator 150. Brown and Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Navigator", mainSize: "150", containerBrand: "Javelin" },
        { index: 8, item_id: 8, manufacturer: "08", description: "Green, Yellow, Purple Navigator 190. Brown and Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Navigator", mainSize: "190", containerBrand: "Javelin" },
        { index: 9, item_id: 9, manufacturer: "09", description: "Black Main in Black Javelin", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
        { index: 10, item_id: 10, manufacturer: "10", description: "Red, White, Yellow Saber2 170. Red Javelin", is_rentable: true, isRented: true, brand: "Ralph", item_type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
        { index: 11, item_id: 11, manufacturer: "11", description: "Blue and Black Main. Blue and Black Mirage", is_rentable: true, isRented: false, brand: "", item_type: "rig", mainBrand: "Pilot", mainSize: "190", containerBrand: "Mirage" },
        { index: 12, item_id: 12, manufacturer: "12", description: "Red and Black Navigator", is_rentable: true, isRented: false, item_type: "canopy", brand: "Navigator", size: "210" },
        { index: 13, item_id: 13, manufacturer: "13", description: "Blue and Black Mirage", is_rentable: true, isRented: false, item_type: "container", brand: "Mirage" },
        { index: 14, item_id: 14, manufacturer: "14", description: "Orange and Black Mirage", is_rentable: true, isRented: false, item_type: "aad", brand: "theBrand", lifespan: "Mirage", date: "11/19/2017" }
        
        ];

        this.state = {
            filter: "all",
            columns: this.columnsAll,
            rows: Array.from(this.all.values()), // rows: mapName.values() instead of rows: rowData
            index: 0,
            currentItem:  <BlankItemDisplay headerText={"Inventory Item Details"}/>
        };

        this.getFilteredRows(this.state.rows);

    }

    changeRowData(index, manufacturer, description, isOnRig, brand,
                    isRentable, lifespan, itemType, aadSerialNum ) 
    {

        console.log("index: " + index + " manufacturer: " + manufacturer);
        /* console.log("in change, old values => index: " + index + " \n itemNum: " + this.state.rows[index].manufacturer + " \n brand: " 
                                                        + this.state.rows[index].brand + " \n itemdescription: " + this.state.rows[index].description 
                                                        + " \n itemType: " + this.state.rows[index].item_type); */

        // grab the current rows
        var newRows = Array.from(this.all.values());
        console.log("newRows: " + newRows);

        // update the copy's row's fields
        newRows[index].manufacturer = manufacturer;
        newRows[index].brand = brand;
        newRows[index].description = description;
        newRows[index].item_type = itemType;

        // update the state with the new rows so it rerenders
        this.setState({
            rows: newRows
        })             

/*         this.state.rows[index].manufacturer = itemNum;
        this.state.rows[index].brand = brand;
        this.state.rows[index].description = itemDesc;
        this.state.rows[index].item_type = itemType;  

        this.forceUpdate();

         this.setState({
             rows,
             rows[index].manufacturer: itemNum,
            rows[index].brand: brand,
            rows[index].description: itemDesc,
            rows[index].item_type: itemType  
        });  
        */

        console.log("new values => index: " + index + " \n itemNum: " + this.state.rows[index].manufacturer + " \n brand: " 
                                        + this.state.rows[index].brand + " \n itemdescription: " + this.state.rows[index].description 
                                        + " \n itemType: " + this.state.rows[index].item_type);
    }

    getFilteredRows(rowData) 
    {
        // save everything first
        // this.all = rowData;    -- USING MAP instead
        
        
        for (var i = 0; i < rowData.length; i++) 
        {   
            // map row to item_id in that row
            this.all.set(rowData[i].item_id, rowData[i]);
            if (rowData[i].item_type === "rig") 
            {
                //if the type is rig
                this.rigs.set(rowData[i].item_id, rowData[i]);
            } 
            else if (rowData[i].item_type === "canopy") 
            {  
                // if the type is canopy
                this.canopies.set(rowData[i].item_id, rowData[i]);
            } 
            else if (rowData[i].item_type === "container") 
            { 
                // if the type is container
                this.containers.set(rowData[i].item_id, rowData[i]);
            }
            else if (rowData[i].item_type === "aad")
            {
                // if the type is AAD
                this.aad.set(rowData[i].item_id, rowData[i]);    
            }
        }
    }


    //changes the display of the right side of the screen by
    //taking in a EditInventoryItemDisplay and setting it in the currentItem state
    displayChange(itemDisplay, selectedIndex) {
        if (! (itemDisplay === "")) 
        {
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
                this.setState({ filter: "aad", rows: Array.from(this.aad.values()), columns: this.columnsAAD });
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
            currentItem: <BlankItemDisplay headerText={"Inventory Item Details"}/>
        });
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

        //Define our endpoint using the rootURL, the URL section 
        //that we set in our constructor (like "/rigsheets"), and
        //the sheetType prop ("Tandems" or "Students")
        //(rootURL is imported from our rest info file)
        var url = rootURL + this.URLsection + this.props.sheetType;

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
                //process the row data we received back
                self.processRows(rowData);
                //update our state with these rows to rerender the table
                self.setState({
                    rows: rowData
                });
            })//catch any errors and display them as a toast
            .catch(function (error) {
              toast.error(error + "\n" + url);
            });;
    }

    //calls up to the screen change the display on the right
    itemSelected(selectedIndex) {

        console.log("selectedIndex: " + selectedIndex);

        var row = this.state.rows[selectedIndex];   //use the selectedIndex to find the row in the rows state

        var display = this.setupDisplay(row);
/*         var display = <EditInventoryItemDisplay            //set up the display component
            index={row.index}
            manufacturer={row.manufacturer}
            description={row.description}
            isRented={row.isRented}
            brand={row.brand}
            type={row.item_type} 
            changeRowData={this.changeRowData}/>; */

        this.displayChange(display, row.index);         

        console.log("Selection count: " + count);
        count++;

        console.log("selected values => index: " + selectedIndex + " \n itemNum: " + this.state.rows[selectedIndex].manufacturer + " \n brand: " 
                                            + this.state.rows[selectedIndex].brand + " \n itemdescription: " + this.state.rows[selectedIndex].description 
                                            + " \n itemType: " + this.state.rows[selectedIndex].item_type);
    }

    // set up the display component, based on Item Type
    setupDisplay(row)
    {
        var display;
        
        if (row.item_type === "rig") 
        {
            display = <InventoryDisplayRig            
            index={row.index}
            manufacturer={row.manufacturer}
            description={row.description}
            isRented={row.isRented}
            brand={row.brand}
            item_type={row.item_type} 
            changeRowData={this.changeRowData}/>;
        } 
        else if (row.item_type === "canopy") 
        {  
            display = <InventoryDisplayCanopy            
            index={row.index}
            manufacturer={row.manufacturer}
            description={row.description}
            isRented={row.isRented}
            brand={row.brand}
            item_type={row.item_type} 
            changeRowData={this.changeRowData}/>;
        } 
        else if (row.item_type === "container") 
        { 
            display = <InventoryDisplayContainer            
            index={row.index}
            manufacturer={row.manufacturer}
            description={row.description}
            isRented={row.isRented}
            brand={row.brand}
            item_type={row.item_type} 
            changeRowData={this.changeRowData}/>;
        }
        else if (row.item_type === "aad")
        {
            display = <InventoryDisplayAAD            
            index={row.index}
            item_id={row.item_id}
            manufacturer={row.manufacturer}
            description={row.description}
            isRented={row.isRented}
            brand={row.brand}
            item_type={row.item_type}
            lifespan={row.lifespan} 
            changeRowData={this.changeRowData}
            />;    
        }
        else
        {
            console.log("check Item Type passed bruh, Item Type is: " + row.item_type)
        }

        return display;
    }

    // calls on "ADD" btn click to change right side view to empty field values by default
    displayAddView()
    {        
        console.log("hit displayAddView funct");
        // set up the display component
        var display = <InventoryDisplayAAD            
            index={""}
            manufacturer={""}
            desc={""}
            isRented={""}
            brand={""}
            type={""} 
            changeRowData={""}/>;

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

        var addItemBtn = <AddInventoryItemBtn buttonText={"ADD"} onClick={this.displayAddView} />;
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
                            bottom={addItemBtn}
                            itemSelected={this.itemSelected}
                        />
                    </Col>
                    <Col lg={{ size: 5 }}>
                        <Card body>
                            {this.state.currentItem}
                        </Card>
                    </Col>

                </Row>
            </div>
        );
    }

}