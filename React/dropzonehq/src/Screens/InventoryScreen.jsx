import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from '../Tables/ItemTable.jsx';
import EditInventoryItemDisplay from '../ItemDisplays/EditInventoryItemDisplay.jsx';
import BlankItemDisplay from '../ItemDisplays/BlankItemDisplay.jsx';
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
var display = <EditInventoryItemDisplay var1={"nothing to"} var2={"see here"} />;

export default class InventoryScreen extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/inventory";

        //this.toggleRented = this.toggleRented.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.displayChange = this.displayChange.bind(this);
        this.changeRowData = this.changeRowData.bind(this);


        this.all = [];
        this.rigs = [];
        this.canopies = [];
        this.containers = [];
        this.aad = [];

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
            accessor: 'desc',
            width: 250
        }];

        this.columnsContainers = [{
            Header: 'Container Brand',
            accessor: 'brand',
            width: 150
        }, {
            Header: 'Container Description',
            accessor: 'desc',
            width: 400
        }];

        this.columnsAAD = [{
            Header: 'Lifespan',
            accessor: 'life',
            width: 150
        }, {
            Header: 'Deployment Date',
            accessor: 'date',
            width: 150
        }];

        //Test Data to fill the table until we connect to the DB
        var rowData =
        [{ index: 0, number: "00", desc: "Red and Black Mirage", isRented: true, renterName: "Edgar", type: "container", brand: "Mirage" },
        { index: 1, number: "01", desc: "Blue and White Saber 170. Pink and Blue Javelin", isRented: true, renterName: "Frank", type: "rig", mainBrand: "Saber", mainSize: "170", containerBrand: "Javelin" },
        { index: 2, number: "02", desc: "Red and Green Pilot 220. Black and Yellow Mirage", isRented: false, renterName: "", type: "rig", mainBrand: "Pilot", mainSize: "220", containerBrand: "Mirage" },
        { index: 3, number: "03", desc: "Brown Navigator 190. Black and White Mirage", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "190", containerBrand: "Mirage" },
        { index: 4, number: "04", desc: "Old Yellow and Gray Pilot 240. Brown and Black Javelin", isRented: true, renterName: "Sam", type: "rig", mainBrand: "Pilot", mainSize: "240", containerBrand: "Javelin" },
        { index: 5, number: "05", desc: "Green, Orange, White Navigator 210 fater lines. Brown and Black Javelin", isRented: true, renterName: "Sue", type: "rig", mainBrand: "Navigator", mainSize: "210", containerBrand: "Javelin" },
        { index: 6, number: "06", desc: "Green, Orange, White Navigator 170. Brown and Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "170", containerBrand: "Javelin" },
        { index: 7, number: "07", desc: "Green, Orange, White Navigator 150. Brown and Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "150", containerBrand: "Javelin" },
        { index: 8, number: "08", desc: "Green, Yellow, Purple Navigator 190. Brown and Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "190", containerBrand: "Javelin" },
        { index: 9, number: "09", desc: "Black Main in Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
        { index: 10, number: "10", desc: "Red, White, Yellow Saber2 170. Red Javelin", isRented: true, renterName: "Ralph", type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
        { index: 11, number: "11", desc: "Blue and Black Main. Blue and Black Mirage", isRented: false, renterName: "", type: "rig", mainBrand: "Pilot", mainSize: "190", containerBrand: "Mirage" },
        { index: 12, number: "12", desc: "Red and Black Navigator", isRented: false, renterName: "", type: "canopy", brand: "Navigator", size: "210" },
        { index: 13, number: "13", desc: "Blue and Black Mirage", isRented: false, renterName: "", type: "container", brand: "Mirage" },
        { index: 14, number: "14", desc: "Orange and Black Mirage", isRented: false, renterName: "", type: "aad", life: "Mirage", date: "11/19/2017" }
        
        ];

        this.state = {
            filter: "all",
            columns: [{
                Header: 'Item Number',
                accessor: 'number' // String-based value accessors!
            }, {
                Header: 'Item Description',
                accessor: 'desc',
            }],
            rows: rowData,
            index: 0,
            currentItem:  <BlankItemDisplay headerText={"Inventory Item Details"}/>
        };

        this.getFilteredRows(this.state.rows);

    }

    changeRowData(index, itemNum, itemRenterName, itemDesc, itemType) 
    {
        console.log("in change, old values => index: " + index + " itemNum: " + this.state.rows[index].number + " itemRenterName: " 
                                                        + this.state.rows[index].renterName + " itemDesc: " + this.state.rows[index].desc 
                                                        + " itemType: " + this.state.rows[index].type);
        this.state.rows[index].number = itemNum;
        this.state.rows[index].renterName = itemRenterName;
        this.state.rows[index].desc = itemDesc;
        this.state.rows[index].type = itemType; 

        console.log("new values => index: " + index + " itemNum: " + this.state.rows[index].number + " itemRenterName: " 
                                        + this.state.rows[index].renterName + " itemDesc: " + this.state.rows[index].desc 
                                        + " itemType: " + this.state.rows[index].type);
    }

    getFilteredRows(rowData) 
    {
        // save everything first
        this.all = rowData;                                  
        for (var i = 0; i < rowData.length; i++) 
        {   
            if (rowData[i].type === "rig") 
            {
                //if the type is rig
                this.rigs.push(rowData[i]);
            } 
            else if (rowData[i].type === "canopy") 
            {  
                // if the type is canopy
                this.canopies.push(rowData[i]);
            } 
            else if (rowData[i].type === "container") 
            { 
                // if the type is container
                this.containers.push(rowData[i]);
            }
            else if (rowData[i].type === "aad")
            {
                // if the type is AAD
                this.aad.push(rowData[i]);    
            }
        }
    }


    //changes the display of the right side of the screen by
    //taking in a EditInventoryItemDisplay and setting it in the currentItem state
    displayChange(itemDisplay, index) {
        if (! (itemDisplay === "")) 
        {
            console.log("Inventory Screen-> displayChange> index: " + index);
            this.setState({
                currentItem: itemDisplay
            });
        } else {
            console.log("check what 'itemDisplay' is");
        }

    }

    //for the dropdown    
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
            case "AADs Only":
                this.setState({ filter: "aad", rows: this.aad, columns: this.columnsAAD });
                break;
            default:
                this.setState({ filter: "all", rows: this.all, columns: this.columnsAll });
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
        display = <EditInventoryItemDisplay            //set up the display component
            index={row.index}
            number={row.number}
            desc={row.desc}
            isRented={row.isRented}
            renterName={row.renterName}
            type={row.type} 
            changeRowData={this.changeRowData}/>;

        this.displayChange(display, row.index);         
        console.log("Selection count: " + count);
        count++;

        this.setState({
            index: selectedIndex,
            currentItem: display 
        });
    }


    render() {
        var filterDropdown = <FilterDropdown
            onChange={this.filterChanged}
            labelText="Inventory Item Filters:"
            id="InventoryFilterDropdown"
        />;

        var addItemBtn = <AddInventoryItemBtn buttonText={"ADD"} />;
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