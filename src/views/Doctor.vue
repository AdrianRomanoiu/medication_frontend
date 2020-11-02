<template>
    <div>
        <Layout></Layout>
        <TableCRUD></TableCRUD>
    </div>
</template>

<script>
    import Layout from './Layout.vue'
    import TableCRUD from './TableCRUD.vue'

    export default {
        components: {
            Layout,
            TableCRUD
        }
    }
</script>