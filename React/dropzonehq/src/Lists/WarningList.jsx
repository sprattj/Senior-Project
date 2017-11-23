import React from 'react';
import LoftList from './LoftList.jsx';
import RigProblemButton from '../ModalButtons/RigProblemButton.jsx';


export default class WarningList extends React.Component {

    render() {
        var footerContent = <RigProblemButton pinChanged={this.props.pinChanged} verify={this.props.addWarning}/>;
        return (
            <LoftList headerText="Warnings" footerContent={footerContent}>
                {this.props.children}
            </LoftList>
        );
    }
}