<template>

    <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button @click="openSidebar" type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
      </button>

      <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"/>

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div class="relative flex flex-1">

        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="-m-1.5 flex items-center p-1.5">

              <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  :src="`https://ui-avatars.com/api/?name=${this.user.firstName + '+' + this.user.lastName}`"
                  alt=""
              />
              <span class="hidden lg:block lg:items-center">
                      <span class="ml-4 text-sm font-semibold leading-6 text-gray-900 capitalize" aria-hidden="true">
                        {{this.user?.firstName}}  {{this.user?.lastName}}
                      </span>
                      <span class="ml-4 text-xs capitalize block text-gray-400">{{this.user.Role.name}}</span>
              </span>
            </div>

          <Button variant="" @click="logout()" >
            Sign out
          </Button>
        </div>
      </div>
    </div>

</template>


<script>
import {
  Bars3Icon,
  BellIcon
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/vue/20/solid'
import {Menu, MenuButton, MenuItems, MenuItem, TransitionRoot} from '@headlessui/vue'
import { store } from '@/store.js';
import Button from "@/components/ui/button/Button.vue";

const { logout, user } = store;
export default {

  components: {
    Button,
    ChevronDownIcon, MagnifyingGlassIcon,BellIcon,
    Bars3Icon, Menu, MenuButton, MenuItems, MenuItem, TransitionRoot
  },
  data() {
    return {
      userNavigation: [
        {name: 'Your profile', href: '#'}
      ],
      user: user
    }
  },
  props: ['openSidebar'],
  mounted(){
    this.getUser()
  },
  methods: {

    getUser(){
      this.user = JSON.parse(localStorage.getItem('user'));
    },

    logout (){
      logout();
      this.$router.push({path: '/signin'})
    }
  },

}

</script>