import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Form, FormGroup, Input, Row, Col, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import UncontrolledTextInput from '../UnControlledTextInput.jsx';

export default class InventoryDisplayItem extends React.Component {
    constructor(props) {
        super(props);

        this.manufacturerChanged = this.manufacturerChanged.bind(this);
        this.brandChanged = this.brandChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.is_rentableChanged = this.is_rentableChanged.bind(this);
        this.is_on_rigChanged = this.is_on_rigChanged.bind(this);
        this.is_availableChanged = this.is_availableChanged.bind(this);

        this.updateItemInfo = this.updateItemInfo.bind(this);

        this.state = this.props.defaultItemInfo; 
        
        console.log("ITEM.STATE CONSTRUCTOR: " + JSON.stringify(this.state));
    }

    componentDidMount() {
        this.setState({
            manufacturer: this.props.defaultItemInfo.manufacturer,
            brand: this.props.defaultItemInfo.brand,
            description: this.props.defaultItemInfo.description,
            is_rentable: this.props.defaultItemInfo.is_rentable,
            is_on_rig: this.props.defaultItemInfo.is_on_rig,
            is_available: this.props.defaultItemInfo.is_available
        })
    }

    manufacturerChanged(e) {
        this.setState({
            manufacturer: e.target.value
        });
    }

    brandChanged(e) {
        this.setState({
            brand: e.target.value
        });
    }

    descriptionChanged(e) {
        this.setState({
            description: e.target.value
        });
    }

    is_rentableChanged(e) {
        this.setState({
            is_rentable: e.target.value
        });
    }

    is_on_rigChanged(e) {
        this.setState({
            is_on_rig: e.target.value
        });
    }

    is_availableChanged(e) {
        this.setState({
            is_available: e.target.value
        });
    }

    updateItemInfo() {
        this.props.updateItemInfo(this.state);
    }

    render() {
        return (
            <div>
                <Row>
                    <InputGroup>
                        <InputGroupAddon > Manufacturer: </InputGroupAddon>
                        <UncontrolledTextInput
                            onBlur={this.manufacturerChanged}
                            id="manufacturerID"
                            defaultText={this.props.defaultItemInfo.manufacturer}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon >Brand: </InputGroupAddon>
                        <UncontrolledTextInput
                            onBlur={this.brandChanged}
                            id="brandID"
                            defaultText={this.props.defaultItemInfo.brand}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroupAddon >Description: </InputGroupAddon>
                        <UncontrolledTextInput
                            onBlur={this.descriptionChanged}
                            id="descriptionID"
                            defaultText={this.props.defaultItemInfo.description}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon >Rentable: </InputGroupAddon>
                        <Input type="select"
                            value={this.props.defaultItemInfo.is_rentable}
                            onChange={this.is_rentableChanged}
                            id="is_rentableID"
                        >
                            <option value={true}>Is rentable</option>
                            <option value={false}>Is NOT rentable</option>
                        </Input>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup>
                        <InputGroupAddon >On a Rig: </InputGroupAddon>
                        <Input type="select"
                            value={this.props.defaultItemInfo.is_on_rig}
                            onChange={this.is_on_rigChanged}
                            id="is_on_rigID"
                        >
                            <option value={true}>Is on a rig</option>
                            <option value={false}>NOT on a rig</option>
                        </Input>
                    </InputGroup>
                </Row>
                <Row>
                    <Button size="lg" color="primary" onClick={this.updateItemInfo}>Edit</Button>
                </Row>
            </div>
        );
    }
};