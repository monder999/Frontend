<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Vehicles</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div v-if="user.Role.name === 'admin'" class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <Dialog>
          <DialogTrigger as-child>
            <Button

                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Vehicle
            </Button>
          </DialogTrigger>

          <AddVehicles :getVehicles="getVehicles"/>
        </Dialog>

      </div>
    </div>

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
                Company
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Model
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Year
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Color
              </th>
              <th v-if="this.user?.Role.name === 'admin'" scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                Action
              </th>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">

              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">

            <template v-for="vehicle in vehicales"  :key='vehicle.id'>
            <tr >
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                {{ vehicle.id }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {{vehicle.company}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{vehicle.model}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{vehicle.year}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{vehicle.color}}</td>

              <td v-if="this.user?.Role.name === 'admin'" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 lg:pr-8 flex gap-2 justify-center">
               <Dialog>
                <DialogTrigger as-child>
                  <Button variant="outline" size="icon">
                    <PencilSquareIcon
                        class="h-4 w-4 shrink-0 text-black group-hover:text-indigo-600"
                    />
                  </Button>
                </DialogTrigger>
                 <EditVehicles :details="vehicle" :getVehicles="getVehicles"/>
               </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button variant="destructive" size="icon">
                      <TrashIcon
                          class="h-4 w-4 shrink-0 text-white group-hover:text-indigo-600"
                      />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete vehicle
                        and remove your data from the servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction @click="deleteVehicle(vehicle.id)">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </td>
              <td >
              <div class="flex items-center justify-evenly">
<!--                <Dialog v-if="this.user?.Role.name==='admin'">-->
<!--                  <DialogTrigger as-child>-->
<!--                    <Button>Add Review</Button>-->
<!--                  </DialogTrigger>-->
<!--                  <AddReview :details="vehicle" :getVehicles="getVehicles"/>-->
<!--                </Dialog>-->
                <Button @click="this.geDetails(vehicle.id)" size="icon" variant="outline">
                  <ChevronDownIcon class="w-4 h-4"/>
                </Button>
              </div>
              </td>
            </tr>
            <tr v-if="this.openDetail === vehicle.id">
              <td colspan="7">
                <div class="w-full grid grid-cols-2 gap-5 py-8 px-8 bg-gray-50">
                <Card v-if="this.reviews?.length > 0" v-for="review in this.reviews">
                  <CardHeader>
                    <CardTitle>
                      Sample title
                    </CardTitle>
                 <div class="flex items-center gap-1">
                   <div class="flex items-center ">
                      <StarFill v-for="rating in [...Array(review.rating)]" class="w-4 h-4"/>
                      <StarIcon v-for="rating in [...Array(5 - review.rating)]" class="w-4 h-4"/>
                   </div>
                    <span>({{review.rating}})</span>
                 </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {{review.message}}
                    </p>
                  </CardContent>
                </Card>
                  <div v-if="!this.detailsLoading && this.reviews?.length===0">
                    <p>Not available details</p>
                  </div>
                  <div v-if="this.detailsLoading">
                    <p>Loading details...</p>
                  </div>
                </div>
              </td>
            </tr>
            </template>
            <tr v-if="isLoading">
              <td colspan="6">Loading...</td>
            </tr>
            <tr v-if="!isLoading && vehicales?.length === 0">
              <td colspan="6">Vehicles not availabel!</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button/index.js";
import {
  PencilSquareIcon, TrashIcon,ChevronDownIcon
} from '@heroicons/vue/24/outline'
import AddVehicles from "@/components/Vehicles/AddVehicles.vue";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";
import EditVehicles from "@/components/Vehicles/EditVehicles.vue";
import {AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel,AlertDialogAction } from "@/components/ui/alert-dialog";
import AddReview from "@/components/Vehicles/AddReview.vue";
import {StarIcon as StarFill} from '@heroicons/vue/24/solid';
import {
  StarIcon,
} from '@heroicons/vue/24/outline'
import {store} from "@/store.js";


const {user} = store
export default {
  components: {
    AddReview,StarFill,StarIcon,
    AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel,AlertDialogAction,
    EditVehicles,
    AddVehicles,
    Button, Dialog, DialogTrigger,PencilSquareIcon,TrashIcon,
    Card, CardContent, CardHeader, CardTitle,
    ChevronDownIcon
  },
  data() {
    return {
      vehicales: [],
      isLoading: false,
      openDetail: null,
      reviews: [],
      detailsLoading: false,
      user,
    }
  },
  mounted() {
    this.getVehicles()
  },
  methods: {
    async getVehicles() {
      this.isLoading = true
      const res = await axios.get(`${baseURL}/vehicales`, {
        headers: headers()
      });
      if(res.data){
        this.vehicales = res.data.data
      }
      this.isLoading = false

    },
    async geDetails(id){
      this.detailsLoading = true
      this.reviews = []
      if(this.openDetail === id) {
        this.openDetail = null
        this.detailsLoading = false
        return;
      }
      this.openDetail = id;
      const res = await axios.get(`${baseURL}/reviews/${id}`, {
        headers: headers()
      });
      if(res.data){
        this.reviews = res.data.data

      }
      this.detailsLoading = false
    },
    async deleteVehicle (id){
      const res = await axios.delete(`${baseURL}/vehicales/${id}`, {
        headers: headers()
      });
      if(res.data){
       await this.getVehicles()
        console.log(res.data.message)
      }
    }

  }
}

</script>