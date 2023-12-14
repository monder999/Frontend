<template>
<Card class="mx-auto sm:max-w-xl ">
  <CardContent>
    <AddAppointment :vehicales="vehicales"/>
  </CardContent>
</Card>
</template>

<script >
import AddAppointment from '../../components/appointments/AddAppointment.vue'
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";

export default {
  components:{
    AddAppointment, Card, CardContent
  },
  data() {
    return {
      vehicales: []
    }
  },
  mounted() {
    this.getVehicles()
  },
  methods: {
    async getVehicles() {
      const res = await axios.get(`${baseURL}/vehicales`, {
        headers: headers()
      });
      if(res.data){
        this.vehicales = res.data.data
      }
    }
  }
}


</script>