<template>
    <tr>
    <td>{{ person.email }}</td>
    <td>{{ person.name }}</td>
    <td>{{ person.birthDate.substring(0, 10) }}</td>
    <td>{{ person.address }}</td>
    <td>{{ person.gender }}</td>
    <td>
        <a href="#editModal" @click="emitPerson()" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#" @click="remove()" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        <a href="#detailsModal" @click="emitGetPatients()" class="details" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Details">&#xE0ee;</i></a>
    </td>
</tr>
</template>

<script>
    import axios from 'axios';
    axios.defaults.baseURL = "https://medication-platform.azurewebsites.net/";

    export default {
        props: {
            person: {
                type: Object,
                required: true
            }
        },
        methods: {
            remove() {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }
                axios.post("api/Doctor/DeleteCaregiver", {'Id': this.person.id}, config)
                    .then(() => this.$emit('deletedPerson', this.person));
            },
            emitPerson() {
                this.$emit('new-caregiver', this.person);
            },
            emitGetPatients() {
                this.$emit('getPatients', this.person);
            }
        }
    }
</script>