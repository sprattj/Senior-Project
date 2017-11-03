import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock, ListGroup } from 'reactstrap';
import TabGroup from '../TabGroups/TabGroup.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import QueueDisplay from '../QueueDisplay.jsx';
import QueueList from '../QueueList.jsx';
import QueueListItem from '../QueueListItem.jsx';
import WarningDisplay from '../WarningDisplay.jsx';
import WarningList from '../WarningList.jsx';
import WarningListItem from '../WarningListItem.jsx';

export default class LoftScreen extends React.Component {

    constructor(props) {
        super(props);

        var queueItems =[];
        var warningItems = [];
        for(var i = 0; i<20; i++){
            queueItems.push(<QueueListItem key={i} priority="Urgent" name="Name of Thing" service="Service Thing" />);
            warningItems.push(<WarningListItem key={i} rig="S9" problem="Minor tear" />);
        }
        this.state = {
            queueListItems: queueItems,
            warningListItems: warningItems,
            queueDisplay: <QueueDisplay />,
            warningDisplay: <WarningDisplay />,
            scheduleDisplay: <h1>Schedule</h1>
        }
    }

    render() {
        var tabHeaders = ['Schedule', 'Queue', 'Warnings'];
        var tabContents = [this.state.scheduleDisplay,
        this.state.queueDisplay,
        this.state.warningDisplay];
        return (
            <div>
                <Row>
                    <Col xs={{ size: 12 }} md={{ size: 6 }}>
                        <Card>
                            <CardHeader>Main View</CardHeader>
                            <CardBlock>
                                <TabGroup tabHeaders={tabHeaders} tabContents={tabContents} />
                            </CardBlock>
                        </Card>
                    </Col>

                    <Col xs={{ size: 6 }} md={{ size: 3 }}>
                        <QueueList>
                            {this.state.queueListItems}
                        </QueueList>
                    </Col>

                    <Col xs={{ size: 6 }} md={{ size: 3 }}>
                        <WarningList>
                            {this.state.warningListItems}
                        </WarningList>
                    </Col>
                </Row>
            </div>
        );
    }
};