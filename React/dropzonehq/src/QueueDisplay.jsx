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
                    alertMsg = "Moderate Severity Issue";
                    break;
                case CLAIM_SEVERITY_CHOICES.COSMETIC.toLowerCase():
                    alertColor = "dark";
                    alertMsg = "Cosmetic Issue";
                    break;
            }
        }

        return (
            <div>
                <h3>Queue Claim Issue</h3>
                <Alert color={alertColor}>
                    <h4>Rig {this.props.rig_id}: {alertMsg}</h4>
                    <br />
                    <h5>Description:</h5>
                    <p>{this.props.description}</p>
                    <br />
                    <h5>Submit Date: {this.props.submit_date}</h5>
                    <br />
                    <h5>Due Date: {this.props.due_date}</h5>
                </Alert>
            </div>
        );
    }
}