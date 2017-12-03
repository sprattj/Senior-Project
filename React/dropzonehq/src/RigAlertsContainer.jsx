import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBlock, ListGroup, ListGroupItem } from 'reactstrap';
import RigProblemButton from './ModalButtons/RigProblemButton.jsx';
import { CLAIM_STATUS_CHOICES, CLAIM_SEVERITY_CHOICES } from './restInfo.js';
import RequestHandler from './RequestHandler.js';
/*

*/
export default class RigAlertsContainer extends React.Component {

    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "claims/";

        //Bind all methods that are passed down so that they can
        //be called via this.methodName in child components
        this.pinChanged = this.pinChanged.bind(this);
        this.reportRigIssue = this.reportRigIssue.bind(this);
        this.alertFromJSON = this.alertFromJSON.bind(this);
        this.alertListFromJSON = this.alertListFromJSON.bind(this);

        this.state = {
            username: '',
            password: '',
            alerts: ''
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

        var endpoint = this.URLsection;
        var self = this;
        var variables = {
            rig_id: rig_id,
            severity: severity,
            description: description,
            status: CLAIM_STATUS_CHOICES.PENDING
        };

        var errorMsg = "Adding claim failed.";
        var successMsg = "Claim reported successfully.";

        var callback = function (responseData) {
            //create a new alert for the list
            var nextKey = self.state.alerts.length + 1;
            var alert = self.alertFromJSON(responseData, nextKey);

            //grab the current alerts
            var newAlerts = Array.from(self.state.alerts);
            //add our new alert
            newAlerts.push(alert);
            //update the state with the new alerts so it rerenders
            self.setState({
                alerts: newAlerts
            })
        };

        //make the request via handler
        var handler = new RequestHandler();
        handler.post(endpoint, variables, successMsg, errorMsg, callback);
    }

    //Fetch the reports for rigs from the database and 
    //update the state to display them.
    fetchAlerts() {

        // endpoint like /claims/warnings
        var endpoint = this.URLsection + "warnings/";
        var self = this;
        var callback = function (responseData) {
            //process the row data we received back
            self.alertListFromJSON(responseData);
            //update our state with these rows to rerender the table
            self.setState({
                alerts: self.alertListFromJSON(responseData)
            });
        };
        var successMsg = "Fetched active rig issues info.";
        var errorMsg = "Problem fetching active rig issue info.";

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    alertFromJSON(responseJSON, key){
        var itemColor = this.getSeverityColor(responseJSON.severity);
        var nextAlert = <ListGroupItem
            key={key}
            color={itemColor}>
            Rig {responseJSON.rig_id}: {responseJSON.description}
        </ListGroupItem>
        return nextAlert;
    }

    alertListFromJSON(claimsJSON) {
        var alerts = [];
        for (var i = 0; i < claimsJSON.length; i++) {
            var nextAlert = this.alertFromJSON(claimsJSON[i], i);
            alerts.unshift(nextAlert);
        }
        return alerts;
    }

    getSeverityColor(severity) {
        var color = "secondary";
        severity = severity.toLowerCase();
        switch (severity) {
            case (CLAIM_SEVERITY_CHOICES.COSMETIC.toLowerCase()):
                color = "info";
                break;
            case (CLAIM_SEVERITY_CHOICES.NON_CRITICAL.toLowerCase()):
                color = "warning";
                break;
            case (CLAIM_SEVERITY_CHOICES.CRITICAL.toLowerCase()):
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