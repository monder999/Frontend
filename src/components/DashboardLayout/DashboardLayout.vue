<template>
  <div>
      <SmallDeviceSidebar :closeSidebar="closeSidebar" :isOpen="isOpen" :navigation="navigation"/>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <SidebarContent :navigation="navigation"/>
    </div>
    <div class="lg:pl-72">
    <Navbar :openSidebar="openSidebar"  />

    <main class="py-10">
      <div class="px-4 sm:px-6 lg:px-8">
        <RouterView/>
      </div>
    </main>
    </div>
  </div>

</template>

<script >
import {DisclosureButton} from "@headlessui/vue";

import {
  Bars3Icon,
  BellIcon, CalendarDaysIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon, TruckIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import Navbar from "@/components/DashboardLayout/Navbar.vue";
import SmallDeviceSidebar from "@/components/DashboardLayout/SmallDeviceSidebar.vue";
import {ref} from "vue";
import SidebarContent from "@/components/DashboardLayout/SidebarContent.vue";
import {store} from "@/store.js";

const isOpen = ref(false)
const {user} = store;
export default {
  components: {
    SidebarContent,
    SmallDeviceSidebar,
    Navbar,
    DisclosureButton,
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
  },
  data (){
    return {
       navigation : [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, available: true },
        { name: 'Users', href: '/dashboard/users', icon: UsersIcon, available: user.Role?.name === 'admin' },
        { name: 'Vehicles', href: '/dashboard/vehicles', icon: TruckIcon, available: true },
        { name: 'Appointments', href: '/dashboard/appointments', icon: CalendarDaysIcon, available: true },
        // { name: 'Reviews', href: '/dashboard/reviews', icon: DocumentDuplicateIcon, current: false },
        // { name: 'Payments', href: '/dashboard/payments', icon: ChartPieIcon, current: false },
      ],
      isOpen: isOpen,
    }
  },

  methods: {
    openSidebar(){
      isOpen.value = true
    },
    closeSidebar(){
      isOpen.value = false
    }
  }

}

</script>