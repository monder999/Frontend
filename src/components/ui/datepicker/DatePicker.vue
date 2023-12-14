<script setup>
import { ref } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
const dateValue = ref([]);
console.log(dateValue.value)
</script>

<template>
  <VueTailwindDatepicker v-model="dateValue" />
</template>