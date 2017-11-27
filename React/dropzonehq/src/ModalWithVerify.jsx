import React from 'react';
import { Button } from 'reactstrap';
import ModalDialog from './ModalDialog.jsx';
import VerifyPopover from './VerifyPopover.jsx';
import VerifyForm from './VerifyForm.jsx';
/*
  A PackedWrongRigButton is a button for reporting that an employee
  marked the wrong rig as packed.
*/
export default class ModalWithVerify extends React.Component {

    constructor(props) {
        super(props);
        //bind our onchange methods so they can be passed properly 
        //with this.methodName from the onChange props in render
        this.toggleModal = this.toggleModal.bind(this);
        this.togglePopover = this.togglePopover.bind(this);
        this.verify = this.verify.bind(this);

        //keep state for the values of the components in this modal
        this.state = {
            modalOpen: false,
            popoverOpen: false
        }
    }

    //change the REPORT modal's visibility via state
    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    //change the VERFIY modal's visibility via state
    togglePopover() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    verify() {

        //if (this.props.verify){
        this.props.verify();
        this.toggleModal();
        this.togglePopover();
        //}
    }

    //pass the corresponding onchange methods down to the child components so 
    //we can get their values back here when they are changed
    render() {

        return (
            <div>
                <Button size="lg" color={this.props.mainButtonColor}
                    onClick={this.toggleModal}>{this.props.mainButtonText}</Button>

                <ModalDialog title={this.props.modalTitle}
                    isOpen={this.state.modalOpen}
                    onCancelClick={this.toggleModal}
                    primaryButtonText={this.props.modalButtonText}
                    onPrimaryClick={this.props.verify}
                    primaryButtonID={this.props.ID}>
                    <div>{this.props.modalContent}
                        <VerifyForm pinChanged={this.props.pinChanged} />
                    </div>
                </ModalDialog>
            </div>
        );
    }
}

/*
<VerifyPopover
                    isOpen={this.state.popoverOpen}
                    title={this.props.popoverTitle}
                    buttonID={this.props.ID}
                    toggle={this.togglePopover}
                    verify={this.verify}
                    pinChanged={this.props.pinChanged} />
                    */