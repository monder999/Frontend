<template>
  <div class="">
    <div class="p-3">
      <h2 class="text-xl font-semibold">Add Appointment</h2>
      <p class="text-sm ">
       Add your appointment now
      </p>
    </div>
    <form @submit.prevent="submitForm" class="grid gap-3 py-4">
      <div>
        <Label htmlFor="name">
          Name
        </Label>
        <div class="mt-2">
          <Input v-model="v$.name.$model" name="name" id="name"/>
          <p v-if="v$.name.$error" class="text-red-500 text-sm mt-1">
            {{ v$.name.$errors[0].$message }}
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="year">
          Vehicle
        </Label>
        <div class="mt-2">
          <Select v-model="v$.vehicleId.$model">
            <SelectTrigger id="year" class="w-full">
              <SelectValue placeholder="Select a vehicle"/>
            </SelectTrigger>
            <SelectContent class="max-h-40">
              <SelectItem v-for="vehicle in vehicales" :value="vehicle.id.toString()">
                {{vehicle.company}}
              </SelectItem>
            </SelectContent>
          </Select>
          <p v-if="v$.vehicleId.$error" class="text-red-500 text-sm mt-1">
                        {{v$.vehicleId.$errors[0].$message}}
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="rentAmount">
          Rent Amount
        </Label>
        <div
            :class="[ isFocused ? 'ring-1 ring-ring' : '', 'mt-2 flex items-center border border-input rounded-md shadow-sm']">
           <span type="button" class="px-2 py-2">
             <CurrencyDollarIcon class="w-5 h-5"/>
           </span>
          <Input v-model="v$.rentAmount.$model"
                 @focus="isFocused = true"
                 @blur="isFocused = false"
                 name="rentAmount"
                 id="rentAmount"
                 placeholder="50.00"
                 type="number"
                 class="border-0 shadow-none focus-visible:ring-0 pl-0"
          />
        </div>
        <p v-if="v$.rentAmount.$error" class="text-red-500 text-sm mt-1">
          {{ v$.rentAmount.$errors[0].$message }}
        </p>
      </div>
      <div class="">
        <div>
          <Label htmlFor="startTime">
          Select Time start from end
          </Label>
          <div class="mt-2">
            <VueTailwindDatepicker
                v-model="v$.dateValue.$model"
                use-range :shortcuts="false"
                :disable-date="disabledDates.customPredictor"
            />
            <p v-if="v$.dateValue.$error" v-for="error in v$.dateValue.$errors" class="text-red-500 text-sm mt-1">
              {{error.$message}}
            </p>
          </div>
        </div>
<!--        <div>-->
<!--          <Label htmlFor="startTime">-->
<!--            End time-->
<!--          </Label>-->
<!--          <div class="mt-2">-->
<!--            <VueTailwindDatepicker v-model="v$.endTime.$model" as-single/>-->

<!--            <p v-if="v$.endTime.$error" class="text-red-500 text-sm mt-1">-->
<!--              {{ v$.endTime.$errors[0].$message }}-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
      </div>

      <div>
        <Label htmlFor="description">
          Description
        </Label>
        <div class="mt-2">
          <Textarea class="max-h-[210px]" rows="4" v-model="v$.description.$model" name="description" id="description"/>
          <p v-if="v$.description.$error" class="text-red-500 text-sm mt-1">
            {{ v$.description.$errors[0].$message }}
          </p>
        </div>
      </div>


      <div>
        <Button type="submit" class="w-full">
          Add
        </Button>
      </div>
    </form>

  </div>

</template>

<script>
import {Button} from '@/components/ui/button/index.js'
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
import {baseURL, headers} from "@/lib/utils.js";
import Textarea from "@/components/ui/textarea/Textarea.vue";


import {
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import CardHeader from "@/components/ui/card/CardHeader.vue";

import {store} from "@/store.js";
const { user } = store;
export default {
  components: {
    CardHeader,
    VueTailwindDatepicker,
    Textarea,
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
    CurrencyDollarIcon
  },
  setup() {
    return {
      v$: useVuelidate(),
      disabledDates: {
        customPredictor(date) {
          const today = new Date();
          return date < today;
        },
      },
    }

  },
  data() {
    return {
      name: '',
      description: '',
      rentAmount: '',
      vehicleId: null,
      isFocused: false,
      dateValue: {
        startTime: '',
        endTime: '',
      }

    }
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage('Name is required', required),
      }, // Matches this.email
      description: {
        required: helpers.withMessage('Description is required', required),
      },
      rentAmount: {
        required: helpers.withMessage('Rent amount is required', required),
        numeric: helpers.withMessage('Rent Amount is number', numeric),

      },
      vehicleId: {
        required: helpers.withMessage('Vehicle Id is required', required)
      },
      dateValue: {
        startTime: {
          required: helpers.withMessage('Start time is required', required),
        },
        endTime: {
          required: helpers.withMessage('End time is required', required),
        }
      }
    }
  },
props: ['vehicales'],
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      this.v$.$reset()
      if (!isFormCorrect) return
      const formData = {
        userId: user.id,
        vehicleId: Number( this.vehicleId),
        name: this.name,
        description: this.description,
        rentAmount: this.rentAmount,
        startTime: this.dateValue.startTime,
        endTime: this.dateValue.endTime
      }
      const res = await  axios.post(`${baseURL}/appoinments`, formData, {
        headers: headers()
      });

      if(res.data){
        this.description = ''
        this.name = ''
        this.rentAmount = ''
        this.vehicleId = null
        this.dateValue = {
          startTime: '',
          endTime: '',
        }

      }
    }
  }

}
</script>

