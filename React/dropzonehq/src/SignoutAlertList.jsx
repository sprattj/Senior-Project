import React from 'react';
import AlertList from './AlertList.jsx';
import AlertBox from './AlertBox.jsx';

export default class SignoutAlertList extends React.Component {
    render() {
        return (
            <AlertList headerText="Rig Alerts">
                    <AlertBox alertColor="danger" message="Rig S9 has a tear on its container."/>
                    <AlertBox alertColor="danger" message="Rig S4 has an expired AAD."/>
                    <AlertBox alertColor="warning" message="Rig S0 has cosmetic damage."/>
            </AlertList>
        );
    }
}