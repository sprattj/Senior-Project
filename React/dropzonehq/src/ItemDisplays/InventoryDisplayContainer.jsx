import React from 'react';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import InventoryDisplayItem from './InventoryDisplayItem.jsx';
import Binder from '../Binder.js';

export default class InventoryDisplayContainer extends React.Component {

    constructor(props) {
        super(props);

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryDisplayContainer);

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