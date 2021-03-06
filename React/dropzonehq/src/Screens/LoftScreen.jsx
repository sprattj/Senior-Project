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
import { CLAIM_STATUS_CHOICES } from '../restInfo.js';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import RequestHandler from '../RequestHandler.js';
import Binder from '../Binder.js';
import moment from 'moment';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment);

/**
 * LoftScreen displays all active warnings for damaged rigs and
 * shows all in-progress maintenance or repairs for rigs.
 * @module LoftScreen
 */
 
/** @const {Number} DEFAULT_SELECTED_CLAIM_ID - The default selected claim index before any claim is clicked. */
const DEFAULT_SELECTED_CLAIM_ID = -1;

/** LoftScreen displays all active warnings for damaged rigs and
 * shows all in progres maintenance or repairs for rigs.  */
export default class LoftScreen extends React.Component {

    constructor(props) {
        super(props);

        this.URLsection = "claims/";

        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, LoftScreen);

        var queueItems = new Map();
        var warningItems = new Map();
        var myEventsList = [
            {
                'title': 'All Day Event very long title',
                'allDay': true,
                'start': new Date(2015, 3, 0),
                'end': new Date(2015, 3, 1)
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

    pinChanged(pin) {
        this.pin = pin;
        //TODO does this stop the recalling of componentdidmount?
    }

    /////////////FETCH AND DISPLAY CLAIMS FROM DATABASE/////////////
    /////////////FETCH AND DISPLAY CLAIMS FROM DATABASE/////////////
    /////////////FETCH AND DISPLAY CLAIMS FROM DATABASE/////////////
    /////////////FETCH AND DISPLAY CLAIMS FROM DATABASE/////////////
    /////////////FETCH AND DISPLAY CLAIMS FROM DATABASE/////////////
    /////////////FETCH AND DISPLAY CLAIMS FROM DATABASE/////////////
    /////FETCH/////
    /////FETCH/////
    /////FETCH/////
    /**
     * When this component mounts on the DOM, get the queue
     * and warning lists and display them.
     */
    componentDidMount() {
        this.getQueueItems();
        this.getWarnings();
    }

    /**
     * Fetch and display the queue claims from the database.
     */
    getQueueItems() {
        var isQueue = true;
        this.getClaims(isQueue);
    }

    /**
     * Fetch and display the warning claims from the database.
     */
    getWarnings() {
        var isQueue = false;
        this.getClaims(isQueue);
    }

    /**
     * Fetch and display claims from the database.
     * @param {boolean} isQueue - true to fetch queue claims, 
     * false to fetch warning claims
     */
    getClaims(isQueue) {

        var callback = (isQueue ? this.populateQueue : this.populateWarnings);
        var endpoint = (isQueue ? "Queue" : "Warnings");
        var errorMsg = "Getting " + endpoint + " failed.";
        var successMsg = endpoint + " loaded successfully.";
        endpoint = this.URLsection + endpoint + "/";

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    /////DISPLAY AFTER FETCH/////
    /////DISPLAY AFTER FETCH/////
    /////DISPLAY AFTER FETCH/////
    /**
     * Take a JSON response of all queue claims and add them to the 
     * frontend as QueueListItems.
     * @param {Object} queueData - the JSON response of all queue claims 
     */
    populateQueue(queueData) {
        for (var i = 0; i < queueData.length; i++) {
            this.addItemToQueueFromJSON(queueData[i]);
        }
    }

    /**
     * Take a JSON response of all warning claims and add them to the 
     * frontend as WarningListItems.
     * @param {Object} queueData - the JSON response of all queue claims 
     */
    populateWarnings(warningData) {
        for (var i = 0; i < warningData.length; i++) {
            this.addWarningToListFromJSON(warningData[i]);
        }
    }


    /////////////SELECTING A LIST ITEM////////////////
    /////////////SELECTING A LIST ITEM////////////////
    /////////////SELECTING A LIST ITEM////////////////
    /////////////SELECTING A LIST ITEM////////////////
    /////////////SELECTING A LIST ITEM////////////////
    /////////////SELECTING A LIST ITEM////////////////
    /**
     * Show the warning with the given ID as selected in
     * the warning list and display its info in the display.
     * @param {int} selectedClaimID - The ID of the claim that was selected
     */
    selectWarning(selectedClaimID) {
        //isQueue = false
        this.selectClaimListItem(selectedClaimID, false);
    }
    /**
     * Show the queue item with the given ID as selected in
     * the queue item list and display its info in the display.
     * @param {int} selectedClaimID - The ID of the claim that was selected
     */
    selectQueueItem(selectedClaimID) {
        //isQueue = true
        this.selectClaimListItem(selectedClaimID, true);
    }

    /**
     * Take a list item and return a version of it whose
     * select prop is equal to the given isSelected value.
     * @param {Component} listItem - The list item to return a changed copy of.
     * @param {boolean} isSelected - The value to change the item's {selected} prop to 
     * @param {*} isQueue - True if this claim is a queue item, false if it is a warning
     * @return An altered copy of listItem whose select prop is equal to isSelected
     */
    getListItemWithSelectVal(listItem, isSelected, isQueue) {
        var oldProps = listItem.props;
        var changedListItem = (isQueue ? <QueueListItem {...oldProps} selected={isSelected} />
            : <WarningListItem {...oldProps} selected={isSelected} />);
        return changedListItem;
    }

    /**
     * Show the claim list item with the given ID as selected in
     * its corresponding list (either warnings or queue)
     * and display its info in the display.
     * @param {int} selectedClaimID - The claim ID of the item that was selected
     * @param {boolean} isQueue - True if this claim is a queue item, false if it is a warning
     */
    selectClaimListItem(selectedClaimID, isQueue) {

        //grab selected claim_id from state (based on whether this is a qItem or warning)
        var oldSelectedID = (isQueue ? this.state.selectedQClaimID
            : this.state.selectedWarnClaimID);
        //grab corresponding map from state (based on whether this is a qItem or warning)
        var oldClaimsMap = (isQueue ? this.state.queueListItems
            : this.state.warningListItems);
        //create a copy of that map so we can edit it and update state with it
        var newClaimsMap = new Map(oldClaimsMap);

        //check if old id exists in map (starts at -1 by default)
        if (oldClaimsMap.has(oldSelectedID)) {

            //old id exists, so grab its element
            var oldClaim = newClaimsMap.get(oldSelectedID);
            console.log("selected ID: " + oldSelectedID + "/n Claim: " + JSON.stringify(oldClaim))
            //then deselect it
            var deselectedListItem = this.getListItemWithSelectVal(oldClaim, false, isQueue);
            //and replace the old version with the deselected version
            newClaimsMap.set(oldSelectedID, deselectedListItem);
        }

        //grab the claim that was just clicked
        var newClaim = newClaimsMap.get(selectedClaimID);
        //then select it
        var selectedListItem = this.getListItemWithSelectVal(newClaim, true, isQueue);
        //and replace the old version with the selected version
        newClaimsMap.set(selectedClaimID, selectedListItem);

        //create a new display from this selected claim (based on whether it's queue or warning)
        var newDisplay = (isQueue ? <QueueDisplay {...newClaim.props} />
            : <WarningDisplay {...newClaim.props} />);

        //update the state to deselect old item, select new item, and show display for new
        //item on the right.
        if (isQueue) {
            this.setState({
                queueListItems: newClaimsMap,
                selectedQClaimID: selectedClaimID,
                activeTab: 1,
                queueDisplay: newDisplay
            });
        } else {
            this.setState({
                warningListItems: newClaimsMap,
                selectedWarnClaimID: selectedClaimID,
                activeTab: 2,
                warningDisplay: newDisplay
            });
        }
    }

    /////////////ADD CLAIM TO LIST////////////////
    /////////////ADD CLAIM TO LIST////////////////
    /////////////ADD CLAIM TO LIST////////////////
    /////////////ADD CLAIM TO LIST////////////////
    /////////////ADD CLAIM TO LIST////////////////
    /////ADDING WARNINGS/////
    /////ADDING WARNINGS/////
    /////ADDING WARNINGS/////
    /**
     * Add a warning to the backend and display it in the warning list.
     * @param {int} rig_id - The rig_id of the rig that this warning is for
     * @param {string} severity - The severity of this warning.
     * @param {string} description - The description of this warning.
     */
    addWarning(rig_id, severity, description) {
        var isQueueItem = false;
        this.addClaim(rig_id, severity, description, isQueueItem);
    }

    /**
     * Take a JSON response for one claim, turn it into a WarningListItem,
     * then add it to the list of warnings.
     * @param {Object} claimData - A JSON containing the info for one warning claim.
     */
    addWarningToListFromJSON(claimData) {
        var newWarningListItem = this.warningListItemFromJSON(claimData);
        this.addWarningListItemToList(newWarningListItem);
    }

    /**
     * Take a JSON of a single claim and return it as a WarningListItem
     * @param {Object} warningData - The data for a claim in JSON format 
     * to create a WarningListItem from
     * @return a WarningListItem created from the warning data
     */
    warningListItemFromJSON(warningData) {
        //isQueue = false
        return this.claimListItemFromJSON(warningData, false);
    }

    /**
     * Add a WarningListItem to the warning list on the frontend.
     * @param {Component} warningListItem - The WarningListItem to add
     */
    addWarningListItemToList(warningListItem) {
        //isQueue = false
        this.addItemToList(warningListItem, false);
    }

    /////ADDING QUEUE ITEMS/////
    /////ADDING QUEUE ITEMS/////
    /////ADDING QUEUE ITEMS/////

    /**
     * Add a queue item to the backend and display it in the queue item list.
     * @param {int} rig_id - The rig_id of the rig that this queue item is for
     * @param {string} severity - The severity of this queue item.
     * @param {string} description - The description of this queue item.
     */
    addQueueItem(rig_id, severity, description) {
        var isQueueItem = true;
        this.addClaim(rig_id, severity, description, isQueueItem);
    }

    /**
   * Take a JSON response for one claim, turn it into a QueueListItem,
   * then add it to the list of queue claims.
   * @param {Object} claimData - A JSON containing the info for one queue claim.
   */
    addItemToQueueFromJSON(claimData) {
        var newQueueListItem = this.queueListItemFromJSON(claimData);
        this.addQueueListItemToList(newQueueListItem);
    }

    /**
   * Take a JSON of a single claim and return it as a QueueListItem
   * @param {Object} qItemData - The data for a claim in JSON format 
   * to create a QueueListItem from
   * @return a QueueListItem created from the warning data
   */
    queueListItemFromJSON(qItemData) {
        //isQueue = true
        return this.claimListItemFromJSON(qItemData, true);
    }

    /**
    * Add a QueueListItem to the queue list on the frontend.
    * @param {Component} queueListItem - The QueueListItem to add
    */
    addQueueListItemToList(queueListItem) {
        //isQueue = true
        this.addItemToList(queueListItem, true);
    }

    /////ADDING GENERIC CLAIM METHODS/////
    /////ADDING GENERIC CLAIM METHODS/////
    /////ADDING GENERIC CLAIM METHODS/////

    /**
     *Add a claim to the backend as a warning or a queue item (determined by isQueue).
     and display it in its corresponding list (determined by isQueue).
     * @param {int} rig_id - The rig_id of the rig that this claim is for
     * @param {string} severity - The severity of this claim.
     * @param {string} description - The description of this claim.
     * @param {boolean} isQueue - True if this claim is a queue item, false if it is a warning
     */
    addClaim(rig_id, severity, description, isQueue) {

        var endpoint = this.URLsection;
        var status = (isQueue ? CLAIM_STATUS_CHOICES.IN_PROGRESS : CLAIM_STATUS_CHOICES.PENDING);
        var callback = (isQueue ? this.addItemToQueueFromJSON : this.addWarningToListFromJSON);
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

    /**
     * Take a JSON of a single claim and return it as a 
     * QueueListItem or WarningListItem (determined by isQueue).
     * @param {Object} claimData - The data for a claim in JSON format 
     * to create a QueueListItem or WarningListItem from
     * @param {boolean} isQueue  - True if this claim is a queue item, false if it is a warning
     * @return a QueueListItem or WarningListItem created from the warning data (determined by isQueue).
     */
    claimListItemFromJSON(claimData, isQueue) {
        var onClick = (isQueue ? this.selectQueueItem : this.selectWarning);
        var dismiss = (isQueue ? this.dismissQueueItem : this.dismissClaim);
        var newProps = {
            key: claimData.claim_id,
            claim_id: claimData.claim_id,
            selected: false,
            onClick: onClick,
            dismiss: dismiss,
            severity: claimData.severity,
            rig_id: claimData.rig_id,
            description: claimData.description,
            submit_date: claimData.submit_date,
            due_date: claimData.due_date
        }
        var newClaim = (isQueue ? <QueueListItem {...newProps} complete={this.completeQueueItem} />
            : <WarningListItem {...newProps} addToQueue={this.moveClaimToQueue} />);
        return newClaim;
    }

    /**
    * Add a QueueListItem or WarningListItem (determined by isQueue) 
        to the queue list or warning list (determined by isQueue) on the frontend.
    * @param {Component} listItem - The QueueListItem or WarningListItem to add
    * @param {boolean} isQueue  - True if this list item is a QueueListItem, false if it is a WarningListItem
    */
    addItemToList(listItem, isQueue) {
        var oldMap = (isQueue ? this.state.queueListItems : this.state.warningListItems);
        var newMap = new Map(oldMap);
        newMap.set(listItem.props.claim_id, listItem);
        (isQueue) ? this.setState({ queueListItems: newMap })
            : this.setState({ warningListItems: newMap });
    }

    /////////////METHODS FOR WARNINGS////////////////
    /////////////METHODS FOR WARNINGS////////////////
    dismissClaim(claim_id) {
        var isInQueue = false;
        this.dismiss(claim_id, isInQueue);
    }


    /////////////METHODS FOR QUEUE ITEMS////////////////
    /////////////METHODS FOR QUEUE ITEMS////////////////
    dismissQueueItem(claim_id) {
        var isInQueue = true;
        this.dismiss(claim_id, isInQueue);
    }
    completeQueueItem(claim_id) {
        var isInQueue = true;
        this.removeClaim(claim_id, isInQueue, "COMPLETE");
    }

    /////////////METHODS FOR ALL CLAIMS////////////////
    /////////////METHODS FOR ALL CLAIMS////////////////
    /////////////METHODS FOR ALL CLAIMS////////////////
    /////////////METHODS FOR ALL CLAIMS////////////////
    /////////////METHODS FOR ALL CLAIMS////////////////


    removeClaim(claim_id, isInQueue, endStatus) {

        var endpoint = this.URLsection + claim_id + "/";
        var variables = {
            status: endStatus
        };
        var successMsg = "Item dismissed.";
        var errorMsg = "Dismissing item failed.";
        var self = this;

        var callback = function () {
            var nextList = (isInQueue ? self.state.queueListItems : self.state.warningListItems);
            var nextMap = new Map(nextList);
            nextMap.delete(claim_id);
            (isInQueue) ? self.setState({ queueListItems: nextMap })
                : self.setState({ warningListItems: nextMap });
        };

        var handler = new RequestHandler();
        handler.patch(endpoint, variables, successMsg, errorMsg, callback);
    }

    dismiss(claim_id, isInQueue) {
        this.removeClaim(claim_id, isInQueue, "DISMISSED");
    }

    moveClaimToQueue(claim_id) {
        var endpoint = this.URLsection + claim_id + "/";
        var errorMsg = "Moving claim failed.";
        var successMsg = "Claim updated successfully.";
        var variables = {
            status: CLAIM_STATUS_CHOICES.IN_PROGRESS
        };
        var self = this;
        var callback = function (responseData) {
            var oldClaim = self.state.warningListItems.get(responseData.claim_id);
            var newQItem = <QueueListItem
                {...oldClaim.props}
                key={claim_id}
                selected={false}
                onClick={self.selectQueueItem}
                complete={self.completeQueueItem}
                dismiss={self.dismissQueueItem}
            />
            var newClaims = new Map(self.state.warningListItems);
            newClaims.delete(claim_id);
            var newQItems = new Map(self.state.queueListItems);
            newQItems.set(claim_id, newQItem);
            self.setState({
                warningListItems: newClaims,
                queueListItems: newQItems
            });
        };
        var handler = new RequestHandler();
        handler.patch(endpoint, variables, successMsg, errorMsg, callback);
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