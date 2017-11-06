import React from 'react';
import { ListGroupItem } from 'reactstrap';

export default class QueueListItem extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log(this.props.qID);
        this.props.onClick(this.props.qID);
    }

    render() {
        var style = {
            backgroundColor: '#FFF',
            color: '#000'
        }
        if(this.props.selected)
        {
            style = {
                backgroundColor: '#5bc0de',
                color: '#FFF'
            }
        }
        return (
            <ListGroupItem style={style} onClick={this.handleClick}>
                <ul>
                    <li>Priority: {this.props.priority}</li>
                    <li>Name: {this.props.name}</li>
                    <li>Service: {this.props.service}</li>
                </ul>
            </ListGroupItem>
        );
    }
}