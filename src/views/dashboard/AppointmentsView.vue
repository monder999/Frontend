<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Vehicles</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <Dialog>
          <DialogTrigger as-child>
           <RouterLink to="/dashboard/appointments/add">
             <Button

                 class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Get Appointment
             </Button>
           </RouterLink>
          </DialogTrigger>


        </Dialog>
      </div>
    </div>

<!--   <div class="mt-8 grid grid-cols-2">-->

<!--     <Card>-->
<!--       <CardHeader>-->
<!--        <div class="flex items-center justify-between">-->
<!--          <CardTitle>-->
<!--            Sample Appointment-->
<!--          </CardTitle>-->
<!--          <span class="bg-orange-100 px-2 py-1.5 rounded-md text-sm">Unpaid</span>-->
<!--        </div>-->
<!--       <div class="flex items-center gap-5">-->
<!--         <h4>Rent Amount: <span class="text-green-500 text-xl">$50</span></h4>-->
<!--         <Button>Pay</Button>-->
<!--       </div>-->
<!--       </CardHeader>-->
<!--       <CardContent>-->
<!--         <div>-->
<!--           <span class="text-sm">{{dayjs('2023-12-15 09:32:54').format('DD MMM YYYY')}}</span>-->
<!--           - -->
<!--           <span class="text-sm">{{dayjs('2023-12-20 09:32:54').format('DD MMM YYYY')}}</span>-->
<!--           (<span>{{numeral(dayjs('2023-12-20 09:32:54').diff(dayjs('2023-12-15 09:32:54'), 'day', true)).format('00,0')}} days</span>)-->
<!--         </div>-->
<!--          <div class="mt-2">-->
<!--           <p class="text-gray-500 text-sm"> In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia</p>-->
<!--          </div>-->
<!--       </CardContent>-->
<!--     </Card>-->
<!--   </div>-->
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr class="bg-gray-100">
              <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
              >
                #ID
              </th>
              <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
              >
                Name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Rent Amount
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Start Time
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                End Time
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
               Days
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Payment Status
              </th>

              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                <span class="">Action</span>
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="appoint in appointments" :key="appoint.id" class="group hover:bg-gray-50">
                <td class="py-3.5 pl-4 pr-3 text-left text-sm text-gray-500 sm:pl-6 lg:pl-8">{{appoint?.id}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                  {{appoint?.name}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${{appoint.rentAmount}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{dayjs(appoint.startTime).format('DD MMM YYYY')}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{dayjs(appoint.endTime).format('DD MMM YYYY')}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{numeral(dayjs(appoint.endTime).diff(dayjs(appoint.startTime), 'day', true)).format('00,0')}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span v-if="!appoint.paid" class="bg-orange-100 px-2 py-1.5 rounded-md text-sm">Unpaid</span>
                  <span v-if="appoint.paid" class="bg-green-100 px-2 py-1.5 rounded-md text-sm">Paid</span>
                </td>
<!--                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 lg:pr-8 flex gap-2 justify-center">-->
<!--                  <Button variant="outline" size="icon">-->
<!--                    <PencilSquareIcon-->
<!--                        class="h-4 w-4 shrink-0 text-black"-->
<!--                    />-->
<!--                  </Button>-->
<!--                  <Button variant="destructive" size="icon">-->
<!--                    <TrashIcon-->
<!--                        class="h-4 w-4 shrink-0 text-white"-->
<!--                    />-->
<!--                  </Button>-->
<!--                </td>-->
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                 <div class="flex items-center gap-3 justify-center">
                   <Dialog v-if="!appoint.paid" >
                     <DialogTrigger as-child>
                       <Button>Pay</Button>
                     </DialogTrigger>
                     <AddPayment :getAppointments="getAppointments" :appointment="appoint"/>
                   </Dialog>

                   <Dialog v-if="appoint.paid">
                     <DialogTrigger as-child>
                       <Button variant="outline">Add Review</Button>
                     </DialogTrigger>
                     <AddReview :details="appoint"/>
                   </Dialog>
                 </div>
                </td>
                <td>
                  <Dialog>
                    <DialogTrigger as-child>
                      <Button variant="outline" size="icon">
                        <EyeIcon  class="h-4 w-4 shrink-0 text-black"/>
                      </Button>
                    </DialogTrigger>
                    <AppointmentDetail :appointment="appoint"/>
                  </Dialog>
                </td>
              </tr>
            <tr v-if="isLoading">
              <td colspan="9" class="">
                Loading...
              </td>
            </tr>
              <tr v-if="!isLoading && appointments?.length === 0">
                <td colspan="9" class="">
                  Appointment not available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button/index.js";

import {
  PencilSquareIcon, TrashIcon, EyeIcon
} from '@heroicons/vue/24/outline'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AddAppointment from "@/components/appointments/AddAppointment.vue";
import dayjs from "dayjs";
import numeral from "numeral";
import AppointmentDetail from "@/components/appointments/AppointmentDetail.vue";
import AddPayment from "@/components/appointments/AddPayment.vue";
import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";
import { store } from '@/store.js';
import AddReview from "@/components/Vehicles/AddReview.vue";

const {  user } = store;
export default {
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {
    AddReview,
    AddPayment,
    AppointmentDetail,
    AddAppointment,
    Button, Dialog, DialogTrigger,PencilSquareIcon,TrashIcon,
    Card, CardContent, CardHeader, CardTitle,EyeIcon
  },
  data() {
    return {
    appointments: [],
      isLoading: false,
      user
    }
  },
  mounted() {
    this.getAppointments()
  },
  methods: {
    numeral,
    async getAppointments() {
      this.isLoading = true
      const res = await axios.get(`${baseURL}/appoinments/${user.id}`, {
        headers: headers()
      });
      if(res.data){
        this.appointments = res.data.data
      }
      this.isLoading = false
    }

  }


}

</script>