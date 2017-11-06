import React from 'react';
import AlertList from './AlertList.jsx';
import AlertBox from './AlertBox.jsx';

/*
    A SignoutAlertList is a list of rig/equipment alerts that
    appears on the tandem&student rigsheets screen.
*/
export default class SignoutAlertList extends React.Component {

    getAlerts() {
        
        var alertData = [{severity: "danger",message:"Rig S9 has a tear on its container"},
        {severity: "danger",message:"Rig S4 has a tear on its container"},
        {severity: "warning",message:"Rig S1 has this warning listed for it. Uh oh!"}];//get row data from ajax
        var alerts = []; //
    
        Object.keys(alertData).forEach(function (i) {
          var nextAlert = <AlertBox
            key={i}
            alertColor={alertData[i].severity}
            message={alertData[i].message} />
          alerts.push(nextAlert);
        });
        return alerts;
      }

    render() {
        var alerts = this.getAlerts();
        return (
            <AlertList headerText="Rig Alerts">
                    {alerts}
            </AlertList>
        );
    }
}