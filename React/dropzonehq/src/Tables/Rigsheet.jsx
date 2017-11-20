import React from 'react';
import PropTypes from 'prop-types';
import TableSheet from './TableSheet.jsx';
import PackButton from '../ModalButtons/PackButton.jsx';
import SignoutButton from '../ModalButtons/SignoutButton.jsx';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';


/* 
  A Rigsheet contains all signouts for one rig type.
*/
export default class Rigsheet extends React.Component {

  constructor(props) {
    super(props);
    //since the URL section is not directly related to rendering,
    //it shouldn't be part of state. Save it in a class variable.
    this.URLsection = "/rigsheets/";

    //Bind all methods that are passed down so that they can
    //be called via this.methodName in child components
    this.pinChanged = this.pinChanged.bind(this);
    this.packRow = this.packRow.bind(this);
    this.addSignout = this.addSignout.bind(this);

    //BEGIN SAMPLE DATA. WHEN RUNNING FROM SERVER, DELETE THIS AND CHANGE THIS.STATE={...}
    //TO HAVE rows: this.fetchRows() IN PLACE OF rows: rowData
    var rowData = [
      { jumpmaster_id: "111", jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by_id: null, packed_by: null },
      { jumpmaster_id: "222", jumpmaster: "Paul B", rig_id: "S9", load_number: "111", packed_by_id: "333", packed_by: "Brian K" }
    ];

    this.addPackButtons(rowData);
    //END SAMPLE DATA.

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
      rows: rowData,
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
          sheetType={this.props.sheetType}/>;
    };
  }

  //This is the function passed down to the password component
  //that's inside the PackButton's verify modal.
  //when the password is changed, update our state
  pinChanged(id, pin) {
    this.setState({
      pin: pin
    })
    //console.log(this.state.pin);
  }

  //When this rigsheet component loads on the page, fetch the rows
  //from the database and display them.
  componentDidMount() {
    this.fetchRows();
  }

  //Fetch the tandem signouts from the database and 
  //update this rigsheet's state to display them.
  fetchRows() {

    //make sure we have the packages required to
    //make a fetch call (maybe not needed)
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    //Define our endpoint using the rootURL, the URL section 
    //that we set in our constructor (like "/rigsheets"), and
    //the sheetType prop ("Tandems" or "Students")
    //(rootURL is imported from our rest info file)
    var url = rootURL + this.URLsection + this.props.sheetType;

    //save 'this' so we can reference it inside fetch() callback
    var self = this;

    //fetch from the specified URL
    //Enable CORS so we can access from localhost.
    fetch(url, {
      method: "GET",
      mode: 'CORS'
    })//when we get a response back
      .then(function (response) {
        //check to see if the call we made failed
        //if it failed, throw an error and stop.
        if (response.status >= 400) {
          //throw new Error("Bad response from server");
          throw new Error("Fetching rows failed. Bad response " + response.status + " from server");
        }
        //if it didn't fail, process the data we got back
        //into JSON format
        return response.json();
      })//when the call succeeds
      .then(function (responseData) {
        //process the row data we received back
        self.addPackButtons(responseData);
        //update our state with these rows to rerender the table
        self.setState({
          rows: responseData
        });
      })//catch any errors and display them as a toast
      .catch(function (error) {
        toast.error(error + "\n" + url);
      });
  }

  //Packs a row in the table.
  //This is the function that is called when you click a 
  //PackButton in a row. It replaces the button with a name.
  packRow(signout_id, index) {
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    console.log(signout_id);
    var url = rootURL + this.URLsection + this.props.sheetType + "/" + signout_id;

    var self = this;
    var requestVariables = {
      pin: this.state.pin
    };

    fetch(url, {
      method: "PATCH",
      mode: 'CORS',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestVariables)
    })//when we get a response back
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Packing row failed. Bad response " + response.status + " from server");
        }
        return response.json();
      })//when the call succeeds
      .then(function (responseData) {
        //grab the current rows
        var newRows = Array.from(self.state.rows);
        //replace the pack button of this signout
        //with the name of the packer who packed it
        newRows[index].packed_by = responseData.packed_by;

        //update the state with the new rows so it rerenders
        self.setState({
          rows: newRows,
          pin: ''
        });

      })//catch any errors and display them as a toast
      .catch(function (error) {
        toast.error(error + "\n" + url);
      });
  }

  //Add a signout to the tandemrigsheet.
  //This is passed down to the authorize button inside
  //of the modal that the SignoutButton creates.
  addSignout(planeLoad, rig_id) {

    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    var url = rootURL + this.URLsection + this.props.sheetType;

    var self = this;
    var requestVariables = {
      pin: this.state.pin,
      rig_id: rig_id,
      load_number: planeLoad,
      packed_by: null
    };

    fetch(url, {
      method: "POST",
      mode: 'CORS',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestVariables)
    })//when we get a response back
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Adding signout failed. Bad response " + response.status + " from server.");
        }
        return response.json();
      })//when the call succeeds
      .then(function (responseData) {
        //create a new row for the table
        var row = {
          jumpmaster: responseData.jumpmaster,
          rig_id: responseData.rig_id,
          load_number: responseData.load_number,
          //A new signout hasn't been packed yet,
          //so give it a PackButton instead
          packed_by: <PackButton 
            signout_id={responseData.signout_id} //make this get the signout ID from the response back
            rig={responseData.rig_id}
            instructor={responseData.jumpmaster}
            load={responseData.load_number}
            pinChanged={self.pinChanged}
            authorize={self.packRow}
            index={self.state.rows.length}
            sheetType={self.props.sheetType}/>
        };
        //grab the current rows
        var newRows = Array.from(self.state.rows);
        //add our new row
        newRows.push(row);
        //update the state with the new rows so it rerenders
        self.setState({
          rows: newRows
        })
      }).catch(function (error) {
        toast.error(error + "\n" + url);
      });
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
  sheetType: PropTypes.string.isRequired, //the text in the header of the rigsheet
  //children: PropTypes.arrayOf(RigsheetRow).isRequired //an array of rigsheet rows
}