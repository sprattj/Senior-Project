import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock } from 'reactstrap';

/*
    An AlertList is a list of Reactstrap alerts.

    It has a header that can be set via props.
    AlertLists must have children, and those children
    must be AlertBoxes.
*/
export default class AlertList extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
                    {this.props.children}
                </CardBlock>
            </Card>
        );
    }
}

AlertList.propTypes = {
    headerText: PropTypes.string.isRequired, //the title of the alerts
     //the children of AlertLists must be AlertBoxes.
}