import React from 'react';
import TableSheet from './TableSheet.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import RentalFilterDropdown from '../Dropdowns/RentalFilterDropdown.jsx';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);

        //this.toggleRented = this.toggleRented.bind(this);

           //var rowData = [{ number: "04", desc: "Old Yellow", isRented: true, rowID: 1},
           //{ number: "09", desc: "Black Jav", isRented: false, rowID: 2},
           //{ number: "01", desc: "Pink and Blue Container", isRented: true, rowID: 3}];
           

        this.state = {
            filter: "Rig",
            columns: [{
                Header:'Item Number',
                accessor: 'number' // String-based value accessors!
            }, {
                Header: 'Item Description',
                accessor: 'desc',
            }],
            rows: [],
            rowID: 0
        };
    }

    //for the dropdown
    handleChange(e) {
        const name = e.target.value;
        this.props.onChange(name);
    }

    onChange(name) {

    }
    

    render() {
        return (
            <div>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TableSheet headerText={<RentalFilterDropdown onChange={this.onChange} />}
                            columns={this.state.columns} >
                            {this.state.rows}
                        </TableSheet>
                    </Col>
                    <Card body>
                        <CardHeader>Current Item Details</CardHeader>
                        <CardBody>
                            This is where a full item description would go
                        </CardBody>
                        <RentButton buttonText="Rent" disabled={true} />
                    </Card>
                </Row>
            </div>
        );
    }






}

