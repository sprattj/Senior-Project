import React from 'react';
import { CLAIM_SEVERITY_CHOICES } from './restInfo.js';
import { Alert } from 'reactstrap';

export default class QueueDisplay extends React.Component {

    render() {
        var alertColor = "secondary";
        var alertMsg = "Issue";
        if (this.props.severity) {
            switch (this.props.severity.toLowerCase()) {
                case CLAIM_SEVERITY_CHOICES.CRITICAL.toLowerCase():
                    alertColor = "danger";
                    alertMsg = "Critical Issue";
                    break;
                case CLAIM_SEVERITY_CHOICES.NON_CRITICAL.toLowerCase():
                    alertColor = "warning";
                    alertMsg = "Moderate Issue";
                    break;
                case CLAIM_SEVERITY_CHOICES.COSMETIC.toLowerCase():
                    alertColor = "dark";
                    alertMsg = "Cosmetic Issue";
                    break;
            }
        }


        return (
            <div>
                <Alert color={alertColor}>{alertMsg}<br />{this.props.description}</Alert>
                <ul>
                    <li>Severity: {this.props.severity}</li>
                    <li>Rig: {this.props.rig_id}</li>
                    <li>Description: {this.props.description}</li>
                    <li>Submit Date: {this.props.submit_date}</li>
                    <li>Due Date: {this.props.due_date}</li>
                </ul>
            </div>
        );
    }
}