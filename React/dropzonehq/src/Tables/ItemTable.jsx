import React from 'react';
import TableSheet from './TableSheet.jsx';
import RentButton from '../Buttons/RentButton.jsx';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';
import ReactTable from 'react-table';
import { rootURL } from '../restInfo.js';
import "react-table/react-table.css";

//a generic table to show just a brief description of the items to be clicked and
//have their info be displayed on a larger section elsewhere on screen.
//The "headerText" prop doesnt need to be text,
//The "footer" is required for TableSheet
export default class ItemTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "";

        this.state = {            
            columns: [{
                Header: 'Item Number',
                accessor: 'number' // String-based value accessors!
            }, {
                Header: 'Item Description',
                accessor: 'desc'
            }],
            top: this.props.top,
            rows: this.props.rows,
            bottom: this.props.bottom,
            rowID: 0
        };
        //this.displayChoice(this.props.displayType);
        this.processRows(this.state.rows);
    }    

    //Process the rows that are passed in to fill in the Table
    processRows(rowData) {
        for (var i = 0; i < rowData.length; i++) {
            number: { rowData[i].number };
            desc: { rowData[i].desc };
            type: { rowData[i].type };
            index: { i };


            if (rowData[i].isRented) {
                //change the way its viewed
            }
        };
    }
    

    //filter stuff is for testing the states
    render() {        
        return (
            <div>                
                <Row>
                    <Col>
                        <TableSheet
                            headerText={this.state.top}
                            columns={this.state.columns}
                            footer={this.state.bottom}>
                            {this.state.rows}
                        </TableSheet>
                    </Col>
                </Row>
            </div>
        );
    }

}