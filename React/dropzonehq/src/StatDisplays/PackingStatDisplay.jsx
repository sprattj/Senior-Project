import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/statdisplay/packing";

        //Test data
        this.state = {
            tandemsPackedTotal: 10000,
            tandemsPackedToday: 20,
            tandemsPackedWeek: 42,
            tandemsPackedMonth: 115,
            tandemsPackedYear: 350,
            tandemMalfunctionsTotal: 2,

            studentsPackedTotal: 1000,
            studentsPackedToday: 2,
            studentsPackedWeek: 3,
            studentsPackedMonth: 7,
            studentsPackedYear: 36,
            studentMalfunctionsTotal: 0,
        }
        //---------
    }

    //on loading it will try to fetch the stats but 
    //if it fails it will show test data
    componentDidMount() {
        this.fetchStats();        
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
                        <StatDisplay headerText="Packing Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>Tandems Packed Today: {this.state.tandemsPackedToday}</p>
                                        <p>Tandems Packed This Week: {this.state.tandemsPackedWeek}</p>
                                        <p>Tandems Packed This Month: {this.state.tandemsPackedMonth}</p>
                                        <p>Tandems Packed This Year: {this.state.tandemsPackedYear}</p>
                                        <p>Career Total Tandems Packed: {this.state.tandemsPackedTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Students Packed Today: {this.state.studentsPackedToday}</p>
                                        <p>Students Packed This Week: {this.state.studentsPackedWeek}</p>
                                        <p>Students Packed This Month: {this.state.studentsPackedMonth}</p>
                                        <p>Students Packed This Year: {this.state.studentsPackedYear}</p>
                                        <p>Career Total Students Packed: {this.state.studentsPackedTotal}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}