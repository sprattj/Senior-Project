import React from 'react';
import { Form, Input, InputGroup, InputGroupAddon, Card, CardBlock } from 'reactstrap';
import ModalButton from './ModalButton.jsx';
import BioStatDisplay from '../StatDisplays/BioStatDisplay.jsx';
import TandemInstructorStatDisplay from '../StatDisplays/TandemInstructorStatDisplay.jsx';
import AFPInstructorStatDisplay from '../StatDisplays/AFPInstructorStatDisplay.jsx';
import PackingStatDisplay from '../StatDisplays/PackingStatDisplay.jsx';



export default class StatButton extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.toggleEmployeeStatus(this.props.id, this.props.status);
      }


    render() {
        const modalContent =
            <Form>
                <Card>
                    <CardBlock>
                        <BioStatDisplay firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        />

                        <TandemInstructorStatDisplay 
                        tandemJumpsToday={this.props.tandemJumpsToday}
                        tandemJumpsWeek={this.props.tandemJumpsWeek}
                        tandemJumpsMonth={this.props.tandemJumpsMonth}
                        tandemJumpsYear={this.props.tandemJumpsYear}/>

                        <AFPInstructorStatDisplay 
                        AFPJumpsToday={this.props.AFPJumpsToday}
                        AFPJumpsWeek={this.props.AFPJumpsWeek}
                        AFPJumpsMonth={this.props.AFPJumpsMonth}
                        AFPJumpsYear={this.props.AFPJumpsYear}/>

                        <PackingStatDisplay 
                        tandemPackedToday={this.props.tandemPackedToday}
                        tandemPackedWeek={this.props.tandemPackedWeek}
                        tandemPackedMonth={this.props.tandemPackedMonth}
                        tandemPackedYear={this.props.tandemPackedYear}/>
                    </CardBlock>
                </Card>
            </Form>;

        return (
            <ModalButton
                buttonSize="md"
                buttonColor="primary"
                buttonText="Stats"
                modalTitle="Employee Info"
                modalContent={modalContent}
                modalPrimaryButtonText="Stats"
                modalPrimaryClick={this.toggle}
            />
        );
    }
}