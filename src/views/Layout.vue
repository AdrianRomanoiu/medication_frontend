<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div style="padding-left: 20px;" class="navbar-brand">Hello {{ role }}</div>
    <div class="collapse navbar-collapse" id="navbarText">
    </div>
    <span class="navbar-text">
      <a href="#" @click="signout()">Sign Out</a>
    </span>
    
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    </nav>
</template>

<script>
    export default {
       data() {
         return {
           role: localStorage.getItem('role')
         }
       },
       methods: {
         signout: function() {
           localStorage.removeItem('token');
           localStorage.removeItem('role');

           this.$router.push("/");
         }
       } 
    }
</script>

<style lang="scss" scoped>

</style>