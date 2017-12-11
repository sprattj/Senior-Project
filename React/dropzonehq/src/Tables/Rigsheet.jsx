import React from 'react';
import PropTypes from 'prop-types';
import TableSheet from './TableSheet.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';
import RequestHandler from '../RequestHandler.js';
import Binder from '../Binder.js';

/* 
  A Rigsheet contains all signouts for one rig type.
*/
export default class Rigsheet extends React.Component {

  constructor(props) {
    super(props);
    //since the URL section is not directly related to rendering,
    //it shouldn't be part of state. Save it in a class variable.
    this.URLsection = "rigsheets/";

    //create a new binder and bind all of the methods in this class
    var binder = new Binder();
    binder.bindAll(this, Rigsheet);

    //The TandemRigsheet state keeps track of the table columns,
    //the table rows, and the username/password entered when verifying
    //an action.
    this.state = {
      columns: [{
        Header: 'Instructor',
        accessor: 'jumpmaster'
      }, {
        Header: 'Rig ID',
        accessor: 'rig_id',
      }, {
        Header: 'Plane Load',
        accessor: 'load_number'
      }, {
        Header: 'Packed By',
        accessor: 'packed_by'
      }],
      rows: [],
      pin: ''
    };
  }

  //Process the rows that are passed in to fill in the missing 
  //"Packed By" data with a PackButton
  addPackButtons(rowData) {
    for (var i = 0; i < rowData.length; i++) {
      if (rowData[i].packed_by === null)
        rowData[i].packed_by = <PackButton
          signout_id={rowData[i].signout_id}
          rig={rowData[i].rig_id}
          instructor={rowData[i].jumpmaster}
          load={rowData[i].load_number}
          pinChanged={this.pinChanged}
          authorize={this.packRow}
          index={i}
          sheetType={this.props.sheetType} />;
    };
  }

  //This is the function passed down to the password component
  //that's inside the PackButton's verify modal.
  //when the password is changed, update our state
  pinChanged(id, pin) {
    this.setState({
      pin: pin
    })
  }

  //When this rigsheet component loads on the page, fetch the rows
  //from the database and display them.
  componentDidMount() {
    this.fetchRows();
  }

  //Fetch the tandem signouts from the database and 
  //update this rigsheet's state to display them.
  fetchRows() {

    //endpoint: "rigsheets/tandem" or "rigsheets/student"
    var endpoint = this.URLsection + this.props.sheetType;

    //save 'this' so we can reference it in callback
    var self = this;
    var successMsg = "Fetched data for " + this.props.sheetType + " rigs.";
    var errorMsg = "Problem fetching " + this.props.sheetType + " rig data.";
    var callback = function (responseData) {
      //process the row data we received back
      self.addPackButtons(responseData);
      //update our state with these rows to rerender the table
      self.setState({
        rows: responseData
      });
    };

    var handler = new RequestHandler();
    handler.get(endpoint, successMsg, errorMsg, callback);
  }

  //Packs a row in the table.
  //This is the function that is called when you click a 
  //PackButton in a row. It replaces the button with a name.
  packRow(signout_id, index) {

    var endpoint = this.URLsection + this.props.sheetType + "/" + signout_id;
    var successMsg = "Recorded packing of signout " + signout_id + ".";
    var errorMsg = "Problem recording packing of signout " + signout_id + ".";
    var self = this;
    var variables = {
      pin: this.state.pin
    };

    var callback = function (responseData) {
      //grab the current rows
      var newRows = Array.from(self.state.rows);
      //replace the pack button with the packer's name
      newRows[index].packed_by = responseData.packed_by;
      //update the state with the new rows so it rerenders
      self.setState({
        rows: newRows,
        pin: ''
      });
    };

    var handler = new RequestHandler();
    handler.patch(endpoint, variables, successMsg, errorMsg, callback);
  }

  //Add a signout to the tandemrigsheet.
  //This is passed down to the authorize button inside
  //of the modal that the SignoutButton creates.
  addSignout(planeLoad, rig_id) {

    var endpoint = this.URLsection + this.props.sheetType;
    var self = this;
    var variables = {
      pin: this.state.pin,
      rig_id: rig_id,
      load_number: planeLoad,
      packed_by: null
    };
    var successMsg = "Signout added successfully.";
    var errorMsg = "Problem adding signout.";
    var callback = function (responseData) {
      //create a new row for the table
      var row = {
        jumpmaster: responseData.jumpmaster,
        rig_id: responseData.rig_id,
        load_number: responseData.load_number,
        //New signouts aren't packed, so put a PackButton
        packed_by: <PackButton
          signout_id={responseData.signout_id}
          rig={responseData.rig_id}
          instructor={responseData.jumpmaster}
          load={responseData.load_number}
          pinChanged={self.pinChanged}
          authorize={self.packRow}
          index={self.state.rows.length}
          sheetType={self.props.sheetType} />
      };
      //grab the current rows
      var newRows = Array.from(self.state.rows);
      //then add our new row
      newRows.push(row);
      //and update state with new rows to rerender
      self.setState({
        rows: newRows
      })
    };
    //make the request via handler
    var handler = new RequestHandler();
    handler.post(endpoint, variables, successMsg, errorMsg, callback);
  }

  render() {
    //Return a tablesheet with a signout button footer
    return (
      <TableSheet
        headerText={this.props.title}
        columns={this.state.columns}
        footer={
          <SignoutButton
            sheetType={this.props.sheetType}
            pinChanged={this.pinChanged}
            authorize={this.addSignout} />
        }
      >
        {this.state.rows}
      </TableSheet>);
  }
}

Rigsheet.propTypes = {
  sheetType: PropTypes.string.isRequired, //the type of sheet for endpoints
  title: PropTypes.string //the text in the header of the rigsheet
}

Rigsheet.defaultProps = {
  title: "Signouts"
};