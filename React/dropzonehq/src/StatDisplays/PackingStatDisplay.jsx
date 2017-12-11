import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        
    }    

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Packing Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>Tandems Packed This Week: {this.props.weekly_pack_count}</p>
                                        <p>Tandems Packed This Month: {this.props.monthly_pack_count}</p>
                                        <p>Tandems Packed This Year: {this.props.yearly_pack_count}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}