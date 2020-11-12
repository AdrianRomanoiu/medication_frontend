<template>
    <tr>
        <td>{{ medication.startDate.substring(0, 10) }}</td>
        <td>{{ medication.endDate.substring(0, 10) }}</td>
        <td>{{ medication.intakeInterval }}</td>
        <td>{{ medication.meds.join(' + ') }}</td>
    </tr>
</template>

<script>
    export default {
        props: {
            medication: {
                type: Object,
                required: true
            }
        },
    }
</script>