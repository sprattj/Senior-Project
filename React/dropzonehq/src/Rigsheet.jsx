import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock, Table } from 'reactstrap';
import RigsheetRow from './RigsheetRow.jsx';
import SignoutButton from './ModalButtons/SignoutButton.jsx';

/*
    A Rigsheet is a list of rows of rig signouts.
    Each row has an instructor, a rig #, a plane load,
    and a packed by field. 

    The style, header text, and rows of this rigsheet
    are controlled via props.
*/
export default class Rigsheet extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
                    <Table>
                        <thead>
                            <tr>
                                <th>Instructor</th>
                                <th>Rig #</th>
                                <th>Plane Load</th>
                                <th>Packed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </Table>
                    <SignoutButton />
                </CardBlock>
            </Card>
        );
    }
}

Rigsheet.propTypes = {
    headerText: PropTypes.string.isRequired, //the text in the header of the rigsheet
    //children: PropTypes.arrayOf(RigsheetRow).isRequired //an array of rigsheet rows
}