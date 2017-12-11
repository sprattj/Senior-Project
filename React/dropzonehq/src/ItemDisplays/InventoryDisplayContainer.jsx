import React from 'react';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import InventoryDisplayItem from './InventoryDisplayItem.jsx';

export default class InventoryDisplayContainer extends React.Component {

    constructor(props) {
        super(props);

        this.container_snChanged = this.container_snChanged.bind(this);
        this.updateContainerRow = this.updateContainerRow.bind(this);   
        this.deleteContainerRow = this.deleteContainerRow.bind(this);

        this.state = {
            containerInfo: this.props.containerInfo
        };
    }

    componentWillReceiveProps(newProps)
    {
        console.log("in componentWillReceiveProps (InvDisplayContainer)");
        // force update state 
        this.setState({
            containerInfo: newProps.containerInfo
        })
    }

    container_snChanged(e) 
    {
        console.log("in container_snChanged: ");
/*         var containerInfo = {
            container_sn: e.target.value
        }
        this.setState({
            containerInfo: containerInfo
        }); */

        var newContainerInfo = this.state.containerInfo;
        newContainerInfo.container_sn = e.target.value;
        this.setState({
            containerInfo: newContainerInfo
        });
    }

    updateContainerRow(itemInfo) {
        console.log("updateContainerRow: " + JSON.stringify(itemInfo));
        var containerInfo = this.state.containerInfo;
        this.props.updateContainerRow(itemInfo, containerInfo);

        console.log("CONTAINER STATE AFTER: " + JSON.stringify(this.state.containerInfo));
    }

    deleteContainerRow(item_id) {
        console.log("deleteContainerRow: " + item_id);
        this.props.deleteContainerRow(item_id);

        console.log(" AFTER delete: ");
    }

    render() {
        return (
            <Card>
                <CardHeader>{"Container " + this.props.itemInfo.item_id + " Details"}</CardHeader>
                <CardBlock>
                    <Row>
                        <InputGroup>
                            <InputGroupAddon >Container Serial: </InputGroupAddon>
                            {/* <UncontrolledTextInput
                                onBlur={this.container_snChanged}
                                id="containerSerialID"
                                defaultText={this.props.containerInfo.container_sn}
                            /> */}
                            <input type="text" value={this.state.containerInfo.container_sn} onChange={this.container_snChanged}  />
                        </InputGroup>
                    </Row>
                    <InventoryDisplayItem
                        updateItemInfo={this.updateContainerRow}
                        defaultItemInfo={this.props.itemInfo}
                        deleteItemInfo={this.deleteContainerRow}
                    />
                </CardBlock>
            </Card>
        );
    }
};