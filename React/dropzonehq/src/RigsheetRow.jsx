import React from 'react';
import PropTypes from 'prop-types';
import PackButton from './PackButton.jsx';

/*
  A RigsheetRow is a row in a list of rigsheets.

  It has an instructor, a rig number, a planeload,
  and 'packedBy', all of which are set via props.

  See propTypes at bottom for more info.
*/
export default class RigsheetRow extends React.Component {
  render() {
    return (
          <tr>
            <td>{this.props.instructor}</td>
            <td>{this.props.rigNum}</td>
            <td>{this.props.planeLoad}</td>
            <td>{this.props.packedBy}</td>
          </tr>
    );
  }
}

RigsheetRow.propTypes = {
    instructor: PropTypes.string.isRequired, //the instructor name
    rigNum: PropTypes.string.isRequired, //the rig number
    planeLoad: PropTypes.string.isRequired, //the plane load

    //packed by. This may be a PackButton (before packing)
    //or a string (initials of packer after packing)
    /*packedBy: PropTypes.oneOfType([ 
      PropTypes.string,
      PropTypes.instanceOf(PackButton)
    ]).isRequired*/
}