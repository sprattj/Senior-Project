import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from './ItemTable.jsx';
import RentalDisplayRig from '../ItemDisplays/RentalDisplayRig.jsx';
import RentalDisplayCanopy from '../ItemDisplays/RentalDisplayCanopy.jsx';
import RentalDisplayContainer from '../ItemDisplays/RentalDisplayContainer.jsx';
import ReturnButton from '../Buttons/ReturnButton.jsx';
import RentButton from '../ModalButtons/RentButton.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import { toast } from 'react-toastify';
import moment from 'moment';
import "react-table/react-table.css";


var display = "";
export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rental-items";

        //method binding-
        this.processRows = this.processRows.bind(this);
        this.getFilteredRows = this.getFilteredRows.bind(this);
        this.sortCanopies = this.sortCanopies.bind(this);
        this.sortRentals = this.sortRentals.bind(this);

        this.filterChanged = this.filterChanged.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.rentItem = this.rentItem.bind(this);
        this.returnItem = this.returnItem.bind(this);
        this.rigSelected = this.rigSelected.bind(this);
        this.canopySelected = this.canopySelected.bind(this);
        this.containerSelected = this.containerSelected.bind(this);
        this.pinChanged = this.pinChanged.bind(this);
        //method binding end-

        //variable arrays--
        this.all = [];              //all items in the db
        this.rentals = [];          //all rentable items
        this.activeRentals = []     //all current rental records

        this.rigs = [];             //all rigs in the db
        this.rentalRigs = [];       //all rentable rigs        
        //rigsInfo will hold the data from the rig_component_details view
        this.rigsInfo = [
            { rig_id: 1, main_canopy_size: "170", main_canopy_brand: "Saber2", reserve_canopy_size: "150", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 2, main_canopy_size: "220", main_canopy_brand: "Pilot", reserve_canopy_size: "190", reserve_canopy_brand: "PD", container_brand: "Mirage", aad_lifespan: "Forever" },
            { rig_id: 3, main_canopy_size: "190", main_canopy_brand: "Navigator", reserve_canopy_size: "170", reserve_canopy_brand: "PD", container_brand: "Mirage", aad_lifespan: "Forever" },
            { rig_id: 4, main_canopy_size: "240", main_canopy_brand: "Pilot", reserve_canopy_size: "190", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 5, main_canopy_size: "210", main_canopy_brand: "Navigator", reserve_canopy_size: "150", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 6, main_canopy_size: "170", main_canopy_brand: "Navigator", reserve_canopy_size: "150", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 7, main_canopy_size: "150", main_canopy_brand: "Navigator", reserve_canopy_size: "150", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 8, main_canopy_size: "190", main_canopy_brand: "Navigator", reserve_canopy_size: "150", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 9, main_canopy_size: "170", main_canopy_brand: "Saber2", reserve_canopy_size: "150", reserve_canopy_brand: "PD", container_brand: "Javelin", aad_lifespan: "Forever" },
            { rig_id: 10, main_canopy_size: "190", main_canopy_brand: "Saber2", reserve_canopy_size: "170", reserve_canopy_brand: "PD", container_brand: "Mirage", aad_lifespan: "Forever" },
        ];

        this.canopies = [];         //all canopies in the db
        this.rentalCanopies = [];   //all rentable canopies        
        this.mains = [];            //all main canopies
        this.reserves = [];         //all reserve canopies


        this.containers = [];       //all containers in the db
        this.rentalContainers = []; //all rentable containers

        this.aads = [];             //all aads in the db

        //variable arrays end--

        this.currentMainSize;   //all currentX variables should be updated when a rig is selected
        this.currentMainBrand;
        this.currentReserveSize;
        this.currentReserveBrand;
        this.currentContainerBrand;
        this.currentAAD;

        //column variables---
        this.columnsAll = [{
            Header: 'Item Number',
            accessor: 'item_id', // String-based value accessors!
            width: 150
        }, {
            Header: 'Item Description',
            accessor: 'description',
            width: 400
        }];

        this.columnsRigs = [{
            Header: 'Main',
            accessor: 'main_canopy_brand',
            width: 150
        }, {
            Header: 'Main Size',
            accessor: 'main_canopy_size',
            width: 150
        }, {
            Header: 'Container',
            accessor: 'container_brand',
            width: 250
        }];

        this.columnsCanopies = [{
            Header: 'Canopy Brand',
            accessor: 'brand',
            width: 150
        }, {
            Header: 'Canopy Size',
            accessor: 'size',
            width: 150
        }, {
            Header: 'Canopy Description',
            accessor: 'description',
            width: 250
        }];

        this.columnsContainers = [{
            Header: 'Container Brand',
            accessor: 'brand',
            width: 150
        }, {
            Header: 'Container Description',
            accessor: 'description',
            width: 400
        }];
        //column variables end---

        //REAL DATA RESPONSES
        //item_id: (int), manufacturer: (string), brand: (string), description: (string), is_rentable: (0 or 1 boolean), item_type: (string), rig_number: (int), aad: (int), container: (int), isTandem: (0 or 1 boolean), canopy_on_rig: (0 or 1 boolean), 
        //jump_count: (int), date_of_manufacture: (dateTime), size: (int), canopy_sn: (string),
        //next_repack_date: (dateTime), packed_by_employee_id: (int), ride_count: (int),
        //container_sn: (string),
        //deployment_timestamp: (timeStamp), aad_sn: (string), lifespan: (string)

        //Test Data to fill the table until we connect to the DB
        //rigs start at 0, canopies start at 1000, containers start at 5000, aad start at 7000
        var rowData = [
            //Rigs
            { index: 0, item_id: 0, description: "Blue and White Saber2 170. Pink and Blue Javelin", is_rentable: 1, is_available: 0, renterName: "Frank", item_type: "rig", rig_number: 1, aad: 7000, container: 5000, isTandem: 0, canopy_on_rig: 1 },
            { index: 1, item_id: 1, description: "Red and Green Pilot 220. Black and Yellow Mirage", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 2, aad: 7001, container: 5001, isTandem: 0, canopy_on_rig: 1 },
            { index: 2, item_id: 2, description: "Brown Navigator 190. Black and White Mirage", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 3, aad: 7002, container: 5002, isTandem: 0, canopy_on_rig: 1 },
            { index: 3, item_id: 3, description: "Old Yellow and Gray Pilot 240. Brown and Black Javelin", is_rentable: 1, is_available: 0, renterName: "Sam", item_type: "rig", rig_number: 4, aad: 7003, container: 5003, isTandem: 0, canopy_on_rig: 1 },
            { index: 4, item_id: 4, description: "Green, Orange, White Navigator 210 fater lines. Brown and Black Javelin", is_rentable: 1, is_available: 0, renterName: "Sue", item_type: "rig", rig_number: 5, aad: 7004, container: 5004, isTandem: 0, canopy_on_rig: 1 },
            { index: 5, item_id: 5, description: "Green, Orange, White Navigator 170. Brown and Black Javelin", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 6, aad: 7005, container: 5005, isTandem: 0, canopy_on_rig: 1 },
            { index: 6, item_id: 6, description: "Green, Orange, White Navigator 150. Brown and Black Javelin", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 7, aad: 7006, container: 5006, isTandem: 0, canopy_on_rig: 1 },
            { index: 7, item_id: 7, description: "Green, Yellow, Purple Navigator 190. Brown and Black Javelin", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 8, aad: 7007, container: 5007, isTandem: 0, canopy_on_rig: 1 },
            { index: 8, item_id: 8, description: "Black Main in Black Javelin", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 9, aad: 7008, container: 5008, isTandem: 0, canopy_on_rig: 1 },
            { index: 9, item_id: 9, description: "Red, White, Yellow Saber2 170. Red Javelin", is_rentable: 1, is_available: 0, renterName: "Ralph", item_type: "rig", rig_number: 10, aad: 709, container: 5009, isTandem: 0, canopy_on_rig: 1 },
            { index: 10, item_id: 10, description: "Blue and Black Main. Blue and Black Mirage", is_rentable: 1, is_available: 1, renterName: "", item_type: "rig", rig_number: 11, aad: 7010, container: 5010, isTandem: 0, canopy_on_rig: 1 },
            { index: 11, item_id: 11, description: "MicroSigma", is_rentable: 0, is_available: 0, renterName: null, item_type: "rig", rig_number: 12, aad: 7011, container: 5011, isTandem: 0, canopy_on_rig: 1 },

            //Mains
            { index: 1000, item_id: 1000, description: "Blue and White Saber2 170", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 150, date_of_manufacture: "dateTime", size: "170", brand: "Saber2" },
            { index: 1001, item_id: 1001, description: "Red and Green Pilot 220", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 116, date_of_manufacture: "dateTime", size: "220", brand: "Pilot" },
            { index: 1002, item_id: 1002, description: "Brown Navigator 190", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 60, date_of_manufacture: "dateTime", size: "190", brand: "Navigator" },
            { index: 1003, item_id: 1003, description: "Old Yellow and Gray Pilot 240", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 8000, date_of_manufacture: "dateTime", size: "240", brand: "Pilot" },
            { index: 1004, item_id: 1004, description: "Green, Orange, White Navigator 210", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "210", brand: "Navigator" },
            { index: 1005, item_id: 1005, description: "Green, Orange, White Navigator 170", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 153, date_of_manufacture: "dateTime", size: "170", brand: "Navigator" },
            { index: 1006, item_id: 1006, description: "Green, Orange, White Navigator 150", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 120, date_of_manufacture: "dateTime", size: "150", brand: "Navigator" },
            { index: 1007, item_id: 1007, description: "Green, Yellow, Purple Navigator 190", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "190", brand: "Navigator" },
            { index: 1008, item_id: 1008, description: "Black Main in Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "170", brand: "Saber2" },
            { index: 1019, item_id: 1019, description: "Red, White, Yellow Saber2 170", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "170", brand: "Saber2" },
            { index: 1010, item_id: 1010, description: "Blue and Black", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 107, date_of_manufacture: "dateTime", size: "170", brand: "Saber2" },
            { index: 1011, item_id: 1011, description: "Red, White, Blue Sigma", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 110, date_of_manufacture: "dateTime", size: "170", brand: "Saber2" },

            { index: 1012, item_id: 1012, description: "Green and Brown Navigator 210", is_rentable: 1, is_available: 1, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 110, date_of_manufacture: "dateTime", size: "210", brand: "Navigator" },

            //Reserves
            { index: 3000, item_id: 3000, description: "White Reserve 01", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 150, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3001, item_id: 3001, description: "White Reserve 02", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 116, date_of_manufacture: "dateTime", size: "190", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 1 },
            { index: 3002, item_id: 3002, description: "White Reserve 03", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 60, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3003, item_id: 3003, description: "White Reserve 04", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 8000, date_of_manufacture: "dateTime", size: "190", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 2 },
            { index: 3004, item_id: 3004, description: "White Reserve 05", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "170", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3005, item_id: 3005, description: "White Reserve 06", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 153, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3006, item_id: 3006, description: "White Reserve 07", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 120, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 4 },
            { index: 3007, item_id: 3007, description: "White Reserve 08", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3008, item_id: 3008, description: "White Reserve 09", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3019, item_id: 3019, description: "White Reserve 10", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 100, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 7 },
            { index: 3010, item_id: 3010, description: "White Reserve 11", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 107, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },
            { index: 3011, item_id: 3011, description: "White Reserve 12", is_rentable: 0, is_available: 0, renterName: "", item_type: "canopy", rig_number: null, aad: null, container: null, isTandem: null, canopy_on_rig: null, jump_count: 110, date_of_manufacture: "dateTime", size: "150", brand: "Pilot", next_repack_date: "dateTime", packed_by_employee_id: 1, ride_count: 0 },

            //Containers
            { index: 5000, item_id: 5000, description: "Pink and Blue Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont001" },
            { index: 5001, item_id: 5001, description: "Black and Yellow Mirage", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont002" },
            { index: 5002, item_id: 5002, description: "Brown and Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont003" },
            { index: 5003, item_id: 5003, description: "Brown and Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont004" },
            { index: 5004, item_id: 5004, description: "Brown and Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont001" },
            { index: 5005, item_id: 5005, description: "Brown and Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont002" },
            { index: 5006, item_id: 5006, description: "Brown and Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont003" },
            { index: 5007, item_id: 5007, description: "Brown and Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont004" },
            { index: 5008, item_id: 5008, description: "Black Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont001" },
            { index: 5019, item_id: 5019, description: "Red Javelin", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont002" },
            { index: 5010, item_id: 5010, description: "Blue and Black Mirage", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont003" },
            { index: 5011, item_id: 5011, description: "Rainbow Flap Sigma", is_rentable: 0, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont004" },

            { index: 5012, item_id: 5012, description: "Rainbow Javelin", is_rentable: 1, is_available: 0, renterName: "", item_type: "container", brand: "Mirage", container_sn: "cont004" },


            //AADs
            { index: 7000, item_id: 7000, description: "aad 01", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7001, item_id: 7001, description: "aad 02", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7002, item_id: 7002, description: "aad 03", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7003, item_id: 7003, description: "aad 04", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7004, item_id: 7004, description: "aad 05", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7005, item_id: 7005, description: "aad 06", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7006, item_id: 7006, description: "aad 07", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7007, item_id: 7007, description: "aad 08", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7008, item_id: 7008, description: "aad 09", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7019, item_id: 7019, description: "aad 10", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7010, item_id: 7010, description: "aad 11", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
            { index: 7011, item_id: 7011, description: "aad 12", is_rentable: 0, is_available: 0, renterName: "", item_type: "aad", deployment_timestamp: "timeStamp", aad_sn: "aad001", lifespan: "forever!" },
        ];

        // this.getFilteredRows(rowData);  //FILTER THE ROWS BEFORE YOU SET THE STATES 
        this.state = {
            filter: "all",
            columns: this.columnsAll,
            rows: this.rentals,
            index: 0,
            pin: ''
        };

    }//constructor end

    //Takes the whole set of data given from db call and split it into the types so the split doesnt
    //need to take place more than once after each db call not when filter is selected
    getFilteredRows(rowData) {
        this.all = rowData;                                  //save everything first
        for (var i = 0; i < rowData.length; i++) {      //if the type is rig
            if (rowData[i].item_type === "rig") {
                this.rigs.push(rowData[i]);
            } else if (rowData[i].item_type === "canopy") {  //if the type is canopy
                this.canopies.push(rowData[i]);
            } else if (rowData[i].item_type === "container") { //if the type is container
                this.containers.push(rowData[i]);
            } else if (rowData[i].item_type === "aad") {
                this.aads.push(rowData[i]);
            }
        }
        this.sortRentals(this.all);                      //set the rental arrays
        this.sortCanopies(this.canopies);                //sort mains from reserves

    }

    //sorts any rows by thier "item_type" into the rentalX array of that item_type
    sortRentals(rowData) {
        for (var i = 0; i < rowData.length; i++) {
            if (rowData[i].is_rentable) {            //if its rentable
                this.rentals.push(rowData[i]);      //add it to the rentals list
            }

            switch (rowData[i].item_type) {         //then each rental list type gets checked
                case "rig":
                    rowData[i].is_rentable && rowData[i].canopy_on_rig ? this.rentalRigs.push(rowData[i]) : "";
                    break;

                case "canopy":
                    rowData[i].is_rentable ? this.rentalCanopies.push(rowData[i]) : "";
                    break;

                case "container":
                    rowData[i].is_rentable ? this.rentalContainers.push(rowData[i]) : "";
                    break;
            }
        }
    }

    //sorts the main and reserve canopies into their respective arrays
    sortCanopies(rowData) {
        for (var i = 0; i < rowData.length; i++) {
            if (rowData.ride_count) {   //if this slot isnt null its a reserve
                this.reserves.push(rowData[i]);
            } else {                        //otherwise its a main
                this.mains.push(rowData[i]);
            }
        }
    }

    //When a selection is made on FilterDropdown this function should be called to change the values on the RentalTable 
    filterChanged(selection) {
        switch (selection) {
            case "Show All":
                this.setState({ filter: "all", rows: this.rentals, columns: this.columnsAll });
                break;
            case "Rigs Only":
                this.setState({ filter: "rig", rows: this.rigsInfo, columns: this.columnsRigs });
                break;
            case "Canopies Only":
                this.setState({ filter: "canopy", rows: this.rentalCanopies, columns: this.columnsCanopies });
                break;
            case "Containers Only":
                this.setState({ filter: "container", rows: this.rentalContainers, columns: this.columnsContainers });
                break;
            default:
                this.setState({ filter: "all", rows: this.rentals, columns: this.columnsAll });
                break;
        }
        //reset colors in the TABLE-----------------------------------------------------
        this.props.resetDisplay();
    }

    //calls up to the screen change the display on the right
    itemSelected(selectedIndex) {
        if (this.filter === "rigs") {

        }

        var row = this.state.rows[selectedIndex];   //use the selectedIndex to find the row in the rows state
        var rentalButton;                           //variable Rent or Return button shows if Available or Rented         

        if (!row.is_available) {     //if the item is rented set the rentalButton var to Return
            rentalButton = <ReturnButton pinChanged={this.pinChanged} buttonText={"Return"} return={this.returnItem} index={selectedIndex} item_id={row.item_id} />;
        } else {                //if the item isnt rented set the rentalButton var to Rent
            rentalButton = <RentButton pinChanged={this.pinChanged} buttonText={"Rent"} rent={this.rentItem} index={selectedIndex} item_id={row.item_id} />;
        }

        //select the type of Rental Item Display will be shown based on the selected item's .item_type
        switch (row.item_type) {
            case ("rig"):
                this.rigSelected(row, rentalButton);
                break;

            case ("canopy"):
                this.canopySelected(row, rentalButton);
                break;

            case ("container"):
                this.containerSelected(row, rentalButton);
                break;
        }
        this.props.displayChange(display, row.index);          //pass it up thru props method call
    }

    //Rigs should display main_canopy_brand, main_canopy_size, reserve_canopy_brand, reserve_canopy_size, containerBrand, aadExpirationDate, description
    rigSelected(row, rentalButton) {
        for (var i = 0; i < this.rigsInfo.length; i++) {        //loop thru the rigsInfo fetched
            if (this.rigsInfo[i].rig_id === row.rig_number) {   //if the rig_number on the selected row matches the rig_id of the list set the variables
                this.currentMainSize = this.rigsInfo[i].main_canopy_size;
                this.currentMainBrand = this.rigsInfo[i].main_canopy_brand;
                this.currentReserveSize = this.rigsInfo[i].reserve_canopy_size;
                this.currentReserveBrand = this.rigsInfo[i].reserve_canopy_brand;
                this.currentContainerBrand = this.rigsInfo[i].container_brand;
                this.currentAAD = this.rigsInfo[i].aad_lifespan;
            }
        }

        display = <RentalDisplayRig
            item_id={row.item_id}
            is_available={row.is_available}
            description={row.description}

            renterName={row.renterName}

            main_canopy_brand={this.currentMainBrand}
            main_canopy_size={this.currentMainSize}
            reserve_canopy_brand={this.currentReserveBrand}
            reserve_canopy_size={this.currentReserveSize}
            container_brand={this.currentContainerBrand}
            aad_lifespan={this.currentAAD}

            button={rentalButton}
        />;
    }

    canopySelected(row, rentalButton) {
        display = <RentalDisplayCanopy
            item_id={row.item_id}
            is_available={row.is_available}
            description={row.description}

            renterName={row.renterName}
            brand={row.brand}
            size={row.size}

            button={rentalButton}
        />;
    }

    containerSelected(row, rentalButton) {
        display = <RentalDisplayContainer
            item_id={row.item_id}
            is_available={row.is_available}
            description={row.description}

            renterName={row.renterName}
            brand={row.brand}

            button={rentalButton}
        />;
    }

    rentItem(index, renterName, item_id) {
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/rentals/";

        var self = this;
        var requestVariables = {
            pin: '222222',
            item_id: item_id,
            renter_name: renterName
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
                    throw new Error("Rent Item Failed. Bad response " + response.status + " from server");
                }
                return response.json();
            })//when the call succeeds
            .then(function (responseData) {
                for (var i = 0; i < self.all.length; i++) {
                    if (index === self.all[i].index && !self.all[i].is_available) {
                        self.all[i].is_available = 0;
                        self.all[i].renterName = renterName;
                    }
                }
                console.log("RentalTable: rentItem Function");
                self.getFilteredRows(self.all);

            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });
    }

    returnItem(index, rental_id) {

        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + this.URLsection + "/" + rental_id;

        var self = this;
        var requestVariables = {
            pin: '222222',
            returned_date: moment()
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
                    throw new Error("Rent Item Failed. Bad response " + response.status + " from server");
                }
                return response.json();
            })//when the call succeeds
            .then(function (responseData) {
                console.log("RentalTable: returnItem Function: index passed in: " + index);
                for (var i = 0; i < self.all.length; i++) {
                    if (index === self.all[i].index && !self.all[i].is_available) {
                        self.all[i].is_available = 1;
                        self.all[i].renterName = "";
                    }
                }
                this.getFilteredRows(this.all);
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });
    }

    pinChanged(id, pin) {
        this.setState({
            pin: pin
        })
        console.log(this.state.pin);
    }

    //Fetching-------------------------------

    //When this RentalTable component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchRows();
        this.fetchRigInfo();
    }

    //Fetch the info from the database of everything
    //attached to all rigs
    //TODO change URL to correct end point for RigInfo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    fetchRigInfo() {

        //make sure we have the packages required to
        //make a fetch call (maybe not needed)
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        //Define our endpoint using the rootURL, the URL section 
        //that we set in our constructor (like "/rigsheets"), and
        //the sheetType prop ("Tandems" or "Students")
        //(rootURL is imported from our rest info file)
        var url = rootURL + "/rig_info";

        //save 'this' so that we can call functions
        //inside the fetch() callback-------------
        var self = this;

        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (response) {
                self.rigsInfo.push(response);    //set the array for the rigInfo view to be the result
                console.log("successful rigInfo fetch");
            })//catch any errors and display them as a toast
            .catch(function (error) {
                toast.error(error + "\n" + url);
            });
    }

    //Fetch the items from the database that are 
    //rentals and update the RentalTable's state to display them.
    fetchRows() {

        //make sure we have the packages required to
        //make a fetch call (maybe not needed)
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        //Define our endpoint using the rootURL, the URL section 
        //that we set in our constructor (like "/rigsheets"), and
        //the sheetType prop ("Tandems" or "Students")
        //(rootURL is imported from our rest info file)
        var url = rootURL + this.URLsection;

        //save 'this' so that we can call functions
        //inside the fetch() callback
        var self = this;

        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (rowData) {
                //process the row data we received back
                self.fetchActiveRentals(self);
            });
    }

    fetchActiveRentals(self) {
        var url = rootURL + "/rentals/active";
        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (rowData) {
                self.addRentalData(rowData);
            });
    }

    addRentalData(rentalData) {
        var count = 0;
        while (count < rentalData.length) {
            var allCount = 0;
            var activeV = rentalData[count].item_id;
            while (this.all[allCount].item_id <= activeV) {
                allCount++;
                if (this.all[allCount].item_id === activeV) {
                    this.all[allCount].renter_name = rentalData[count].renter_name;
                    this.all[allCount].rental_id = rentalData[count].rental_id;
                    count++;
                    activeV = rentalData[count];
                }
            }
        }

        /* //Longest way possible
        for (var i = 0; i < this.all.length; i++) {
            for (var j = 0; j < rentalData; j++) {
                if (this.all[i].item_id === rentalData[j].item_id) {
                    this.all[i].push(rentalData[j]);
                }
            }
        }*/
    }

    //Fetching end----------------------------

    //every time this is called it should redo 
    //the entire sorting section to keep things up to date 
    processRows(rowData) {
        this.getFilteredRows(rowData);
        this.setState({
            filter: "all",
            columns: this.columnsAll,
            rows: this.rentals
        })
    }

    render() {
        var filterDropdown = <FilterDropdown
            onChange={this.filterChanged}
            labelText="Rental Item Filters:"
            id="RentalFilterDropdown"
        />
        return (
            <div>
                <Row>
                    <Col>
                        <ItemTable
                            columns={this.state.columns}
                            rows={this.state.rows}
                            top={filterDropdown}
                            bottom={""}
                            itemSelected={this.itemSelected}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

}//class end