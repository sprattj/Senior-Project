import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { rootURL } from '../restInfo.js';
import EditInventoryItemDisplay from '../ItemDisplays/EditInventoryItemDisplay.jsx';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';

export default class TestScreen extends React.Component {

    constructor(props) {
        super(props);

        //CHANGE METHOD TYPE HERE
        this.method = "GET";

        //CHANGE/ADD/REMOVE VARIABLES PASSED TO REQUEST HERE
        //note that whatever you put here for GET requests doesnt matter
        //as it is not passed to the fetch request anyway
        this.requestVariables = {
            VARIABLENAME: "value",
            variable2: 123
        };

        //CHANGE URL HERE 
        //(rootURL comes from /dropzonehq/src/restInfo.js)
        this.URL = rootURL + "/items/id/1"
                            //^always needs to start with a slash

        //dont change this
        this.fetchCall = this.fetchCall.bind(this);
    }

    /*
        dont worry about this stuff down 'ere m8
    */
    fetchCall() {
        console.log("TEST BUTTON CLICKED\nFETCH INFO LISTED AFTER ASTERISKS \n" +
        "*******************************************************************" +
        "*******************************************************************" +
        "*******************************************************************\n" +        
        "*******************************************************************" +
        "*******************************************************************" +
        "*******************************************************************\n" + 
        "*******************************************************************" +
        "*******************************************************************" +
        "*******************************************************************\n" + 
        "*******************************************************************" +
        "*******************************************************************" +
        "*******************************************************************\n" + 
        "*******************************************************************" +
        "*******************************************************************" +
        "*******************************************************************\n" + 
        "*******************************************************************" +
        "*******************************************************************" +
        "*******************************************************************\n" + 
        "For more info on HTTP request, go to Network (on the same toolbar as 'console')\n" +
        "then find your request in the list of requests and click it for more info.\n" +
        "(its listing will have part of the endpoint in the 'Name' column\n "+
        "and may be listed twice, once for the request and once for the response back). \n" +
        "When you click its listing you can see the header info on the tabbed section that pops up\n" +
        "under 'Headers', and DJANGO'S DEBUG INFO ON THE 'PREVIEW' TAB");
        require('isomorphic-fetch');
        require('es6-promise').polyfill();
        //var self = this;

        if(this.method === "GET")
        {
            fetch(this.URL, {
                method: this.method,
                mode: 'CORS',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                console.log("RESPONSE:\n" + response);
                return response.json();
            }).then(function (data) {
                console.log("DATA:\n", data);
            }).catch(function (ex) {
                console.log("PARSING FAILED:\n", ex);
            });
        }else{
            fetch(this.URL, {
                method: this.method,
                mode: 'CORS',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.requestVariables)                
            }).then(function (response) {
                console.log("RESPONSE:\n" + response);
                return response.json();
            }).then(function (data) {
                console.log("DATA:\n", data);
            }).catch(function (ex) {
                console.log("PARSING FAILED:\n", ex);
            });
        }
    }
    
    render() {
        return(
            <div>
            <Row>
            <Col lg={{ size: 12 }}>
                <DropzoneHQNav/>
            </Col>
        </Row>
            <Row>
                <Col lg={{ size: 4, offset: 4 }}>
                    <Button size="lg" color="danger" onClick={this.fetchCall}>
                        CLICK ME TO RUN THE FETCH CALL
                    </Button>
                    <p>(check the console for info about what happened)</p>
                </Col>
                <Row>
                <EditInventoryItemDisplay            //set up the display component
            index={1}
            number={55}
            desc={"Asdfasdf"}
            isRented={true}
            renterName={"Test McTesterson"}
            type={"All"} 
            changeRowData={4}/>
            </Row>
<<<<<<< HEAD
            </Row>
            
=======
            </div>
>>>>>>> master
        );
        
    }
}
