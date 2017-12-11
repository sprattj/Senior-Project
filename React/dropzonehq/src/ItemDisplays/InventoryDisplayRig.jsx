import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import InventoryDisplayItem from './InventoryDisplayItem.jsx';
import Binder from '../Binder.js';

export default class InventoryDisplayRig extends React.Component {
    constructor(props) {
        super(props);

        //create a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, InventoryDisplayRig);
        
        this.state = {
            rigInfo: this.props.rigInfo
        };
    }

    componentWillReceiveProps(newProps)
    {
        console.log("in componentWillReceiveProps");
        // force update state 
        this.setState({
            rigInfo: newProps.rigInfo
        })
    }

    rig_numberChanged(e) {
        this.setState({
            rig_number: e.target.value
        });
    }

    aadChanged(e) {
        this.setState({
            aad: e.target.value
        });
    }

    containerChanged(e) {
        this.setState({
            container: e.target.value
        });
    }

    isTandemChanged(e) {
        this.setState({
            isTandem: e.target.value
        });
    }

    canopy_on_rigChanged(e) {
        this.setState({
            canopy_on_rig: e.target.value
        });
    }

    updateRigRow(itemInfo) {
        this.props.updateRigRow(itemInfo, this.state.rigInfo);
    }

    render() {
        return (
            <Card>
                <CardHeader>{"Rig " + this.props.itemInfo.item_id + " Details"}</CardHeader>
                <CardBlock>
                    <Row>
                        {/*stuff for rigs will have to go here*/}
                    </Row>
                    <InventoryDisplayItem
                        updateItemInfo={this.updateRigRow}
                        defaultItemInfo={this.props.itemInfo}
                    />
                </CardBlock>
            </Card>
        );
    }
};