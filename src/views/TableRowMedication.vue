<template>
    <tr>
    <td>{{ medication.name }}</td>
    <td>{{ medication.sideEffects }}</td>
    <td>{{ medication.dosage }}</td>
    <td>
        <a href="#editModalM" @click="emitMedication()" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#" @click="remove()" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
    </td>
</tr>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {
            medication: {
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
                axios.post("api/Doctor/DeleteMedication", {'Id': this.medication.id}, config)
                    .then(() => this.$emit('deletedMedication', this.medication));
            },
            emitMedication() {
                this.$emit('new-medication', this.medication);
            },
        }
    }
</script>