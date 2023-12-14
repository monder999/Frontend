
<template>
  <DialogContent class="sm:max-w-xl">
    <DialogHeader>
      <DialogTitle>Add Payment</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>

    <form class="space-y-3">
      <div>
        <Label htmlFor="amount">
          Amount
        </Label>
        <div class="mt-2">
          <div
              :class="[ isFocused ? 'ring-1 ring-ring' : '', 'mt-2 flex items-center border border-input rounded-md shadow-sm']">
           <span type="button" class="px-2 py-2">
             <CurrencyDollarIcon class="w-5 h-5"/>
           </span>
            <Input
                v-model="this.amount"
                   @focus="isFocused = true"
                   @blur="isFocused = false"
                   name="rentAmount"
                   id="rentAmount"
                   placeholder="50.00"
                    readonly
                   type="number"
                   class="border-0 shadow-none focus-visible:ring-0 pl-0"
            />
          </div>
<!--          <p v-if="v$.name.$error" class="text-red-500 text-sm mt-1">-->
<!--            {{ v$.name.$errors[0].$message }}-->
<!--          </p>-->
        </div>
      </div>
      <div>
        <Label htmlFor="paymentMethod">
          Payment Method
        </Label>
        <div class="mt-2">
          <Select defaultValue="paypal" name="paymentMethod">
            <SelectTrigger id="year" class="w-full">
              <SelectValue placeholder="Select a vehicle"/>
            </SelectTrigger>
            <SelectContent class="max-h-40">
              <SelectItem selected value="paypal">
              Paypal
              </SelectItem>
            </SelectContent>
          </Select>
<!--          <p v-if="v$.vehicleId.$error" class="text-red-500 text-sm mt-1">-->
<!--            {{v$.vehicleId.$errors[0].$message}}-->
<!--          </p>-->
        </div>
      </div>

  <div class="">
    <Button @click="submitForm" class="w-full mt-5" type="button">Payment</Button>
  </div>
    </form>
  </DialogContent>

</template>

<script>
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {CurrencyDollarIcon} from '@heroicons/vue/24/outline'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";

export default {
  components: {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    CurrencyDollarIcon,
    Label,
    Input, Button,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  },

  data () {
    return {
      amount:  this.appointment.rentAmount,
      paymentMethod: 'paypal',
      isFocused: false,
      isLoading: false,
    }
  },

  props: ['getAppointments', 'appointment'],
  methods: {
    async submitForm() {
      this.isLoading = true
      const formData = {
        appoinmentId: this.appointment.id,
        amount: this.appointment.rentAmount,
        paymentMethod: 'paypal'
      }

      const res = await  axios.post(`${baseURL}/payments`, formData, {
        headers: headers()
      }).catch(err => {
        console.log(err)
      });

        if(res.data){
          this.getAppointments()
          alert(res.data.message)
          this.isLoading = false
        }
      this.isLoading = false

    }
}
}
</script>

