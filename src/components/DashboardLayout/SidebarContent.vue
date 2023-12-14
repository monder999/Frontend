<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
    <div class="flex h-16 shrink-0 items-center">
     <span class="font-semibold text-2xl">Car Service</span>
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">

            <li v-for="item in navigation" :key="item.name">
              <RouterLink v-if="item.available" :to="item.href" :exact-active-class="'bg-gray-50 text-indigo-600'"
                class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                <component :is="item.icon" class="icon text-gray-400 group-hover:text-indigo-600 h-6 w-6 shrink-0"></component>

                {{item.name}}

              </RouterLink>

            </li>

          </ul>
        </li>
<!--        <li class="mt-auto">-->
<!--          <a-->
<!--              href="#"-->
<!--              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"-->
<!--          >-->
<!--            <Cog6ToothIcon-->
<!--                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"-->
<!--                aria-hidden="true"-->
<!--            />-->
<!--            Settings-->
<!--          </a>-->
<!--        </li>-->
      </ul>
    </nav>
  </div>
</template>
<script >
import {Cog6ToothIcon} from "@heroicons/vue/24/outline";

export default {
  components: {
    Cog6ToothIcon
  },
  props: ['navigation']
}

</script>