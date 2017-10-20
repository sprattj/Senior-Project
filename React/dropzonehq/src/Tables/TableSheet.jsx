import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock, Table, CardFooter } from 'reactstrap';
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default class TableSheet extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
                    <ReactTable
                        data={this.props.children}
                        columns={this.props.columns} 
                        defaultPageSize={5}
          style={{
            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"/>
                </CardBlock>
                <CardFooter>
                    {this.props.footerContent}
                </CardFooter>
            </Card>
        );
    }
}

TableSheet.propTypes = {
    headerText: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    footerContent: PropTypes.any.isRequired
}