<template>
    <div>
        <div>
            <div class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Manage <b>Patients</b></h2>
                            </div>
                            <div class="col-sm-6">
                                <a href="#addModalP" @click="generateGUID()" class="btn btn-success" data-toggle="modal">
                                   <i class="material-icons">&#xE147;</i> 
                                   <span>Add New Patient</span>
                                </a>						
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Birthdate</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Medical Record</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRowPatient v-for="(person, index) in persons" 
                                      :key=index 
                                      :person="person"
                                      @patientId="getMedications"
                                      @new-patient="showPatient"
                                      @deletedPerson="deletePerson"></TableRowPatient>
                        </tbody>
                    </table>
                </div>
            </div>        
        </div>
        <!-- Add Modal HTML -->
        <div id="addModalP" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <p style="margin: auto;">{{ guid }}</p>
                </div>
            </div>
        </div>
        <!-- Edit Modal HTML -->
        <div id="editModalP" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.stop.prevent="updatePatient()" method="post">
                        <div class="modal-header">						
                            <h4 class="modal-title">Edit Patient</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label class="myLabel">Email</label>
                                <input type="email" v-model="newPatient.email">
                            </div>
                            <div class="form-group">
                                <label class="myLabel">Name</label>
                                <input type="text" v-model="newPatient.name">
                            </div>

                            <div class="form-group">
                                <label>Birthdate</label>
                                <Datepicker class="datepicker" v-model="newPatient.birthdate"></Datepicker>
                            </div>

                            <div class="form-group">
                                <label class="myLabel">Address</label>
                                <input type="text" v-model="newPatient.address" />
                            </div>

                            <div class="form-group">
                                <label class="myLabel">MedicalRecord</label>
                                <input type="text" v-model="newPatient.medicalRecord" />
                            </div>

                            <div class="form-group">
                                <label class="myLabel">Gender</label>
                                <select class="browser-default custom-select" v-model="newPatient.gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>					
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="submit" class="btn btn-info" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Details Modal HTML -->
        <div id="detailsModalP" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.stop.prevent="addMedicationPlan()" method="post">
                        <div class="modal-header">						
                            <h4 class="modal-title">Add Medication</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(medication, index) in medications" :key="index">
                                    <td>
                                        <label class="form-checkbox">
                                            <input type="checkbox" :value="medication.id" v-model="medicationsObj.medicationIds">
                                            <i class="form-icon"></i>
                                        </label>
                                    </td>
                                    <td>{{medication.name}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Start date</label>
                                <Datepicker class="datepicker" v-model="medicationsObj.startDate"></Datepicker>
                            </div>

                            <div class="form-group">
                                <label>End Date</label>
                                <Datepicker class="datepicker" v-model="medicationsObj.endDate"></Datepicker>
                            </div>

                            <div class="form-group">
                                <label class="myLabel">Intake interval</label>
                                <input type="text" v-model="medicationsObj.intakeInterval" />
                            </div>				
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="submit" class="btn btn-info" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import TableRowPatient from './TableRowPatient.vue';
    import axios from 'axios';
    axios.defaults.baseURL = "https://medication-platform.azurewebsites.net/";

    export default {
        data() {
            return {
                medicationsObj: {
                    selectedPatientId: '',
                    medicationIds: [],
                    startDate: '',
                    endDate: '',
                    intakeInterval: '',
                },
                medications: [],
                persons: [],
                guid: '',
                newPatient: {
                    id: '',
                    email: '',
                    name: '',
                    birthdate: '',
                    address: '',
                    gender: '',
                    medicalRecord: ''
                }
            }
        },
        components: {
            TableRowPatient,
            Datepicker
        },
        created () {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
            axios.get("api/Doctor/GetPatients", config)
                 .then(result => (this.persons = result.data));
        },
        methods: {
            generateGUID: function() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                axios.get("api/Doctor/CreatePatient", config)
                     .then(result => (this.guid = result.data));
            },
            deletePerson(person) {
                this.persons.splice(this.persons.indexOf(person), 1)
            },
            showPatient(person) {
                this.newPatient = person;
            },
            updatePatient() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                axios.post("api/Doctor/UpdatePatient", this.newPatient, config)
                     .then(result => console.log(result));
            },
            getMedications(patientId) {
                this.medicationsObj.selectedPatientId = patientId;

                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                axios.get("api/Doctor/GetMedication", config)
                     .then(result => this.medications = result.data);
            },
            addMedicationPlan() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                axios.post("api/Doctor/AddMedicationPlanForPatient", this.medicationsObj, config)
                     .then(result => console.log(result));
            }
        },
    }
</script>

