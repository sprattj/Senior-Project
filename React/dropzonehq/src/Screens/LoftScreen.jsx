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

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class LoftScreen extends React.Component {

    constructor(props) {
        super(props);

        this.URLsection = "/claims";
        this.addQueueItem = this.addQueueItem.bind(this);
        this.selectQueueItem = this.selectQueueItem.bind(this);
        this.dismissQueueItem = this.dismissQueueItem.bind(this);
        this.completeQueueItem = this.completeQueueItem.bind(this);

        this.addWarning = this.addWarning.bind(this);
        this.selectWarning = this.selectWarning.bind(this);
        this.dismissClaim = this.dismissClaim.bind(this);
        this.moveClaimToQueue = this.moveClaimToQueue.bind(this);

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

        for (var i = 0; i < 20; i++) {
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

    addQueueItem() {
        console.log("clicked add queue item")
    }

    addWarning() {
        console.log("clicked add warning")
    }


    render() {
        var tabHeaders = ['Schedule', 'Queue', 'Warnings'];
        var tabContents = [this.state.scheduleDisplay,
        this.state.queueDisplay,
        this.state.warningDisplay];
        var columns = [{
            Header: 'Queue Item',
            accessor: 'name', // String-based value accessors!
            width: 150
        }];
        return (
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
        );
    }
};