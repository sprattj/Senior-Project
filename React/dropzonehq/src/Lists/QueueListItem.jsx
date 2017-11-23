import React from 'react';
import { ListGroupItem, ButtonGroup } from 'reactstrap';
import ModalButton from '../ModalButtons/ModalButton.jsx';

export default class QueueListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.complete = this.complete.bind(this);
        this.dismiss = this.dismiss.bind(this);        
    }

    handleClick() {
        this.props.onClick(this.props.claim_id);
    }

    complete(){
        this.props.complete(this.props.claim_id);
    }

    dismiss(){
        this.props.dismiss(this.props.claim_id);
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
        
        var completeContent = 
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
                        buttonText={"Complete"}
                        modalTitle={"Complete Queue Item"}
                        modalContent={completeContent}
                        modalPrimaryButtonText="Complete"
                        modalPrimaryClick={this.complete} />
                    <ModalButton buttonSize="sm"
                        buttonColor={"danger"}
                        buttonText={"Dismiss"}
                        modalTitle={"Dismiss Queue Item"}
                        modalContent={dismissContent}
                        modalPrimaryButtonText="Dismiss"
                        modalPrimaryClick={this.dismiss} />
                </ButtonGroup>
            </ListGroupItem>
        );
    }
}