<template>

  <div>
    <Label htmlFor="firstName" >
      {{label}}
    </Label>
    <div class="mt-2">
      <Input
          :type="type"
          :id="inputId"
          :name="name"
          :value="value"
          @input="$emit('input', $event)"
      />
      <p v-if="error" class="text-red-500 text-sm mt-1">
        {{errorMessage}}
      </p>
    </div>
  </div>
</template>


<script>
import Input from "./ui/input/Input.vue";
import Label from "./ui/label/Label.vue";
export default{
  components: {
    Input, Label
  },
 props: {
  label: String,
   type: String,
   name: String,
   value: [String, Number],
   inputId: String,
   errorMessage: String,
   error: Boolean
  // Add other dynamic attributes as needed
},
}
</script>