import React from 'react';
import TextArea from './TextInputs/TextArea.jsx';

export default class WarningDisplay extends React.Component {

    render(){

        return(
            <div>
            <ul>
                <li>Rig:</li>
                <li>Reported by:</li>
                <li><TextArea id="warningDisplayTextArea" labelText="Problem:"/></li>
            </ul>
            </div>
        );
    }
}