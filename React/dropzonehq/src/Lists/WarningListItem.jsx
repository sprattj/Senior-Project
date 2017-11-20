import React from 'react';
import { ListGroupItem, ButtonGroup } from 'reactstrap';
import ModalButton from '../ModalButtons/ModalButton.jsx';

export default class WarningListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.addToQueue = this.addToQueue.bind(this);
        this.dismiss = this.dismiss.bind(this);        
    }

    handleClick() {
        this.props.onClick(this.props.claim_id);
    }

    addToQueue(){
        this.props.addToQueue(this.props.claim_id);
    }

    dismiss(){
        this.props.dismiss(this.props.claim_id);
    }

    render() {

        var style = {
            backgroundColor: '#FFF',
            color: '#000'
        }
        if (this.props.selected) {
            style = {
                backgroundColor: '#d9534f',
                color: '#FFF'
            }
        }

        var addToQueueContent = 
            <div>

            </div>
        var dismissContent = 
            <div>

            </div>
        return (
            <ListGroupItem style={style} onClick={this.handleClick}>
                <ul>
                    <li>Severity: {this.props.severity}</li>
                    <li>Rig: {this.props.rig_id}</li>
                    <li>Description: {this.props.description}</li>
                    <li>Submit Date: {this.props.submit_date}</li>
                    <li>Due Date: {this.props.due_date}</li>
                </ul>
                <ButtonGroup>
                    <ModalButton buttonSize="sm"
                        buttonColor={"info"}
                        buttonText={"Add to Queue"}
                        modalTitle={"Add Warning"}
                        modalContent={addToQueueContent}
                        modalPrimaryButtonText="Add"
                        modalPrimaryClick={this.addToQueue} />
                    <ModalButton buttonSize="sm"
                        buttonColor={"danger"}
                        buttonText={"Dismiss"}
                        modalTitle={"Dismiss Warning"}
                        modalContent={dismissContent}
                        modalPrimaryButtonText="Dismiss"
                        modalPrimaryClick={this.dismiss} />
                </ButtonGroup>
            </ListGroupItem>
        );
    }
}


