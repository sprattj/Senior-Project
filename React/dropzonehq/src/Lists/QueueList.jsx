import React from 'react';
import LoftList from './LoftList.jsx';
import ModalButton from '../ModalButtons/ModalButton.jsx';

export default class QueueList extends React.Component {

    render() {
        var footerContent = 
            <ModalButton buttonSize="lg" buttonColor="info"
                    buttonText="Add New"
                    modalTitle="Add New Item to Queue"
                    modalPrimaryClick={this.props.addQueueItem}
                    modalPrimaryButtonText="Add"/>;
        return (
            <LoftList headerText="Queue" footerContent={footerContent}>
                {this.props.children}
            </LoftList>
        );
    }
}
