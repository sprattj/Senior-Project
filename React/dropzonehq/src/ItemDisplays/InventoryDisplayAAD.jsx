import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import SaveItemDetailsBtn from '../Buttons/SaveItemDetailsBtn.jsx';
import InventoryDisplayItem from './InventoryDisplayItem.jsx';
import Binder from '../Binder.js';

export default class InventoryDisplayAAD extends React.Component {
    constructor(props) {
        super(props);

        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryDisplayAAD);

        this.state = {
            AADInfo: this.props.AADInfo
        };
    }

    componentWillReceiveProps(newProps)
    {
        console.log("in componentWillReceiveProps (InvDisplayAAD)" + JSON.stringify(newProps) + "\n");
        // force update state 
        this.setState({
            AADInfo: newProps.AADInfo
        })
    }

    aad_snChanged(e) 
    {
        console.log("in aad_snChanged: ");
        var newAADInfo = this.state.AADInfo;
        newAADInfo.aad_sn = e.target.value;
        this.setState({
            AADInfo: newAADInfo
        });
    }

    lifespanChanged(e) 
    {
        console.log("in lifespanChanged: ");
        var newAADInfo = this.state.AADInfo;
        newAADInfo.lifespan = e.target.value;
        this.setState({
            AADInfo: newAADInfo
        });
    }

    updateAADRow(itemInfo) {
        console.log("updateAADRow: " + JSON.stringify(itemInfo));
        this.props.updateAADRow(itemInfo, this.state.AADInfo);
        console.log("AAD STATE AFTER: " + JSON.stringify(this.state.AADInfo));
    }

    render() {
        return (
            <Card>
                <CardHeader>{"AAD " + this.props.itemInfo.item_id + " Details"}</CardHeader>
                <CardBlock>
                    <Row>
                        <InputGroup>
                            <InputGroupAddon >AAD Lifespan: </InputGroupAddon>
                            {/* <UncontrolledTextInput
                                onBlur={this.lifespanChanged}
                                id="lifespanID"
                                defaultText={this.props.AADInfo.lifespan}
                            /> */}
                            <input type="text" value={this.state.AADInfo.lifespan} onChange={this.lifespanChanged}  />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon >AAD Serial#: </InputGroupAddon>
                            {/* <UncontrolledTextInput
                                onBlur={this.aad_snChanged}
                                id="aad_snID"
                                defaultText={this.props.AADInfo.aad_sn}
                            /> */}
                            <input type="text" value={this.state.AADInfo.aad_sn} onChange={this.aad_snChanged}  />
                        </InputGroup>
                    </Row>
                    <InventoryDisplayItem
                        updateItemInfo={this.updateAADRow}
                        defaultItemInfo={this.props.itemInfo}
                    />
                </CardBlock>
            </Card>
        );
    }
}