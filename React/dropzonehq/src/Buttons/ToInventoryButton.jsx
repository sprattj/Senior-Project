import React from 'react';
import ToButton from './ToButton.jsx';

export default class ToInventoryButton extends React.Component {


    render() {
        return (
            <ToButton buttonSize={"md"} 
            buttonColor={"primary"} 
            buttonText={"Inventory Screen"}
             />             
        );
    }
}