import React from 'react';
import Dropdown from './Dropdown.jsx';
import RigsheetRow from './RigsheetRow.jsx';
import { Table, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardHeader, CardBlock } from 'reactstrap';

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
                </CardBlock>
            </Card>
        );
    }
}