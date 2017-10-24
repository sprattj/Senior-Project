import React from 'react';
import { Row, Col } from 'reactstrap';
import RentalTable from '../Tables/RentalTable.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

class RentalScreen extends React.Component {
    render() {
        return (
            <div>                
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <RentalTable />
                    </Col>
                </Row>
            </div>
        );
    }
};

export default RentalScreen;