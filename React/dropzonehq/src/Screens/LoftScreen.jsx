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

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class LoftScreen extends React.Component {

    constructor(props) {
        super(props);

        this.addQueueItem = this.addQueueItem.bind(this);
        this.addWarning = this.addWarning.bind(this);
        this.dismissQueueItem = this.dismissQueueItem.bind(this);
        this.dismissWarning = this.dismissWarning.bind(this);
        this.selectQueueItem = this.selectQueueItem.bind(this);
        this.selectWarning = this.selectWarning.bind(this);
        
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
            queueItems.push(<QueueListItem key={i} qID={i} selected={false}
                            onClick={this.selectQueueItem} priority="Urgent" 
                            name="Name of Thing" service="Service Thing" />);
            warningItems.push(<WarningListItem key={i} warnID={i} selected={false} 
                                onClick={this.selectWarning} rig="S9" problem="Minor tear" />);
        }
    }

    selectQueueItem(newIndex) {
        var newQItems = Array.from(this.state.queueListItems);
        var oldQItem = newQItems[this.state.selectedQNdx];

        var updatedOldItem = <QueueListItem 
                                key={oldQItem.props.qID} 
                                qID={oldQItem.props.qID} 
                                selected={false}
                                onClick={oldQItem.props.onClick}
                                priority={oldQItem.props.priority} 
                                name={oldQItem.props.name}
                                service={oldQItem.props.service}
                            />
        newQItems[this.state.selectedQNdx] = updatedOldItem;

        var newItem = newQItems[newIndex];
        var updatedNewItem = <QueueListItem 
                                key={newItem.props.qID}
                                qID={newItem.props.qID} 
                                selected={true}
                                onClick={newItem.props.onClick} 
                                priority={newItem.props.priority} 
                                name={newItem.props.name}
                                service={newItem.props.service} 
                            />
        newQItems[newIndex] = updatedNewItem;
        //update the state with the new rows so it rerenders
        this.setState({
            queueListItems: newQItems,
            selectedQNdx: newIndex,
            activeTab: 1
        });
    }

    selectWarning(newIndex){
        var newWarnings = Array.from(this.state.warningListItems);
        var oldWarn = newWarnings[this.state.selectedWarnNdx];

        var updatedOldWarn = <WarningListItem 
                                key={oldWarn.props.warnID} 
                                warnID={oldWarn.props.warnID} selected={false}
                                onClick={oldWarn.props.onClick} 
                                rig={oldWarn.props.rig} 
                                problem={oldWarn.props.problem}
                            />
        newWarnings[this.state.selectedWarnNdx] = updatedOldWarn;

        var newWarn = newWarnings[newIndex];
        var updatedNewWarn = <WarningListItem 
                                key={newWarn.props.warnID} 
                                warnID={newWarn.props.warnID} 
                                selected={true}
                                onClick={newWarn.props.onClick} 
                                rig={newWarn.props.rig} 
                                problem={newWarn.props.problem} 
                            />
        newWarnings[newIndex] = updatedNewWarn;
        //update the state with the new rows so it rerenders
        this.setState({
            warningListItems: newWarnings,
            selectedWarnNdx: newIndex,
            activeTab: 2
        });
    }

    addQueueItem() {
        console.log("clicked add queue item")
    }

    dismissQueueItem() {

    }

    addWarning() {
        console.log("clicked add warning")
    }

    dismissWarning() {

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