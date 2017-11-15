import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBlock, ListGroup, ListGroupItem } from 'reactstrap';
import RigProblemButton from './ModalButtons/RigProblemButton.jsx';
import PackedWrongRigButton from './ModalButtons/PackedWrongRigButton.jsx';
import { rootURL } from './restInfo.js';
import { toast } from 'react-toastify';

/*

*/
export default class RigAlertsContainer extends React.Component {

    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/claims";

        //Bind all methods that are passed down so that they can
        //be called via this.methodName in child components
        this.pinChanged = this.pinChanged.bind(this);
        this.reportRigIssue = this.reportRigIssue.bind(this);

        var alertData = [{ severity: "CRITICAL", description: "Rig S9 has a tear on its container" },
        { severity: "COSMETIC", description: "Rig S4 has a tear on its container" },
        { severity: "NON-CRITICAL", description: "Rig S1 has this warning listed for it. Uh oh!" }];//get row data from ajax
        var alerts = this.alertListFromJSON(alertData);

        this.state = {
            username: '',
            password: '',
            alerts: alerts
        }
    }

    //This is the function passed down to the password component
    //that's inside the PackButton's verify modal.
    //when the pin is changed, update our state
    pinChanged(id, pin) {
        this.setState({
            pin: pin
        })
        console.log(this.state.pin);
    }

    //When this rigsheet component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchAlerts();
    }


    //Add a report to the rig.
    //This is passed down to the authorize button inside
    //of the modal that the RigProblemButton creates.
    reportRigIssue(rig_id, severity, description) {

        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + this.URLsection;

        var self = this;
        var requestVariables = {
            rig_id: rig_id,
            severity: severity,
            description: description
        };
        fetch(url, {
            method: "POST",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        })//when we get a response back
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Adding report failed. Bad response " + response.status + " from server.");
                }
                return response.json();
            })//when the call succeeds
            .then(function (rowData) {
                //create a new alert for the list
                var message = "Rig " + rig_id + ": " + description;
                var itemColor = self.getSeverityColor(severity);
                var alert = <ListGroupItem key={self.state.alerts.length + 1}
                    color={itemColor}>{message}</ListGroupItem>

                //grab the current alerts
                var newAlerts = Array.from(self.state.alerts);
                //add our new alert
                newAlerts.push(alert);
                //update the state with the new alerts so it rerenders
                self.setState({
                    alerts: newAlerts
                })
            }).catch(function (error) {
                toast.error(error + "\n" + url);
                return false;
            });
    }

    //Fetch the reports for rigs from the database and 
    //update the state to display them.
    fetchAlerts() {

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
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Fetching alerts failed. Bad response " + response.status + " from server.");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (responseData) {
                //process the row data we received back
                self.alertListFromJSON(responseData);
                //update our state with these rows to rerender the table
                self.setState({
                    alerts: self.alertListFromJSON(responseData)
                });
            }).catch(function (error) {
                toast.error(error + "\n" + url);
                return false;
            });
    }

    alertListFromJSON(claimsJSON) {
        var alerts = [];
        for (var i = 0; i < claimsJSON.length; i++) {
            var itemColor = this.getSeverityColor(claimsJSON[i].severity);
            var nextAlert = <ListGroupItem
                key={i}
                color={itemColor}>
                {claimsJSON[i].description}
            </ListGroupItem>
            alerts.unshift(nextAlert);
        }
        return alerts;
    }

    getSeverityColor(severity) {
        var color = "secondary";
        switch (severity) {
            case ("COSMETIC"):
                color = "info";
                break;
            case ("NON-CRITICAL"):
                color = "warning";
                break;
            case ("CRITICAL"):
                color = "danger";
                break;
            case ("Problem Type 4"):
                color = "danger";
                break;
            default:
                break;
        }
        return color;
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <CardHeader>Reports</CardHeader>
                    <CardBlock>
                        <Row>
                            <Col lg={{ size: 6 }}>
                                <ListGroup >
                                    {this.state.alerts}
                                </ListGroup>
                            </Col>
                            <Col lg={{ size: 6 }}>

                                <RigProblemButton
                                    pinChanged={this.pinChanged}
                                    verify={this.reportRigIssue} />
                                <br />
                            </Col>
                        </Row>
                    </CardBlock>
                </Card>
            </Container>
        );
    }
}