import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import InventoryDisplayItem from './InventoryDisplayItem.jsx';

export default class InventoryDisplayContainer extends React.Component {

    constructor(props) {
        super(props);

        this.container_snChanged = this.container_snChanged.bind(this);
        this.updateContainerRow = this.updateContainerRow.bind(this);

        this.state = {
            containerInfo: this.props.containerInfo
        };
    }

    componentWillReceiveProps(newProps)
    {
        console.log("in componentWillReceiveProps");
        // force update state 
        this.setState({
            containerInfo: newProps.containerInfo
        })
    }

    container_snChanged(e) {
        var containerInfo = {
            container_sn: e.target.value
        }
        this.setState({
            containerInfo: containerInfo
        });
    }

    updateContainerRow(itemInfo) {
        var containerInfo = this.state.containerInfo;
        this.props.updateContainerRow(itemInfo, containerInfo);

        console.log("CONTAINER STATE AFTER: " + JSON.stringify(this.state.containerInfo));
    }

    render() {
        return (
            <Card>
                <CardHeader>{"Container " + this.props.itemInfo.item_id + " Details"}</CardHeader>
                <CardBlock>
                    <Row>
                        <InputGroup>
                            <InputGroupAddon >Container Serial: </InputGroupAddon>
                            <UncontrolledTextInput
                                onBlur={this.container_snChanged}
                                id="containerSerialID"
                                defaultText={this.props.containerInfo.container_sn}
                            />
                        </InputGroup>
                    </Row>
                    <InventoryDisplayItem
                        updateItemInfo={this.updateContainerRow}
                        defaultItemInfo={this.props.itemInfo}
                    />
                </CardBlock>
            </Card>
        );
    }
};