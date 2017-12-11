import React from 'react';
import { Form, Card, CardBlock } from 'reactstrap';
import ModalButton from './ModalButton.jsx';
import BioStatDisplay from '../StatDisplays/BioStatDisplay.jsx';
import TandemInstructorStatDisplay from '../StatDisplays/TandemInstructorStatDisplay.jsx';
import AFPInstructorStatDisplay from '../StatDisplays/AFPInstructorStatDisplay.jsx';
import PackingStatDisplay from '../StatDisplays/PackingStatDisplay.jsx';
import RequestHandler from '../RequestHandler.js';
import Binder from '../Binder.js';



export default class StatButton extends React.Component {

    constructor(props) {
        super(props);
        //creater a new binder and bind all of the methods in this class
        var binder = new Binder();
        binder.bindAll(this, StatButton);
        
        this.state = {
            total_tandem_count: 0,
            total_student_count: 0,
            yearly_jump_count: 0,
            monthly_jump_count: 0,
            weekly_jump_count: 0,
            yearly_jump_count: 0,
            monthly_jump_count: 0,
            weekly_jump_count: 0
        }
    }

    toggle() {
        this.props.toggleEmployeeStatus(this.props.id, this.props.status);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchTotalTandems(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/total_tandem_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ total_tandem_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchTandemsYear(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/yearly_jump_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ yearly_jump_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchTandemsMonth(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/monthly_jump_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ monthly_jump_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchTandemsWeek(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/weekly_jump_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ weekly_jump_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchPacksYear(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/yearly_pack_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ yearly_pack_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchPacksMonth(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/monthly_pack_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ monthly_pack_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchPacksWeek(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/weekly_pack_count/" + self.props.id;
        var successMsg = "Fetched employee data.";
        var errorMsg = "Problem fetching employee data.";
        var callback = function (rowData) {
            self.setState({ weekly_pack_count: rowData });
        }

        var handler = new RequestHandler();
        handler.get(endpoint, successMsg, errorMsg, callback);
    }

    /*
    total_tandem_count
    total_student_count
    yearly_jump_count
    monthly_jump_count
    weekly_jump_count
    yearly_pack_count
    monthly_pack_count
    weekly_pack_count
    */

    render() {

        const modalContent =
            <Form>
                <Card>
                    <CardBlock>
                        <BioStatDisplay firstName={this.props.firstName}
                            lastName={this.props.lastName}
                        />

                        <TandemInstructorStatDisplay
                            tandemJumpsToday={this.state.employeeInfo.tandemJumpsToday}
                            tandemJumpsWeek={this.state.employeeInfo.tandemJumpsWeek}
                            tandemJumpsMonth={this.state.employeeInfo.tandemJumpsMonth}
                            tandemJumpsYear={this.state.employeeInfo.tandemJumpsYear} />

                        <PackingStatDisplay
                            tandemPackedToday={this.state.employeeInfo.tandemPackedToday}
                            tandemPackedWeek={this.state.employeeInfo.tandemPackedWeek}
                            tandemPackedMonth={this.state.employeeInfo.tandemPackedMonth}
                            tandemPackedYear={this.state.employeeInfo.tandemPackedYear} />
                    </CardBlock>
                </Card>
            </Form>;

        return (
            <ModalButton
                buttonSize="md"
                buttonColor="primary"
                buttonText="Stats"
                modalTitle="Employee Info"
                modalContent={modalContent}
                modalPrimaryButtonText="Stats"
                modalPrimaryClick={this.toggle}
            />
        );
    }
}
