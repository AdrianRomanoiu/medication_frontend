<template>
    <tr>
        <td>{{ person.email }}</td>
        <td>{{ person.name }}</td>
        <td>{{ person.birthDate.substring(0, 10) }}</td>
        <td>{{ person.address }}</td>
        <td>{{ person.gender }}</td>
        <td>{{ person.medicalRecord}}</td>
        <td>
            <button data-toggle="modal" data-target="#medicationModal" @click="getMedication">Medication</button>
        </td>

    </tr>
</template>

<script>
    export default {
        data () {
            return {
                medications: [],
                medicationEmpty: {
                    startDate: '',
                    endDate: '',
                    inTakeInterval: '',
                    meds: []
                }
            }
        },
        props: {
            person: {
                type: Object,
                required: true
            }
        },
        methods: {
            getMedication() {
                this.$emit('get-medication', this.person.id);
            }
        }
    }
</script>