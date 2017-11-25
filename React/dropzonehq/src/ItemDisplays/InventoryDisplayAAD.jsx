import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';
import SaveItemDetailsBtn from '../Buttons/SaveItemDetailsBtn.jsx';
import InventoryDisplayItem from './InventoryDisplayItem.jsx';

export default class InventoryDisplayAAD extends React.Component {
    constructor(props) {
        super(props);

        this.aad_snChanged = this.aad_snChanged.bind(this);
        this.lifespanChanged = this.lifespanChanged.bind(this);

        this.updateAADRow = this.updateAADRow.bind(this);

        this.state = {
            AADInfo: this.props.AADInfo
        };

    }

    aad_snChanged(e) {
        var newAADInfo = this.state.AADInfo;
        newAADInfo.aad_sn = e.target.value;
        this.setState({
            AADInfo: newAADInfo
        });
    }

    lifespanChanged(e) {
        var newAADInfo = this.state.AADInfo;
        newAADInfo.lifespan = e.target.value;
        this.setState({
            AADInfo: newAADInfo
        });
    }

    updateAADRow(itemInfo) {
        this.props.updateAADRow(itemInfo, this.state.AADInfo);
        console.log("CONTAINER STATE AFTER: " + JSON.stringify(this.state.containerInfo));
    }

    render() {
        return (
            <Card>
                <CardHeader>{"AAD " + this.props.itemInfo.item_id + " Details"}</CardHeader>
                <CardBlock>
                    <Row>
                        <InputGroup>
                            <InputGroupAddon >AAD Lifespan: </InputGroupAddon>
                            <UncontrolledTextInput
                                onBlur={this.lifespanChanged}
                                id="lifespanID"
                                defaultText={this.props.AADInfo.lifespan}
                            />
                        </InputGroup>
                        <InputGroup>
                                <InputGroupAddon >AAD Serial#: </InputGroupAddon>
                                <UncontrolledTextInput
                                    onBlur={this.aad_snChanged}
                                    id="aad_snID"
                                    defaultText={this.props.AADInfo.aad_sn}
                                />
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