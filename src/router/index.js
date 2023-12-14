import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from '../views/auth/SigninView.vue'
import SignupView from '../views/auth/SignupView.vue'
import Layout from '../components/layout/Layout.vue'
import DashboardView from "@/views/dashboard/DashboardView.vue";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout.vue";
import UsersView from "@/views/dashboard/UsersView.vue";
import VehiclesView from "@/views/dashboard/VehiclesView.vue";
import ReviewsView from "@/views/dashboard/ReviewsView.vue";
import AppointmentsView from "@/views/dashboard/AppointmentsView.vue";
import PaymentsView from "@/views/dashboard/PaymentsView.vue";
import AddAppointmentView from "@/views/dashboard/AddAppointmentView.vue";
import {store} from "@/store.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/signin',

    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      beforeEnter: (to, from, next) =>{
        const token = localStorage.getItem('token');

        if(!token && !store.user){
          return next({
            name: 'signin'
          })
        }
        next()
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: '/dashboard/users',
          name: 'users',
          component: UsersView,
        },
        {
          path: '/dashboard/vehicles',
          name: 'vehicles',
          component: VehiclesView,
          // beforeEnter: (to, from, next) =>{
          //   if(store.user.Role.name !== 'admin'){
          //     return next({
          //       name: 'dashboard'
          //     })
          //   }
          //   next()
          // },
        },
        {
          path: '/dashboard/appointments',
          name: 'appointments',
          component: AppointmentsView,
        },
        {
          path: '/dashboard/appointments/add',
          name: 'addAppointment',
          component: AddAppointmentView,
        },
        // {
        //   path: '/dashboard/reviews',
        //   name: 'reviews',
        //   component: ReviewsView,
        // },
        // {
        //   path: '/dashboard/payments',
        //   name: 'payments',
        //   component: PaymentsView,
        // },

      ],

    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    
  ],
  // linkExactActiveClass: "bg-gray-50 text-indigo-600",
})

export default router
