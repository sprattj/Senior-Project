import React from 'react';

/*
  A DropdownOption is an option in a dropdown list.
  Its text can be set with props. This wrapper was
  made for clarity and to allow the use of the React 'key' prop.
*/
export default class DropdownOption extends React.Component {
  render() {
    return (
      <option>{this.props.optionText}</option>
    );
  }
}