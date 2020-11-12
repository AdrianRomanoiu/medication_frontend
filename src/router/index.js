import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Doctor from '../views/Doctor.vue';
import Caregiver from '../views/Caregiver.vue';
import Patient from '../views/Patient.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/doctor",
    name: "Doctor",
    component: Doctor,
    meta: {
      requiresAuth: true,
      role: 'doctor'
    }
  },
  {
    path: '/caregiver',
    name: "Caregiver",
    component: Caregiver,
    meta: {
      requiresAuth: true,
      role: 'caregiver'
    }
  },
  {
    path: '/patient',
    name: "Patient",
    component: Patient,
    meta: {
      requiresAuth: true,
      role: 'patient'
    }
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)){
      let role = localStorage.getItem('role');
      if (localStorage.getItem('token') == null || 
          to.matched.some(record => role.localeCompare(record.meta.role) != 0)
         ) {
            next("/");
      } else {
        next();
      } 
    } else {
      next();
    } 
  }
);

export default router;
