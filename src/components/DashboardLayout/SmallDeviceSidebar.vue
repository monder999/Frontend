<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="closeSidebar">
      <!--      onClose={setSidebarOpen}-->
      <TransitionChild
          as='template'
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80"/>
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
            as='template'
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
                as='template'
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button @click="closeSidebar" type="button" class="-m-2.5 p-2.5">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true"/>
                </button>
              </div>
            </TransitionChild>
            <SidebarContent :navigation="navigation"/>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
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
import {TransitionRoot, TransitionChild, Dialog, DialogPanel} from '@headlessui/vue'
import SidebarContent from "@/components/DashboardLayout/SidebarContent.vue";

export default {

  components: {
    SidebarContent,
    XMarkIcon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel
  },

  props: ['closeSidebar', 'isOpen', 'navigation']
}
</script>