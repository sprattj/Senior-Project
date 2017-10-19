import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock } from 'reactstrap';
import TableSheet from './TableSheet.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';


/*
    A Rigsheet is a list of rows of rig signouts.
    Each row has an instructor, a rig #, a plane load,
    and a packed by field. 
    The style, header text, and rows of this rigsheet
    are controlled via props.
*/
export default class Rigsheet extends React.Component {
    render() {

        const columns = [{
            Header: 'Instructor',
            accessor: 'jumpmaster' // String-based value accessors!
        }, {
            Header: 'Rig ID',
            accessor: 'rig_id',
        }, {
            Header: 'Plane Load',
            accessor: 'load_number'
        }, {
            Header: 'Packed By',
            accessor: 'packed_by'
        }]

        return (
            <TableSheet headerText={this.props.headerText}
                columns={columns} footer={this.props.footerContent}>
                {this.props.children}
            </TableSheet>
        );
    }
}

Rigsheet.propTypes = {
    headerText: PropTypes.string.isRequired, //the text in the header of the rigsheet
    //children: PropTypes.arrayOf(RigsheetRow).isRequired //an array of rigsheet rows
}