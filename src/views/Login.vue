<template>
  <div class="container col-md-4 offset-md-4">
    <h1>Welcome to Medication</h1>
    <form clas="col-12" @submit.stop.prevent="submit()" method="post">
      <div>
        <label for="uname"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="Email" v-model="user.Email">

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="Password" v-model="user.Password">

        <button type="submit">Login</button>
      </div>
    </form>
    <router-link to="/register"><p>Don't have an account? Register</p></router-link>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        user: {
          Email: '',
          Password: ''
        }
      }
    },
    methods: {
      submit() {
        axios.post('api/Authenticate/Login', this.user)
             .then(result => {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('role', result.data.role);

                this.$router.push('/doctor');
             }).
             catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
             })
      }
      },
    beforeCreate() {
        if (localStorage.getItem('token') != null){
          let role = '/' + localStorage.getItem('role');
          this.$router.push(role);
        }
    }
  }
</script>

<style scoped lang="scss">
  h1 {
    color: #4d94ff;
    margin-bottom: 5.5rem !important;
    padding-top: 20%;
  }

  input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  button {
    background-color: #4d94ff;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    opacity: 0.8;
  }

  label {
    margin-bottom: 0rem !important;
    display: block !important;
    text-align: left;
    padding-left: 2%;
  }

  .container {
    padding: 16px;
  }
</style>
