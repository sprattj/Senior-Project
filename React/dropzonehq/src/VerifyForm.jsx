import React from 'react';
import { Form } from 'reactstrap';
import PasswordField from './PasswordField.jsx';
import UsernameField from './UsernameField.jsx';

/*
    A VerifyForm is a form that contains a username 
    and password field, used for verifying 
*/
export default class VerifyForm extends React.Component {
    
    //pass the corresponding onchange methods down to the child components so 
    //we can get their values back here when they are changed
    render() {
        return (
            <Form>
                <UsernameField onChange={this.props.usernameChanged} id="usernameEntryField" labelText="Username:" />
                <PasswordField onChange={this.props.passwordChanged} id="passwordEntryField" labelText="Password:" />
            </Form>
        );
    }
}