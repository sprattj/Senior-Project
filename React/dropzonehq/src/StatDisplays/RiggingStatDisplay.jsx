import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class RiggingStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/statdisplay/rigging";

        //Test data
        this.state = {
            reservesPackedTotal: 0,
            reservesPackedToday: 0,
            reservesPackedWeek:0,
            reservesPackedMonth: 0,
            reservesPackedYear: 0,
            reserveSaves: 0,
        }
        //---------
    }

    //on loading it will try to fetch the stats but 
    //if it fails it will show test data
    componentDidMount() {
        //this.fetchStats();        
    }

    fetchStats() {
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

    //i think this would go somewhere after the call succeeds
    setValues() {

    } 

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Rigging Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>Reserves Packed Today: {this.state.reservesPackedToday}</p>
                                        <p>Reserves Packed This Week: {this.state.reservesPackedWeek}</p>
                                        <p>Reserves Packed This Month: {this.state.reservesPackedMonth}</p>
                                        <p>Reserves Packed This Year: {this.state.reservesPackedYear}</p>
                                        <p>Reserves Packed Total: {this.state.reservesPackedTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Total Saves: {this.state.reserveSaves}</p>                                        
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};


