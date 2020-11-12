<template>
    <div>
        <Layout></Layout>
        <TableCRUD></TableCRUD>
        <TablePatient></TablePatient>
        <TableMedication></TableMedication>
    </div>
</template>

<script>
    import Layout from './Layout.vue';
    import TableCRUD from './TableCRUD.vue';
    import TablePatient from './TablePatient.vue';
    import TableMedication from './TableMedication.vue';

    export default {
        components: {
            Layout,
            TableCRUD,
            TablePatient,
            TableMedication
        }
    }
</script>