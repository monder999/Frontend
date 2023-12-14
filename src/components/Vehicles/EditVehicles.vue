<template>
  <DialogContent class="sm:max-w-xl">
    <DialogHeader>
      <DialogTitle>Edit Vehicle</DialogTitle>
      <DialogDescription>
        Update the vehicle details
      </DialogDescription>
    </DialogHeader>
    <form @submit.prevent="submitForm" class="grid gap-3 py-4">
      <div>
        <Label htmlFor="company">
          Company
        </Label>
        <div class="mt-2">
          <Input v-model="v$.company.$model" name="company" id="company"/>
          <p v-if="v$.company.$error" class="text-red-500 text-sm mt-1">
            {{ v$.company.$errors[0].$message }}
          </p>
        </div>
      </div>
      <div>
        <Label htmlFor="model">
          Card Model
        </Label>
        <div class="mt-2">
          <Input v-model="v$.model.$model" name="model" id="model"/>
          <p v-if="v$.model.$error" class="text-red-500 text-sm mt-1">
            {{ v$.model.$errors[0].$message }}
          </p>
        </div>
      </div>
      <div>
        <Label htmlFor="year">
          Year
        </Label>
        <div class="mt-2">
          <Select v-model="v$.year.$model">
            <SelectTrigger id="year" class="w-full">
              <SelectValue placeholder="Select Year"/>
            </SelectTrigger>
            <SelectContent class="max-h-40">
              <SelectItem v-for="year in yearLists" :value="year.toString()">
                {{ year }}
              </SelectItem>
            </SelectContent>
          </Select>
          <!--            <Input v-model="v$.year.$model" name="year" id="year" type="number" maxlength="4"/>-->
          <p v-if="v$.year.$error" class="text-red-500 text-sm mt-1">
            {{ v$.year.$errors[0].$message }}
          </p>
        </div>
      </div>
      <div>
        <Label htmlFor="color">
          Color
        </Label>
        <div class="mt-2">
          <Input v-model="v$.color.$model" name="color" id="color"/>
          <p v-if="v$.color.$error" class="text-red-500 text-sm mt-1">
            {{ v$.color.$errors[0].$message }}
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save
        </Button>
      </DialogFooter>
    </form>

  </DialogContent>

</template>

<script>
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {Input} from '../ui/input'
import {Label} from '../ui/label'
import {useVuelidate} from '@vuelidate/core'
import {email, helpers, maxLength, minLength, numeric, required} from "@vuelidate/validators";

import axios from "axios";
import {baseURL, headers, yearLists} from "@/lib/utils.js";
import {store} from "@/store.js";


const {user} = store;
export default {
  components: {
    Label, Input, Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  },

  setup() {
    return {
      v$: useVuelidate(),
      yearLists
    }

  },
  data() {
    return {
      company: this.details?.company,
      model: this.details?.model,
      year: this.details?.year,
      color: this.details?.color,

    }
  },
  validations() {
    return {
      company: {
        required: helpers.withMessage('Company is required', required),
      }, // Matches this.email
      model: {
        required: helpers.withMessage('Model is required', required),
      },
      year: {
        required: helpers.withMessage('Year is required', required),
        maxLength: helpers.withMessage('Max length is 4 digit', maxLength(4)),
        minLength: helpers.withMessage('Min length is 4 digit', minLength(4)),
      },
      color: {
        required: helpers.withMessage('Color is required', required),
      }
    }
  },
  props: ['getVehicles', 'details'],
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return
      // actually submit form
      const formData = {
        userId: user.id,
        company: this.company,
        model: this.model,
        year: Number(this.year),
        color: this.color
      }

      const res = await axios.put(`${baseURL}/vehicales/${this.details.id}`, formData, {
        headers: headers()
      });

      if (res.data) {
        console.log(res.data)
        this.getVehicles();
      }

    }
  }

}
</script>

