import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from '../Tables/ItemTable.jsx';
import EditInventoryItemDisplay from '../ItemDisplays/EditInventoryItemDisplay.jsx';
import AddInventoryItemBtn from '../Buttons/AddInventoryItemBtn.jsx';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import "react-table/react-table.css";

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
        this.URLsection = "/rentals";

        //this.toggleRented = this.toggleRented.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.displayChange = this.displayChange.bind(this);
        this.changeRowData = this.changeRowData.bind(this);


        this.all = [];
        this.rigs = [];
        this.canopies = [];
        this.containers = [];

        //Test Data to fill the table until we connect to the DB
        var rowData = [{ index: 0, number: "07700", desc: "Blue, Brown, and Black Mirage", isRented: false, renterName: "", type: "container" },
        { index: 1, number: "01", desc: "Blue and White Saber 170. Pink and Blue Javelin", isRented: true, renterName: "Frank", type: "rig" },
        { index: 2, number: "02", desc: "unknown description", isRented: false, renterName: "", type: "rig" },
        { index: 3, number: "03", desc: "unknown description", isRented: true, renterName: "Jack", type: "rig" },
        { index: 4, number: "04", desc: "Old Yellow and Gray Pilot240. Brown and Black Javelin", isRented: true, renterName: "Sam", type: "rig" },
        { index: 5, number: "05", desc: "Green, Orange, White Navigator 210 fater lines. Brown and Black Javelin", isRented: true, renterName: "Sue", type: "rig" },
        { index: 6, number: "06", desc: "Green, Orange, White Navigator 170. Brown and Black Javelin", isRented: false, renterName: "", type: "rig" },
        { index: 7, number: "07", desc: "Green, Orange, White Navigator 150. Brown and Black Javelin", isRented: false, renterName: "", type: "rig" },
        { index: 8, number: "08", desc: "Green, Yellow, Purple Navigator 190. Brown and Black Javelin", isRented: false, renterName: "", type: "rig" },
        { index: 9, number: "09", desc: "Black Main in Black Javelin", isRented: false, renterName: "", type: "rig" },
        { index: 10, number: "redJav", desc: "Red, White, Yellow Saber2 170. Red Javelin", isRented: true, renterName: "Ralph", type: "rig" },
        { index: 11, number: "11", desc: "Blue and Black Main. Blue and Black Mirage", isRented: false, renterName: "", type: "rig" },
        { index: 12, number: "01125", desc: "Red and Black Navigator", isRented: false, renterName: "", type: "canopy" },
        { index: 13, number: "07663", desc: "Blue and Black Mirage", isRented: false, renterName: "", type: "container" }
        
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
            currentItem:  <div> <h6> Please click item to view more details. </h6></div>
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

    getFilteredRows(rowData) {
        this.all = rowData;                                  //save everything first
        for (var i = 0; i < rowData.length; i++) {      //if the type is rig
            if (rowData[i].type === "rig") {
                this.rigs.push(rowData[i]);
            } else if (rowData[i].type === "canopy") {  //if the type is canopy
                this.canopies.push(rowData[i]);
            } else if (rowData[i].type === "container") { //if the type is container
                this.containers.push(rowData[i]);
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
    filterChanged(id, selection) {
        switch (selection) {
            case "Show All":
                this.setState({ filter: "all", rows: this.all });
                break;
            case "Rigs Only":
                this.setState({ filter: "rig", rows: this.rigs });
                break;
            case "Canopies Only":
                this.setState({ filter: "canopy", rows: this.canopies });
                break;
            case "Containers Only":
                this.setState({ filter: "container", rows: this.containers });
                break;
            default:
                this.setState({ filter: "all", rows: this.all });
                break;
        }
        //this.processRows(this.state.rows, this.state.filter);
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
            });
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
                <Row style={marginStyle}>
                    <Col lg={{ size: 5, offset: 1 }}>
                        <ItemTable
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