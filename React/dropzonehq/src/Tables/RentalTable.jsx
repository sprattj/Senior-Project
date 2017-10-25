import React from 'react';
import TableSheet from './TableSheet.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import RentalFilterDropdown from '../Dropdowns/RentalFilterDropdown.jsx';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import ReactTable from 'react-table';
import { rootURL } from '../restInfo.js';
import "react-table/react-table.css";

export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentals";

        //this.toggleRented = this.toggleRented.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        
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
            rowID: 0
        };

        var rowData = [{ number: "04", desc: "Old Yellow in Gray and Brown Jav", isRented: true, type: "rig", rowID: 1 },
        { number: "09", desc: "Black main in Black Jav", type: "rig", isRented: false, rowID: 2 },
        { number: "01", desc: "Orange and Green man, Pink and Blue Jav", type: "rig", isRented: true, rowID: 3 },
        { number: "01125", desc: "Red and Black Navigator", type: "canopy", isRented: false, rowID: 4 },
        { number: "07663", desc: "Blue and Black Mirage", type: "container", isRented: false, rowID: 5 } ];
        this.processRows(rowData, this.state.filter);
    }

    //Process the rows that are passed in to fill in the Table
    processRows(rowData, filter) {
        for (var i = 0; i < rowData.length; i++) {
            if (filter == "all" || filter == rowData[i].type) {
                number: { rowData[i].number };
                desc: { rowData[i].desc };
                index: { i };
            }            

            if (rowData[i].isRented) {
                //change the way its viewed
            }
        };
    }

    //for the dropdown    
    changeFilter(newFilter) {
        this.setState({
           filter: newFilter 
        });
    }

    //When this rigsheet component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchRows();
    }

    //Fetch the tandem signouts from the database and 
    //update this rigsheet's state to display them.
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

    render() {
        return (
            <div>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TableSheet headerText={<RentalFilterDropdown onChange={this.changeFilter} />}
                            columns={this.state.columns} >
                            {this.state.rows}
                        </TableSheet>
                    </Col>
                    <Card body>
                        <CardHeader>Current Item Details</CardHeader>
                        <CardBlock>
                            This is where a full item description would go
                        </CardBlock>
                        <RentButton buttonText="Rent" disabled={true} />
                    </Card>
                </Row>
            </div>
        );
    }






}