<style lang="scss" scoped>
    .datepicker {
        text-align: center;
    }

    .myLabel {
        display: block;
    }

    table::-webkit-scrollbar{
        overflow: auto;
    }

    .table-responsive{
        max-height: 300px;
    }

    body {
        color: #566787;
        background: #f5f5f5;
        font-family: 'Varela Round', sans-serif;
        font-size: 13px;
    }
    .table-responsive {
        margin: 30px 0;
    }
    .table-wrapper {
        background: #fff;
        padding: 20px 25px;
        border-radius: 3px;
        min-width: 1000px;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }
    .table-title {        
        padding-bottom: 15px;
        background: #435d7d;
        color: #fff;
        padding: 16px 30px;
        min-width: 100%;
        margin: -20px -25px 10px;
        border-radius: 3px 3px 0 0;
    }
    .table-title h2 {
        margin: 5px 0 0;
        font-size: 24px;
    }
    .table-title .btn-group {
        float: right;
    }
    .table-title .btn {
        color: #fff;
        float: right;
        font-size: 13px;
        border: none;
        min-width: 50px;
        border-radius: 2px;
        border: none;
        outline: none !important;
        margin-left: 10px;
    }
    .table-title .btn i {
        float: left;
        font-size: 21px;
        margin-right: 5px;
    }
    .table-title .btn span {
        float: left;
        margin-top: 2px;
    }
    table.table tr th, table.table tr td {
        border-color: #e9e9e9;
        padding: 12px 15px;
        vertical-align: middle;
    }
    table.table tr th:first-child {
        width: 60px;
    }
    table.table tr th:last-child {
        width: 100px;
    }
    table.table-striped tbody tr:nth-of-type(odd) {
        background-color: #fcfcfc;
    }
    table.table-striped.table-hover tbody tr:hover {
        background: #f5f5f5;
    }
    table.table th i {
        font-size: 13px;
        margin: 0 5px;
        cursor: pointer;
    }	
    table.table td:last-child i {
        opacity: 0.9;
        font-size: 22px;
        margin: 0 5px;
    }
    table.table td a {
        font-weight: bold;
        color: #566787;
        display: inline-block;
        text-decoration: none;
        outline: none !important;
    }
    table.table td a:hover {
        color: #2196F3;
    }
    table.table td a.edit {
        color: #FFC107;
    }
    table.table td a.delete {
        color: #F44336;
    }
    table.table td i {
        font-size: 19px;
    }
    table.table .avatar {
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
    }
    .pagination {
        float: right;
        margin: 0 0 5px;
    }
    .pagination li a {
        border: none;
        font-size: 13px;
        min-width: 30px;
        min-height: 30px;
        color: #999;
        margin: 0 2px;
        line-height: 30px;
        border-radius: 2px !important;
        text-align: center;
        padding: 0 6px;
    }
    .pagination li a:hover {
        color: #666;
    }	
    .pagination li.active a, .pagination li.active a.page-link {
        background: #03A9F4;
    }
    .pagination li.active a:hover {        
        background: #0397d6;
    }
    .pagination li.disabled i {
        color: #ccc;
    }
    .pagination li i {
        font-size: 16px;
        padding-top: 6px
    }
    .hint-text {
        float: left;
        margin-top: 10px;
        font-size: 13px;
    }    

    .custom-checkbox {
        position: relative;
    }
    .custom-checkbox input[type="checkbox"] {    
        opacity: 0;
        position: absolute;
        margin: 5px 0 0 3px;
        z-index: 9;
    }
    .custom-checkbox label:before{
        width: 18px;
        height: 18px;
    }
    .custom-checkbox label:before {
        content: '';
        margin-right: 10px;
        display: inline-block;
        vertical-align: text-top;
        background: white;
        border: 1px solid #bbb;
        border-radius: 2px;
        box-sizing: border-box;
        z-index: 2;
    }
    .custom-checkbox input[type="checkbox"]:checked + label:after {
        content: '';
        position: absolute;
        left: 6px;
        top: 3px;
        width: 6px;
        height: 11px;
        border: solid #000;
        border-width: 0 3px 3px 0;
        transform: inherit;
        z-index: 3;
        transform: rotateZ(45deg);
    }
    .custom-checkbox input[type="checkbox"]:checked + label:before {
        border-color: #03A9F4;
        background: #03A9F4;
    }
    .custom-checkbox input[type="checkbox"]:checked + label:after {
        border-color: #fff;
    }
    .custom-checkbox input[type="checkbox"]:disabled + label:before {
        color: #b8b8b8;
        cursor: auto;
        box-shadow: none;
        background: #ddd;
    }

    .modal .modal-dialog {
        max-width: 400px;
    }
    .modal .modal-header, .modal .modal-body, .modal .modal-footer {
        padding: 20px 30px;
    }
    .modal .modal-content {
        border-radius: 3px;
        font-size: 14px;
    }
    .modal .modal-footer {
        background: #ecf0f1;
        border-radius: 0 0 3px 3px;
    }
    .modal .modal-title {
        display: inline-block;
    }
    .modal .form-control {
        border-radius: 2px;
        box-shadow: none;
        border-color: #dddddd;
    }
    .modal textarea.form-control {
        resize: vertical;
    }
    .modal .btn {
        border-radius: 2px;
        min-width: 100px;
    }	
    .modal form label {
        font-weight: normal;
    }	
</style>