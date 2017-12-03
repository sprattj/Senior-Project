import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import TabGroup from '../TabGroups/TabGroup.jsx';
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
import { CLAIM_STATUS_CHOICES } from '../restInfo.js';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import RequestHandler from '../RequestHandler.js';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DEFAULT_SELECTED_CLAIM_ID = -1;
export default class LoftScreen extends React.Component {

    constructor(props) {
        super(props);

        this.URLsection = "claims/";
        this.pinChanged = this.getClaims.bind(this);
        
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

        var queueItems = new Map();
        var warningItems = new Map();
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
        
        this.pin = 222222; //TODO
        this.state = {
            queueListItems: queueItems,
            warningListItems: warningItems,
            selectedQClaimID: DEFAULT_SELECTED_CLAIM_ID,
            selectedWarnClaimID: DEFAULT_SELECTED_CLAIM_ID,
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
    }

    pinChanged(pin){
        this.pin = pin;
        //TODO does this stop the recalling of componentdidmount?
    }

    componentDidMount() {
        console.log("in component did mount");
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

        var callback = (isQueue ? this.populateQueue : this.populateWarnings);
        var endpoint = (isQueue ? "Queue" : "Warnings" );
        var errorMsg = "Getting " + endpoint + " failed.";
        var successMsg = endpoint + " loaded successfully.";
        endpoint = this.URLsection + endpoint + "/";

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }
    //Populate frontend from json data
    //////////////////////////////////////////////////////////
    populateQueue(queueData) {
        var queueItems = new Map();
        for (var i = 0; i < queueData.length; i++) {
            var nextQItem =
                <QueueListItem
                    key={queueData[i].claim_id}
                    claim_id={queueData[i].claim_id}
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
            queueItems.set(queueData[i].claim_id, nextQItem);
        }
        this.setState({
            queueListItems: queueItems
        });
    }

    populateWarnings(warningData) {
        console.log("warning data: " + JSON.stringify(warningData));
        var warnings = new Map();
        for (var i = 0; i < warningData.length; i++) {
            var nextWarning =
                <WarningListItem
                    key={warningData[i].claim_id}
                    claim_id={warningData[i].claim_id}
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
            //warnings.push(nextWarning);
            warnings.set(warningData[i].claim_id, nextWarning);
        }
        this.setState({
            warningListItems: warnings
        });
    }


    //Selecting
    //////////////////////////////////////////////////////////
    selectQueueItem(newClaimID) {
        //grab the current qItems
        var newQItems = new Map(this.state.queueListItems);

        //if the old selected claim hasn't been deleted
        if(this.state.queueListItems.has(this.state.selectedQClaimID)){
            var oldQItem = newQItems.get(this.state.selectedQClaimID);

            //grab the qItem that is currently selected and deselect it
            var deselectedOldItem = <QueueListItem {...oldQItem.props} selected={false} />
            //put the deselected version back
            newQItems.set(this.state.selectedQClaimID, deselectedOldItem);
        }
        //take the new selected qItem and select it
        var newItem = newQItems.get(newClaimID);
        var selectedNewItem = <QueueListItem {...newItem.props} selected={true} />
        //put the deselected version back
        newQItems.set(newClaimID, selectedNewItem);

        //update the state with the new rows so it rerenders
        this.setState({
            queueListItems: newQItems,
            selectedQClaimID: newClaimID,
            activeTab: 1,
            queueDisplay: <QueueDisplay {...newItem.props}/>
        });
    }

    selectWarning(newClaimID) {
        //grab the current claims
        var newClaims = new Map(this.state.warningListItems)

        //if the old selected claim hasn't been deleted
        if(this.state.warningListItems.has(this.state.selectedWarnClaimID)){
            
            //grab the claim that is currently selected
            var oldClaim = newClaims.get(this.state.selectedWarnClaimID);

            //take the claim that is currently selected and deselect it
            var deselectedClaim = <WarningListItem {...oldClaim.props} selected={false} />
            //put the deselected version back
            newClaims.set(this.state.selectedWarnClaimID, deselectedClaim);
        }

        //take the new selected claim and select it
        var newClaim = newClaims.get(newClaimID);
        var selectedNewClaim = <WarningListItem {...newClaim.props} selected={true} />
        //put the selected version back
        newClaims.set(newClaimID, selectedNewClaim);

        //update the state with the new claims so it rerenders
        this.setState({
            warningListItems: newClaims,
            selectedWarnClaimID: newClaimID,
            activeTab: 2,
            warningDisplay: <WarningDisplay {...newClaim.props}/>
        });
    }

    //Changing status of claims
    //////////////////////////////////////////////////////////
    moveClaimToQueue(claim_id) {
        var endpoint = this.URLsection + claim_id + "/";
        var errorMsg = "Moving claim failed.";
        var successMsg = "Claim updated successfully.";
        var variables = {
            status: CLAIM_STATUS_CHOICES.IN_PROGRESS
        };

        var callback = function (responseData) {
            var oldClaim = this.state.warningListItems.get(responseData.claim_id);
            var newQItem = <QueueListItem
                {...oldClaim.props}
                key={claim_id}
                selected={false}
                onClick={this.selectQueueItem}
                complete={this.completeQueueItem}
                dismiss={this.dismissQueueItem}
            />
            var newClaims = new Map(this.state.warningListItems);
            newClaims.delete(claim_id);
            var newQItems = new Map(this.state.queueListItems);
            newQItems.set(claim_id, newQItem);
            this.setState({
                warningListItems: newClaims,
                queueListItems: newQItems
            });
        };
        var handler = new RequestHandler();
        handler.patch(endpoint, variables, successMsg, errorMsg, callback);
    }

    removeClaim(claim_id, isInQueue, endStatus) {

        var endpoint = this.URLsection + claim_id + "/";
        var variables = {
            status: endStatus
        };
        var successMsg = "Item dismissed.";
        var errorMsg = "Dismissing item failed.";
        var self = this;
    
        var callback = function (){
            var nextList = (isInQueue ? self.state.queueListItems : self.state.warningListItems);
            var nextMap = new Map(nextList);
            nextMap.delete(claim_id);

            if (isInQueue) {
                self.setState({
                    queueListItems: nextMap
                });
            } else {
                self.setState({
                    warningListItems: nextMap
                });
            }
        };

        var handler = new RequestHandler();
        handler.patch(endpoint, variables, successMsg, errorMsg, callback);
    }

    dismiss(claim_id, isInQueue) {
        this.removeClaim(claim_id, isInQueue, "DISMISSED");
    }

    dismissClaim(claim_id) {
        var isInQueue = false;
        this.dismiss(claim_id, isInQueue);
    }

    dismissQueueItem(claim_id) {
        var isInQueue = true;
        this.dismiss(claim_id, isInQueue);
    }

    completeQueueItem(claim_id) {
        var isInQueue = true;
        this.removeClaim(claim_id, isInQueue, "COMPLETE");
    }

    //Adding new claims to database and frontend
    //////////////////////////////////////////////////////////
    //add a claim to the database and the view
    addClaim(rig_id, severity, description, isQueueItem) {

        var endpoint = this.URLsection;
        var status = (isQueueItem ? CLAIM_STATUS_CHOICES.IN_PROGRESS : CLAIM_STATUS_CHOICES.PENDING);
        var callback = (isQueueItem ? this.addItemToQueueFromJSON : this.addClaimToListFromJSON);
        var variables = {
            rig_id: rig_id,
            severity: severity,
            status: status,
            description: description
        };
        var errorMsg = "Adding claim failed.";
        var successMsg = "Claim reported successfully.";

        var handler = new RequestHandler();
        handler.post(endpoint, variables, successMsg, errorMsg, callback);
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
                key={qItemData.claim_id}
                claim_id={qItemData.claim_id}
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

        var newQItems = new Map(this.state.queueListItems);
        newQItems.set(qItemData.claim_id, newQItem);

        this.setState({
            queueListItems: newQItems
        });
    }
    //take a JSON for a claim and add a warning to the warninglist
    addClaimToListFromJSON(claimData) {
        var newClaim =
            <WarningListItem
                key={claimData.claim_id}
                claim_id={claimData.claim_id}
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
        var newClaims = new Map(this.state.warningListItems);
        newClaims.set(claimData.claim_id, newClaim);
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
                        <WarningList pinChanged={this.pinChanged} addWarning={this.addWarning}>
                            {Array.from(this.state.warningListItems.values())}
                        </WarningList>
                    </Col>
                    <Col xs={{ size: 6 }} md={{ size: 3 }}>
                        <QueueList addQueueItem={this.addQueueItem}>
                            {Array.from(this.state.queueListItems.values())}
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