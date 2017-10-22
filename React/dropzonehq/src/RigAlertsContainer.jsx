import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBlock, ListGroup, ListGroupItem } from 'reactstrap';
import RigProblemButton from './ModalButtons/RigProblemButton.jsx';
import PackedWrongRigButton from './ModalButtons/PackedWrongRigButton.jsx';
import { rootURL } from './restInfo.js';

/*

*/
export default class RigAlertsContainer extends React.Component {

    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/reports";

        //Bind all methods that are passed down so that they can
        //be called via this.methodName in child components
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.reportRigIssue = this.reportRigIssue.bind(this);
        this.reportPackingError = this.reportPackingError.bind(this);
        this.validateUsername = this.validateUsername.bind(this);

        var alertData = [{ severity: "Problem Type 1", message: "Rig S9 has a tear on its container" },
        { severity: "Problem Type 2", message: "Rig S4 has a tear on its container" },
        { severity: "Problem Type 3", message: "Rig S1 has this warning listed for it. Uh oh!" }];//get row data from ajax
        var alerts = this.processAlerts(alertData);

        this.state = {
            username: '',
            password: '',
            alerts: alerts
        }
    }
    //This is the function passed down to the username component
    //that's inside the PackButton's verify modal.
    //when the username is changed, update our state
    usernameChanged(id, username) {
        this.setState({
            username: username
        })
        console.log(this.state.username);
    }

    //This is the function passed down to the password component
    //that's inside the PackButton's verify modal.
    //when the password is changed, update our state
    passwordChanged(id, password) {
        this.setState({
            password: password
        })
        console.log(this.state.password);
    }

    //When this rigsheet component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchAlerts();
    }

    //Add a report to the rig.
    //This is passed down to the authorize button inside
    //of the modal that the RigProblemButton creates.
    reportRigIssue(rig, severity, issue) {

        //create a new alert for the list
        var message = "Rig " + rig + ": " + issue;
        var itemColor = this.getSeverityColor(severity) ;
        var alert = <ListGroupItem key={this.state.alerts.length + 1}
                    color={itemColor}>{message}</ListGroupItem>

        //grab the current alerts
        var newAlerts = Array.from(this.state.alerts);
        //add our new alert
        newAlerts.push(alert);
        //update the state with the new alerts so it rerenders
        this.setState({
            alerts: newAlerts
        })
        console.log("rig issue reported");
    }

    reportPackingError() {
        console.log("packing error reported");
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
            .then(function (alertData) {
                //process the row data we received back
                self.processAlerts(alertData);
                //update our state with these rows to rerender the table
                self.setState({
                    alerts: alertData
                });
            });
    }

    processAlerts(alertData) {
        var alerts = [];
        for (var i = 0; i < alertData.length; i++) {
            var itemColor = this.getSeverityColor(alertData[i].severity);
            var nextAlert = <ListGroupItem
                key={i}
                color={itemColor}>
                {alertData[i].message}
            </ListGroupItem>
            alerts.unshift(nextAlert);
        }
        return alerts;
    }

    getSeverityColor(severity) {
        var color = "primary";
        switch (severity) {
            case ("Problem Type 1"):
                color = "info";
                break;
            case ("Problem Type 2"):
                color = "warning";
                break;
            case ("Problem Type 3"):
                color = "danger";
                break;
            case ("Problem Type 4"):
                color = "danger";
                break;
            default: 
                color="secondary"
                break;
        }
        return color;
    }

    //Validates the given username and password
    //Returns true if they are valid for this action,
    //and false otherwise.
    validateUsername(username, password) {
        //OBVIOUSLY THIS DOESN'T DO ANYTHING RIGHT NOW
        this.setState({
            username: '',
            password: ''
        });
        return true;
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
                                    passwordChanged={this.passwordChanged}
                                    usernameChanged={this.usernameChanged}
                                    verify={this.reportRigIssue} />
                                <br />
                                <PackedWrongRigButton
                                    passwordChanged={this.passwordChanged}
                                    usernameChanged={this.usernameChanged}
                                    verify={this.reportPackingError} />
                            </Col>
                        </Row>
                    </CardBlock>
                </Card>
            </Container>
        );
    }
}