import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock, Table } from 'reactstrap';
import TableHeaders from './TableHeaders.jsx';
import TableRow from './TableRow.jsx';


export default class TableSheet extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
                    <Table>
                        <TableHeaders headerArray={this.props.headers}/>
                        <TableRow rowArray={this.props.rows}/>
                    </Table>
                    {this.props.possibleButton}
                </CardBlock>
            </Card>
        );
    }
}

TableSheet.propTypes = {
    headerText: PropTypes.string.isRequired,
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
}