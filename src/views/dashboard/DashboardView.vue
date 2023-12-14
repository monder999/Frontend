
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Dashboard</h1>
      </div>

      </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <Card v-if="this.store.user?.Role.name === 'admin'" class="py-5 ">
          <CardContent>
            <h2 class="text-2xl ">Users</h2>
            <h2 class="text-xl font-semibold">{{numeral(this.totalUsers).format('00,0')}}</h2>
          </CardContent>
        </Card>
      <Card class="py-5 py-5 ">
        <CardContent>
          <h2 class="text-2xl font-semibold">Vehicles</h2>
          <h2 class="text-xl font-semibold">{{numeral(this.totalVehicles).format('00,0')}}</h2>
        </CardContent>
      </Card>
      <Card class="py-5 py-5">
        <CardContent>
          <h2 class="text-2xl font-semibold">Appointment</h2>
          <h2 class="text-xl font-semibold">{{numeral(this.totalAppointment).format('00,0')}}</h2>
        </CardContent>
      </Card>
    </div>
    </div>
</template>




<script>
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout.vue";
import {Button} from "@/components/ui/button/index.js";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";

import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";
import {store} from "@/store.js";
import numeral from "numeral";

export default {
  components: {
    DashboardLayout,Button, Card, CardHeader, CardTitle, CardContent
  },
  data(){
    return {
      totalAppointment: null,
      totalVehicles: null,
      totalUsers: null,
      store
    }
  },

  mounted() {
    this.getUsers()
    this.getAppointments()
    this.getVehicles()

  },
  methods: {
    numeral,
    async getUsers() {
      // this.isLoading = true
      const res = await axios.get(`${baseURL}/users`, {
        headers: headers()
      });
      if(res.data){
        this.totalUsers = res.data.data.length
      }
      // this.isLoading = false

    },
    async getAppointments() {
      const res = await axios.get(`${baseURL}/appoinments/${store?.user.id}`, {
        headers: headers()
      });
      if(res.data){
        this.totalAppointment = res.data.data.length
      }
    },
    async getVehicles() {
      const res = await axios.get(`${baseURL}/vehicales`, {
        headers: headers()
      });
      if(res.data){
        this.totalVehicles = res.data.data.length
      }
    },
  }


}
</script>



