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

        this.fetchTotalTandems(this.props.id);
        this.fetchTandemsWeek(this.props.id);
        this.fetchTandemsMonth(this.props.id);
        this.fetchTandemsYear(this.props.id);
        this.fetchPacksWeek(this.props.id);
        this.fetchPacksMonth(this.props.id);
        this.fetchPacksYear(this.props.id);
    }

    toggle() {
        
    }

    //Method call to retrieve statistics, store them in the state, and call fetchRows()
    fetchTotalTandems(id) {
        
        //save 'this' so we can reference it in callback
        var self = this;
        var endpoint = "stats/total_tandem_count/" + id;
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
        var endpoint = "stats/yearly_jump_count/" + id;
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
        var endpoint = "stats/monthly_jump_count/" + id;
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
        var endpoint = "stats/weekly_jump_count/" + id;
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
        var endpoint = "stats/yearly_pack_count/" + id;
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
        var endpoint = "stats/monthly_pack_count/" + id;
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
        var endpoint = "stats/weekly_pack_count/" + id;
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
                            tandemJumpsWeek={this.weekly_jump_count}
                            tandemJumpsMonth={this.monthly_jump_count}
                            tandemJumpsYear={this.yearly_tandem_count} />

                        <PackingStatDisplay
                            tandemPackedWeek={this.weekly_pack_count}
                            tandemPackedMonth={this.monthly_pack_count}
                            tandemPackedYear={this.yearly_pack_count} />
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
