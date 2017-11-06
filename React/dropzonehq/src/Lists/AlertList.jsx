import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

/*
    An AlertList is a list of Reactstrap alerts.

    It has a header that can be set via props.
    AlertLists must have children, and those children
    must be AlertBoxes.
*/
export default class AlertList extends React.Component {

    processListItems(){
        var listItems = [];
        for(var i =0; i < this.props.children.length; i++)
        {
            var nextItem = <ListGroupItem>{this.props.children[i]}</ListGroupItem>;
            listItems.push(nextItem);
        }
        return listItems;
    }
    render() {
        var items = this.processListItems();
        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}

AlertList.propTypes = {
    headerText: PropTypes.string.isRequired, //the title of the alerts
    //the children of AlertLists must be AlertBoxes.
}