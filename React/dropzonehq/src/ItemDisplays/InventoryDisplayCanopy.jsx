import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import InventoryDisplayItem from './InventoryDisplayItem';

export default class InventoryDisplayCanopy extends React.Component {
    constructor(props) {
        super(props);

        this.rig_numberChanged = this.rig_numberChanged.bind(this);
        this.jump_countChanged = this.jump_countChanged.bind(this);
        this.date_of_manufactureChanged = this.date_of_manufactureChanged.bind(this);
        this.sizeChanged = this.sizeChanged.bind(this);
        this.canopy_snChanged = this.canopy_snChanged.bind(this);

        this.updateCanopyRow = this.updateCanopyRow.bind(this);

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
                            <UncontrolledTextInput
                                onBlur={this.sizeChanged}
                                id="sizeID"
                                defaultText={this.props.canopyInfo.size}
                            />
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