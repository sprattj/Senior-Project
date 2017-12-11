import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import InventoryDisplayItem from './InventoryDisplayItem';
import Binder from '../Binder.js';

export default class InventoryDisplayCanopy extends React.Component {
    constructor(props) {
        super(props);

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryDisplayCanopy);

        this.state = {
            canopyInfo: this.props.canopyInfo
        };
    }

    componentWillReceiveProps(newProps)
    {
        console.log("in componentWillReceiveProps");
        // force update state 
        this.setState({
            canopyInfo: newProps.canopyInfo
        })
    }

    rig_numberChanged(e) {
        var newCanopyInfo = this.state.canopyInfo;
        newCanopyInfo.rig_number = e.target.value;
        this.setState({
            canopyInfo: newCanopyInfo
        });
    }

    jump_countChanged(e) {
        var newCanopyInfo = this.state.canopyInfo;
        newCanopyInfo.jump_count = e.target.value;
        this.setState({
            canopyInfo: newCanopyInfo
        });
    }

    date_of_manufactureChanged(e) {
        var newCanopyInfo = this.state.canopyInfo;
        newCanopyInfo.date_of_manufacture = e.target.value;
        this.setState({
            canopyInfo: newCanopyInfo
        });
    }

    sizeChanged(e) {
        var newCanopyInfo = this.state.canopyInfo;
        newCanopyInfo.size = e.target.value;
        this.setState({
            canopyInfo: newCanopyInfo
        });
    }

    canopy_snChanged(e) {
        var newCanopyInfo = this.state.canopyInfo;
        newCanopyInfo.canopy_sn = e.target.value;
        this.setState({
            canopyInfo: newCanopyInfo
        });
    }

    updateCanopyRow(itemInfo) {
        this.props.updateCanopyRow(itemInfo, this.state.canopyInfo);
    }

    render() {
        return (
            <Card>
                <CardHeader>{"Canopy " + this.props.itemInfo.item_id + " Details"}</CardHeader>
                <CardBlock>
                    <Row>
                        <InputGroup>
                            <InputGroupAddon >Canopy Size: </InputGroupAddon>
                            {/* <UncontrolledTextInput
                                onBlur={this.sizeChanged}
                                id="sizeID"
                                defaultText={this.props.canopyInfo.size}
                            /> */}
                            <input type="text" value={this.state.canopyInfo.size} onChange={this.sizeChanged}  />
                        </InputGroup>
                    </Row>
                    <InventoryDisplayItem
                        updateItemInfo={this.updateCanopyRow}
                        defaultItemInfo={this.props.itemInfo}
                    />
                </CardBlock>
            </Card>
        );
    }
};