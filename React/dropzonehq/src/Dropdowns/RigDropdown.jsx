import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';

export default class RigDropdown extends React.Component {

    constructor(props) {
        super(props);

        //bind methods to allow callbacks
        this.createDropdownOptions = this.createDropdownOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            rigData: []
        }
    }

    componentDidMount(){
        //get rig data from server
        this.getRigs();
    }
    //create drowdown options from the given rig data
    createDropdownOptions(rigData) {
        var options = [];
        Object.keys(rigData).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={rigData[i].rig_id} />
            options.push(nextOption);
        });
        return options;
    }

    //get all of the rig data from server
    getRigs() {
    //get row data from ajax
    //make sure we have the packages required to
    //make a fetch call (maybe not needed)
    require('isomorphic-fetch');
    require('es6-promise').polyfill();

    //Define our endpoint using the rootURL, the URL section 
    //(rootURL is imported from our rest info file)
    if(this.props.sheetType){
        var url = rootURL + "/rigs/" + this.props.sheetType + "/available-for-signout";
    }else{
        var url = rootURL + "/rigs/student/available-for-signout"; //TODO redesign this portion
    }
    

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
          throw new Error("Fetching available rigs failed.\nBad response " + response.status + " from server");
        }
        //if it didn't fail, process the data we got back
        //into JSON format
        return response.json();
      })//when the call succeeds
      .then(function (responseData) {
        self.setState({
          rigData: responseData
        });
        self.props.onChange(self.state.rigData[0]);
      })//catch any errors and display them as a toast
      .catch(function (error) {
        toast.error(error + "\n" + url);
        console.log(error);
      });
    }

    //send back the data for the dropdown item that was selected
    handleChange(selectedIndex) {
        this.props.onChange(this.state.rigData[selectedIndex]);
    }

    //render a dropdown and pass it our data converted into dropdownoptions
    render() {
        return (
            <Dropdown onChange={this.handleChange} id={"rigDropdown"} labelText="Rig:">
                {this.createDropdownOptions(this.state.rigData)}
            </Dropdown>
        );
    }
}