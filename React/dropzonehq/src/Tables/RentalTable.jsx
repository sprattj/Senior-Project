import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from './ItemTable.jsx';
import RentalDisplayRig from '../ItemDisplays/RentalDisplayRig.jsx';
import RentalDisplayCanopy from '../ItemDisplays/RentalDisplayCanopy.jsx';
import RentalDisplayContainer from '../ItemDisplays/RentalDisplayContainer.jsx';
import RentReturnButton from '../Buttons/RentReturnButton.jsx';
import RentButton from '../ModalButtons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';
import "react-table/react-table.css";

var count = 0;
var display = "";
export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentals";

        this.filterChanged = this.filterChanged.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.rentItem = this.rentItem.bind(this);
        this.returnItem = this.returnItem.bind(this);
        this.rigSelected = this.rigSelected.bind(this);
        this.canopySelected = this.canopySelected.bind(this);
        this.containerSelected = this.containerSelected.bind(this);
        this.pinChanged = this.pinChanged.bind(this);

        this.all = [];
        this.rigs = [];
        this.canopies = [];
        this.containers = [];

        this.columnsAll = [{
            Header: 'Item Number',
            accessor: 'number', // String-based value accessors!
            width: 150
        }, {
            Header: 'Item Description',
            accessor: 'desc',
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

        //Test Data to fill the table until we connect to the DB
        var rowData =
            [{ rowID: 1, number: "01", desc: "Blue and White Saber 170. Pink and Blue Javelin", isRented: true, renterName: "Frank", type: "rig", mainBrand: "Saber", mainSize: "170", containerBrand: "Javelin" },
            { rowID: 2, number: "02", desc: "Red and Green Pilot 220. Black and Yellow Mirage", isRented: false, renterName: "", type: "rig", mainBrand: "Pilot", mainSize: "220", containerBrand: "Mirage" },
            { rowID: 3, number: "03", desc: "Brown Navigator 190. Black and White Mirage", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "190", containerBrand: "Mirage" },
            { rowID: 4, number: "04", desc: "Old Yellow and Gray Pilot 240. Brown and Black Javelin", isRented: true, renterName: "Sam", type: "rig", mainBrand: "Pilot", mainSize: "240", containerBrand: "Javelin" },
            { rowID: 5, number: "05", desc: "Green, Orange, White Navigator 210 fater lines. Brown and Black Javelin", isRented: true, renterName: "Sue", type: "rig", mainBrand: "Navigator", mainSize: "210", containerBrand: "Javelin" },
            { rowID: 6, number: "06", desc: "Green, Orange, White Navigator 170. Brown and Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "170", containerBrand: "Javelin" },
            { rowID: 7, number: "07", desc: "Green, Orange, White Navigator 150. Brown and Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "150", containerBrand: "Javelin" },
            { rowID: 8, number: "08", desc: "Green, Yellow, Purple Navigator 190. Brown and Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Navigator", mainSize: "190", containerBrand: "Javelin" },
            { rowID: 9, number: "09", desc: "Black Main in Black Javelin", isRented: false, renterName: "", type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
            { rowID: 10, number: "redJav", desc: "Red, White, Yellow Saber2 170. Red Javelin", isRented: true, renterName: "Ralph", type: "rig", mainBrand: "Saber2", mainSize: "170", containerBrand: "Javelin" },
            { rowID: 11, number: "11", desc: "Blue and Black Main. Blue and Black Mirage", isRented: false, renterName: "", type: "rig", mainBrand: "Pilot", mainSize: "190", containerBrand: "Mirage" },
            { rowID: 12, number: "01125", desc: "Red and Black Navigator", isRented: false, renterName: "", type: "canopy", brand: "Navigator", size: "210" },
            { rowID: 13, number: "07663", desc: "Blue and Black Mirage", isRented: false, renterName: "", type: "container", brand: "Mirage" },
            { rowID: 14, number: "07678", desc: "Red and Black Mirage", isRented: true, renterName: "Edgar", type: "container", brand: "Mirage" }
            ];

        this.state = {
            filter: "all",
            columns: this.columnsAll,
            rows: rowData,
            rowID: 0,
            pin: ''
        };
        this.getFilteredRows(this.state.rows);
    }

    //Takes the whole set of data given from db call and split it into the types so the split doesnt
    //need to take place more than once after each db call not when filter is selected
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

    //When a selection is made on FilterDropdown this function should be called to change the values on the RentalTable 
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

    //calls up to the screen change the display on the right
    itemSelected(selectedIndex) {
        var row = this.state.rows[selectedIndex];   //use the selectedIndex to find the row in the rows state
        var rentalButton;                           //variable Rent or Return button shows if Available or Rented 

        /*
        if (row.isRented) {     //if the item is rented set the rentalButton var to Return
            rentalButton = <RentButton buttonText={"Return"} return={this.returnItem} rowID={selectedIndex + 1} />;
        } else {                //if the item isnt rented set the rentalButton var to Rent
            rentalButton = <RentButton buttonText={"Rent"} rent={this.rentItem} rowID={selectedIndex + 1} />;
        }*/

        {
            row.isRented ? (
                rentalButton = <RentReturnButton buttonText={"Return"} return={this.returnItem} rowID={selectedIndex + 1} />
            ) : (
                rentalButton = <RentButton buttonText={"Rent"} rent={this.rentItem} rowID={selectedIndex + 1} pinChanged={this.pinChanged} />
            )
        }

        //select the type of Rental Item Display will be shown based on the selected item's .type
        switch (row.type) {
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
        this.props.displayChange(display, row.rowID);          //pass it up thru props method call
    }

    //Rigs should display mainBrand, mainSize, reserveBrand, reserveSize, containerBrand, aadExpirationDate, description
    rigSelected(row, rentalButton) {
        display = <RentalDisplayRig
            number={row.number}
            isRented={row.isRented}
            desc={row.desc}

            renterName={row.renterName}
            mainBrand={row.mainBrand}
            mainSize={row.mainSize}
            reserveBrand={row.reserveBrand}
            reserveSize={row.reserveSize}
            containerBrand={row.containerBrand}
            aadExp={row.aadExpirationDate}

            button={rentalButton}
        />;
    }

    canopySelected(row, rentalButton) {
        display = <RentalDisplayCanopy
            number={row.number}
            isRented={row.isRented}
            desc={row.desc}

            renterName={row.renterName}
            brand={row.brand}
            size={row.size}

            button={rentalButton}
        />;
    }

    containerSelected(row, rentalButton) {
        display = <RentalDisplayContainer
            number={row.number}
            isRented={row.isRented}
            desc={row.desc}

            renterName={row.renterName}
            brand={row.brand}

            button={rentalButton}
        />;
    }

    rentItem(rowID) {
        /*
        console.log("RentalTable: rentItem Function");
        require('isomorphic-fetch');
        require('es6-promise').polyfill();
    
        var url = rootURL + this.URLsection + "/" + id;
    
        var self = this;
        var requestVariables = {
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
          })//when we get a response back
            .then(function (response) {
              if (response.status >= 400) {
                throw new Error("Rent Item Failed. Bad response " + response.status + " from server");
              }
              return response.json();
            })//when the call succeeds
            .then(function (responseData) {
              //grab the current rows
              var newRows = this.all;
              
              //--
              newRows[rowID].isRented = true;
              newRows[rowID].RenterName = "TEST NAME";
              this.getFilteredRows(newRows);
      
              //update the state with the new rows so it rerenders
              self.setState({
                rows: newRows,
                pin: ''
              });
      
            })//catch any errors and display them as a toast
            .catch(function (error) {
              toast.error(error + "\n" + url);
            });*/
    }

    returnItem(rowID) {
        console.log("RentalTable: returnItem Function");

    }

    pinChanged(id, pin) {
        this.setState({
          pin: pin
        })
        console.log(this.state.pin);
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

    processRows(rowData) {
        this.setState({
            rows: rowData
        })
    }

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

}