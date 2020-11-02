<template>
  <div class="register">
    <h1>Create a new account</h1>
      <div class="container col-md-4 offset-md-4">
        <form clas="col-12" @submit.stop.prevent="submit()" method="post">
          <div>
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" v-model="user.Email">

            <label for="uname"><b>Name</b></label>
            <input type="text" placeholder="Enter Full Name" name="uname"  v-model="user.Name">

            <label><b>Birthdate</b></label>
            <Datepicker v-model="user.Birthdate" placeholder="Click to enter your birthdate"></Datepicker>

            <label for="address"><b>Address</b></label>
            <input type="text" placeholder="Enter your address" name="address"  v-model="user.Address">

            <label class="gender_label" for="gender"><b>Gender</b></label>
            <select class="browser-default custom-select" name="gender"  v-model="user.Gender">
              <option selected="selected">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label class="role_label" for="role"><b>Role</b></label>
            <select @change="changeRole($event)" class="browser-default custom-select" name="role"  v-model="user.Role">
              <option selected="selected">Select role</option>
              <option value="doctor">Doctor</option>
              <option value="caregiver">Caregiver</option>
              <option value="patien">Patient</option>
            </select>

            <div v-show="isSelectedRoleNotDoctor">
              <label class="key_label" for="Key"><b>Key</b></label>
              <input type="text" placeholder="Enter your enrolment key" name="key" v-model="user.Key">
            </div>

            <hr>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw"  v-model="user.Password">

            <label for="pswc"><b>Confirm Password</b></label>
            <input type="password" placeholder="Re-Enter Password" name="pswc">

            <button type="submit">Submit</button>
            <p>{{ info }}</p>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import axios from 'axios';

  export default {
    name: 'date-picker',
    components: {
        Datepicker
    },
    data () {
      return {
        isSelectedRoleNotDoctor: false,
        info: null,
        user: {
          Email: '',
          Name: '',
          Birthdate: '',
          Address: '',
          Gender: '',
          Role: '',
          Key: '',
          Password: '',
        }
      }
    },
    methods: {
      changeRole (event){
        if (event.target.value === "doctor" || event.target.value === "Select role"){
          this.isSelectedRoleNotDoctor = false;
          return;
        }

        this.isSelectedRoleNotDoctor = true;
      },
      submit() {
         axios
          .post("/api/Authenticate/Register", this.user)
          .then(response => (this.info = response))
        }
      }
    }

</script>

<style lang="scss">
  .register .role{
    text-align: left;
    padding-left: 3%;
    padding-top: 1.5%;
  }

  .register .role_label {
    padding-top: 8px;
    padding-bottom: 7px;
  }

  .register .key_label {
    padding-top: 8px;
    //padding-bottom: 7px;
  }

  .register .gender_label {
    padding-bottom: 7px;
  }

  .register h1 {
    color: #4d94ff;
    margin-bottom: 3.5rem !important;
    padding-top: 5%;
  }

  .register select {
    height: 3.10rem;
  }

  .register input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .register button {
    background-color: #4d94ff;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  .register button:hover {
    opacity: 0.8;
  }

  .register label {
    margin-bottom: 0rem !important;
    display: block;
    text-align: left;
    padding-left: 2%;
  }

  .register .container {
    padding: 16px;
  }
</style>
