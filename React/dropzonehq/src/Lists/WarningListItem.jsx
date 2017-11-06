import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default class WarningListItem extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log("Clicked warning ID: " + this.props.warnID);
        this.props.onClick(this.props.warnID);
    }

    render() {

        var style = {
            backgroundColor: '#FFF',
            color: '#000'
        }
        if(this.props.selected)
        {
            style = {
                backgroundColor: '#d9534f',
                color: '#FFF'
            }
        }

        return (
            <ListGroupItem style={style} onClick={this.handleClick}>
                <ul>
                    <h6>Rig: {this.props.rig}</h6>
                    <h6>Problem: {this.props.problem}</h6>
                </ul>
            </ListGroupItem>
        );
    }
}


