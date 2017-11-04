import React from 'react';
import TableSheet from './TableSheet.jsx';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

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

        this.RowProps = this.RowProps.bind(this);

        this.state = {
            columns: [{
                Header: 'Item Number',
                accessor: 'number', // String-based value accessors!
                width: 150
            }, {
                Header: 'Item Description',
                accessor: 'desc',
                width: 400
            }],
            rowID: 0
        };
        //this.displayChoice(this.props.displayType);
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

        return rowData;
    }

    //this allows for selection and still renders the background colors
    RowProps(state, rowInfo) {
        if (rowInfo) {
            var backgroundColor;
            if (rowInfo.index % 2 === 0) {
                backgroundColor = "whitesmoke";
            } else {
                backgroundColor = "white";
            }

            return {
                onClick: (e) => {
                    this.setState({
                        selected: rowInfo.index
                    })
                },
                style: {
                    background: rowInfo.index === this.state.selected ? '#00afec' : backgroundColor,
                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                }
            }
        } else {
            return {};
        }

    }

    


    //filter stuff is for testing the states
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <TableSheet
                            getTrProps={this.RowProps}
                            headerText={this.props.top}
                            columns={this.state.columns}
                            footer={this.props.bottom}>
                            {this.processRows(this.props.rows)}
                        </TableSheet>
                    </Col>
                </Row>
            </div>
        );
    }

}