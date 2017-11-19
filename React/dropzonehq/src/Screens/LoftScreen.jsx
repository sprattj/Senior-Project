import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import TabGroup from '../TabGroups/TabGroup.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import QueueDisplay from '../QueueDisplay.jsx';
import QueueList from '../Lists/QueueList.jsx';
import QueueListItem from '../Lists/QueueListItem.jsx';
import WarningDisplay from '../WarningDisplay.jsx';
import WarningList from '../Lists/WarningList.jsx';
import WarningListItem from '../Lists/WarningListItem.jsx';
import './LoftScreen.css';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class LoftScreen extends React.Component {

    constructor(props) {
        super(props);

        this.URLsection = "/claims";


        this.getClaims = this.getClaims.bind(this);

        this.getQueueItems = this.getQueueItems.bind(this);
        this.populateQueue = this.populateQueue.bind(this);
        this.addQueueItem = this.addQueueItem.bind(this);
        this.selectQueueItem = this.selectQueueItem.bind(this);
        this.dismissQueueItem = this.dismissQueueItem.bind(this);
        this.completeQueueItem = this.completeQueueItem.bind(this);
        this.addItemToQueueFromJSON = this.addItemToQueueFromJSON.bind(this);

        this.getWarnings = this.getWarnings.bind(this);
        this.populateWarnings = this.populateWarnings.bind(this);
        this.addWarning = this.addWarning.bind(this);
        this.selectWarning = this.selectWarning.bind(this);
        this.dismissClaim = this.dismissClaim.bind(this);
        this.moveClaimToQueue = this.moveClaimToQueue.bind(this);
        this.addClaimToListFromJSON = this.addClaimToListFromJSON.bind(this);

        this.dismiss = this.dismiss.bind(this);
        this.removeClaim = this.removeClaim.bind(this);

        var queueItems = [];
        var warningItems = [];

        var myEventsList = [
            {
                'title': 'All Day Event very long title',
                'allDay': true,
                'start': new Date(2015, 3, 0),
                'end': new Date(2015, 3, 1)
            },
            {
                'title': 'Long Event',
                'start': new Date(2015, 3, 7),
                'end': new Date(2015, 3, 10)
            },

            {
                'title': 'DTS STARTS',
                'start': new Date(2016, 2, 13, 0, 0, 0),
                'end': new Date(2016, 2, 20, 0, 0, 0)
            }
        ];
        this.state = {
            queueListItems: queueItems,
            warningListItems: warningItems,
            selectedQNdx: 0,
            selectedWarnNdx: 0,
            activeTab: 0,
            queueDisplay: <QueueDisplay />,
            warningDisplay: <WarningDisplay />,
            scheduleDisplay: <div>
                <BigCalendar
                    events={myEventsList}
                    startAccessor='startDate'
                    endAccessor='endDate'
                />
            </div>
        }

        for (var i = 0; i < 10; i++) {
            queueItems.push(<QueueListItem
                key={i}
                qID={i}
                selected={false}
                onClick={this.selectQueueItem}
                dismiss={this.dismissQueueItem}
                complete={this.completeQueueItem}
                severity={"COSMETIC"}
                rig_id={1}
                description={"there's a problemo"}
                submit_date={""}
                due_date={""} />);
            warningItems.push(<WarningListItem
                key={i} warnID={i}
                selected={false}
                onClick={this.selectWarning}
                addToQueue={this.moveClaimToQueue}
                dismiss={this.dismissClaim}
                severity={"COSMETIC"}
                rig_id={1}
                description={"there's a problemo"}
                submit_date={""}
                due_date={""} />);
        }
    }

    componentDidMount() {
        this.getQueueItems();
        this.getWarnings();
    }

    //Fetch claims from database
    //////////////////////////////////////////////////////////
    getQueueItems() {
        var isQueue = true;
        this.getClaims(isQueue);
    }

    getWarnings() {
        var isQueue = false;
        this.getClaims(isQueue);
    }

    getClaims(isQueue) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var endpoint = "warnings";
        if (isQueue) {
            endpoint = "queue";
        }
        var url = rootURL + this.URLsection + "/" + endpoint;
        var self = this;

        fetch(url, {
            method: "GET",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Getting " + endpoint + " failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            if (isQueue) {
                self.populateQueue(responseData);
            } else {
                self.populateWarnings(responseData);
            }
        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }
    //Populate frontend from json data
    //////////////////////////////////////////////////////////
    populateQueue(queueData) {
        var queueItems = [];
        for (var i = 0; i < queueData.length; i++) {
            var nextQItem =
                <QueueListItem
                    key={i}
                    qID={i}
                    selected={false}
                    onClick={this.selectQueueItem}
                    dismiss={this.dismissQueueItem}
                    complete={this.completeQueueItem}
                    severity={queueData[i].severity}
                    rig_id={queueData[i].rig_id}
                    description={queueData[i].description}
                    submit_date={queueData[i].submit_date}
                    due_date={queueData[i].due_date}
                />;
            queueItems.push(nextQItem);
        }
        this.setState({
            queueListItems: queueItems
        });
    }

    populateWarnings(warningData) {
        var warnings = [];
        for (var i = 0; i < warningData.length; i++) {
            var nextWarning =
                <WarningListItem
                    key={this.state.warningListItems.length}
                    warnID={this.state.warningListItems.length}
                    selected={false}
                    onClick={this.selectWarning}
                    addToQueue={this.moveClaimToQueue}
                    dismiss={this.dismissClaim}
                    severity={warningData[i].severity}
                    rig_id={warningData[i].rig_id}
                    description={warningData[i].description}
                    submit_date={warningData[i].submit_date}
                    due_date={warningData[i].due_date}
                />
            warnings.push(nextWarning);
        }
        this.setState({
            warningListItems: warnings
        });
    }


    //Selecting
    //////////////////////////////////////////////////////////
    selectQueueItem(newIndex) {
        //grab the current qItems
        var newQItems = Array.from(this.state.queueListItems);
        var oldQItem = newQItems[this.state.selectedQNdx];

        //grab the qItem that is currently selected and deselect it
        var deselectedOldItem = <QueueListItem {...oldQItem.props} selected={false} />
        //put the deselected version back
        newQItems[this.state.selectedQNdx] = deselectedOldItem;

        //take the new selected qItem and select it
        var newItem = newQItems[newIndex];
        var selectedNewItem = <QueueListItem {...newItem.props} selected={true} />
        //put the deselected version back
        newQItems[newIndex] = selectedNewItem;

        //update the state with the new rows so it rerenders
        this.setState({
            queueListItems: newQItems,
            selectedQNdx: newIndex,
            activeTab: 1
        });
    }

    selectWarning(newIndex) {
        //grab the current claims
        var newClaims = Array.from(this.state.warningListItems);
        //grab the claim that is currently selected
        var oldClaim = newClaims[this.state.selectedWarnNdx];

        //take the claim that is currently selected and deselect it
        var deselectedClaim = <WarningListItem {...oldClaim.props} selected={false} />
        //put the deselected version back
        newClaims[this.state.selectedWarnNdx] = deselectedClaim;

        //take the new selected claim and select it
        var newClaim = newClaims[newIndex];
        var selectedNewClaim = <WarningListItem {...newClaim.props} selected={true} />
        //put the selected version back
        newClaims[newIndex] = selectedNewClaim;

        //update the state with the new claims so it rerenders
        this.setState({
            warningListItems: newClaims,
            selectedWarnNdx: newIndex,
            activeTab: 2
        });
    }

    //Changing status of claims
    //////////////////////////////////////////////////////////
    moveClaimToQueue(claim_id, warnID) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + this.URLsection + "/" + claim_id;

        var self = this;
        var requestVariables = {
            status: "IN PROGRESS"
        };

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Queueing claim failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var oldClaim = self.state.warningListItems[warnID];
            var newNdx = self.state.queueListItems.length;
            var newQItem = <QueueListItem
                {...oldClaim.props}
                key={newNdx}
                qID={newNdx}
                selected={false}
                onClick={self.selectQueueItem}
                complete={this.completeQueueItem}
                dismiss={this.dismissQueueItem}
            />
            var newClaims = Array.from(this.state.warningListItems);
            newClaims.splice(warnID, 1);
            var newQItems = Array.from(this.state.queueListItems);
            newQItems.push(newQItem);
            self.setState({
                warningListItems: newClaims,
                queueListItems: newQItems
            });
        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }

    removeClaim(claim_id, index, isInQueue, endStatus) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + this.URLsection + "/" + claim_id;

        var self = this;
        var requestVariables = {
            status: endStatus
        };

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Dismissing item failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            if (isInQueue) {
                var newQItems = Array.from(this.state.queueListItems);
                newQItems.splice(index, 1);
                self.setState({
                    queueListItems: newQItems
                });
            } else {
                var newClaims = Array.from(this.state.warningListItems);
                newClaims.splice(index, 1);
                self.setState({
                    warningListItems: newClaims
                });
            }
        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
    }
    dismiss(claim_id, index, isInQueue) {
        this.removeClaim(claim_id, index, isInQueue, "DISMISSED");
    }

    dismissClaim(claim_id, warnID) {
        var isInQueue = false;
        this.dismiss(claim_id, warnID, isInQueue);
    }

    dismissQueueItem(claim_id, qID) {
        var isInQueue = true;
        this.dismiss(claim_id, qID, isInQueue);
    }

    completeQueueItem(claim_id, qID) {
        var isInQueue = true;
        this.removeClaim(claim_id, qID, isInQueue, "COMPLETE");
    }

    //Adding new claims to database and frontend
    //////////////////////////////////////////////////////////
    //add a claim to the database and the view
    addClaim(rig_id, severity, description, isQueueItem) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + this.URLsection + "/";

        var status = "";
        if (isQueueItem) {
            status = "IN PROGRESS"
        } else {
            status = "PENDING"
        }

        var self = this;
        var requestVariables = {
            rig_id: rig_id,
            severity: severity,
            status: status,
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
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Adding item failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            if (isQueueItem) {
                self.addItemToQueueFromJSON(responseData);
            } else {
                self.addClaimToListFromJSON(responseData);
            }
        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });
        console.log("clicked add queue item")
    }

    //add a queue item to the database and the view
    addQueueItem(rig_id, severity, description) {
        var isQueueItem = true;
        this.addClaim(rig_id, severity, description, isQueueItem);
    }

    //add a warning to the database and the view
    addWarning(rig_id, severity, description) {
        var isQueueItem = false;
        this.addClaim(rig_id, severity, description, isQueueItem);
    }

    //take a JSON for a claim and add a queuelistitem to the queue
    addItemToQueueFromJSON(qItemData) {
        var newQItem =
            <QueueListItem
                key={this.state.queueListItems.length}
                qID={this.state.queueListItems.length}
                selected={false}
                onClick={this.selectQueueItem}
                dismiss={this.dismissQueueItem}
                complete={this.completeQueueItem}
                severity={qItemData.severity}
                rig_id={qItemData.rig_id}
                description={qItemData.description}
                submit_date={qItemData.submit_date}
                due_date={qItemData.due_date}
            />;

        var newQItems = Array.from(this.state.queueListItems);
        newQItems.push(newQItem);
        this.setState({
            queueListItems: newQItems
        });
    }
    //take a JSON for a claim and add a warning to the warninglist
    addClaimToListFromJSON(claimData) {
        var newClaim =
            <WarningListItem
                key={this.state.warningListItems.length}
                warnID={this.state.warningListItems.length}
                selected={false}
                onClick={this.selectWarning}
                addToQueue={this.moveClaimToQueue}
                dismiss={this.dismissClaim}
                severity={claimData.severity}
                rig_id={claimData.rig_id}
                description={claimData.description}
                submit_date={claimData.submit_date}
                due_date={claimData.due_date}
            />
        var newClaims = Array.from(this.state.warningListItems);
        newClaims.push(newClaim);
        this.setState({
            warningListItems: newClaims
        });
    }

    //Rendering
    //////////////////////////////////////////////////////////
    render() {
        var tabHeaders = ['Schedule', 'Queue', 'Warnings'];
        var tabContents = [this.state.scheduleDisplay,
        this.state.queueDisplay,
        this.state.warningDisplay];
        return (
            <div>
                <Row>
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row className="viewport">
                    <Col xs={{ size: 6 }} md={{ size: 3 }}>
                        <WarningList addWarning={this.addWarning}>
                            {this.state.warningListItems}
                        </WarningList>
                    </Col>
                    <Col xs={{ size: 6 }} md={{ size: 3 }}>
                        <QueueList addQueueItem={this.addQueueItem}>
                            {this.state.queueListItems}
                        </QueueList>
                    </Col>

                    <Col xs={{ size: 12 }} md={{ size: 6 }}>
                        <Card>
                            <CardHeader>Main View</CardHeader>
                            <CardBlock className="main_view">
                                <TabGroup activeTab={this.state.activeTab} tabHeaders={tabHeaders} tabContents={tabContents} />
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
};