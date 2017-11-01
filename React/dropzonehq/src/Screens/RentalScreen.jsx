import React from 'react';
import { Row, Col, Card, CardBlock, CardHeader } from 'reactstrap';
import RentButton from '../Buttons/RentButton.jsx';
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
                    <Col lg={{ size: 5, offset: 1 }}>
                        <RentalTable />
                    </Col>
                    <Col lg={{ size: 7, offset: 1 }}>
                        <Card body>
                            <CardHeader>Current Item Details</CardHeader>
                            <CardBlock>
                                This is where a full item description would go
                        </CardBlock>
                            <RentButton buttonText="Rent" disabled={true} />
                        </Card>
                    </Col>

                </Row>
            </div>
        );
    }
};

export default RentalScreen;