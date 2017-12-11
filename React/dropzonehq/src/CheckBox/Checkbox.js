import React, { PropTypes } from 'react';
import {Label, Input } from 'reactstrap';
import './clearCheckbox.css';

export default class Checkbox extends React.Component {


    constructor(props) {
        super(props)

        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);

        this.state = {
            isChecked: this.props.isChecked
        }
    }

    toggleCheckboxChange(){
        this.setState({isChecked: !this.state.isChecked});
        console.log(this.props.label);
        this.props.updateCheckBoxArray(this.props.label);
    }

  render() {
    return (
        <label styles={{margin: "10px"}} className="form-check-label">
          <Input type="checkbox"
                 value={this.props.label}
                 checked={this.state.isChecked}
                 onChange={this.toggleCheckboxChange}
                 index={this.props.index}/>
            {this.props.label}
        </label>
    );
  }
}

Checkbox.propTypes = {
  //label: PropTypes.string.isRequired
};