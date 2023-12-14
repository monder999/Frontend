<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

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
                Name
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Birth
              </th>
              <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                <span class="">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">

            <tr v-for="user in users" :key='user.id'>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                {{ user.id }}
              </td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                {{ user.firstName }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {{user.lastName}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{user.email}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span v-if="user.birth">{{user.birth}}</span>
                <span v-else>N/A</span>
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 lg:pr-8 flex gap-2 justify-center">
<!--                <Button variant="outline" size="icon">-->
<!--                  <PencilSquareIcon-->
<!--                      class="h-4 w-4 shrink-0 text-black group-hover:text-indigo-600"-->
<!--                  />-->
<!--                </Button>-->
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
                        This action cannot be undone. This will permanently delete your account and remove your
                        data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction @click="deleteUser(user.id)">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="6">
                Loading...
              </td>
            </tr>
            <tr v-if="!isLoading && users.length === 0">
              <td colspan="6">
               Uses not available!
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
import {AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel,AlertDialogAction } from "@/components/ui/alert-dialog";

import {
PencilSquareIcon, TrashIcon
} from '@heroicons/vue/24/outline'
import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";

export default {
  components: {
     Button, Dialog, DialogTrigger,PencilSquareIcon,TrashIcon,
    AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTrigger, AlertDialogCancel,AlertDialogAction
  },
  data() {
    return {
      users: [],
      isLoading: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
   async getUsers() {
     this.isLoading = true
      const res = await axios.get(`${baseURL}/users`, {
      headers: headers()
      });
      console.log(res)
      if(res.data){
        this.users = res.data.data
      }
      this.isLoading = false

    },
    async deleteUser (id){
      const res = await axios.delete(`${baseURL}/users/${id}`, {
        headers: headers()
      });
      if(res.data){
        await this.getUsers()
        console.log(res.data.message)
      }
    }

  }
}
</script>