import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import { rootURL } from '../restInfo.js';


export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/statdisplay/bio";  
        
        //Test data
        this.state = {
            visible: true,  //Bio will always be visible
            show: true,     //allow collapse and expand
            firstName: "Brian",
            lastName: "Krick",
            employmentDate: "04/2010",
            jumpCount: 7,
            bio: "Are we done yet?",
        };
        //---------
    }


    //on loading it will try to fetch the bio but 
    //if it fails it will show test data
    componentDidMount() {
        this.fetchBio();        
    }

    fetchBio() {
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
                        <StatDisplay headerText="Bio"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>FirstName: {this.state.firstName}</p>
                                        <p>Employment Date: {this.state.employmentDate}</p>
                                        <p>EditableBio: {this.state.bio}</p>
                                    </Col>
                                    <Col>
                                        <p>Last Name: {this.state.lastName}</p>
                                        <p>Jump Count: {this.state.jumpCount}</p>
                                        <p>Change PassWord ModalButton</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}