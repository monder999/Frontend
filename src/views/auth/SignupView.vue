
<template>
   <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h3 class="font-semibold text-2xl text-center">Car Service</h3>
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
  
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form @submit.prevent="submitForm" class="space-y-3" >

                <div>
                  <Label htmlFor="firstName" >
                    First Name
                  </Label>
                  <div class="mt-2">
                   <Input v-model="v$.firstName.$model" name="firstName" id="firstName"/>
                    <p v-if="v$.firstName.$error" class="text-red-500 text-sm mt-1">
                    {{v$.firstName.$errors[0].$message}}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName" >
                    Last Name
                  </Label>
                  <div class="mt-2">
                    <Input v-model="v$.lastName.$model" name="lastName" id="firstName"/>
                    <p v-if="v$.lastName.$error" class="text-red-500 text-sm mt-1">
                      {{v$.lastName.$errors[0].$message}}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" >
                   Email
                  </Label>
                  <div class="mt-2">
                    <Input v-model="v$.email.$model" name="email" id="email"/>
                    <p v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
                      {{v$.email.$errors[0].$message}}
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" >
                    Date of Birth
                  </Label>
                  <div class="mt-2">
                    <VueTailwindDatepicker v-model="birth"  as-single :formatter="formatter"/>
<!--                    <p v-if="v$.email.$error" class="text-red-500 text-sm mt-1">-->
<!--                      {{v$.email.$errors[0].$message}}-->
<!--                    </p>-->
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" >
                    Password
                  </Label>
                  <div class="mt-2">
                    <Input  v-model="v$.password.$model" type="password" name="password" id="password"/>
                    <p v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
                      {{v$.password.$errors[0].$message}}
                    </p>
<!--                    <p v-if="v$.password.required || v$.password.minLength || v$.password.hasLetter || v$.password.hasNumber || v$.password.hasSpecialCharacter"-->
<!--                       class="text-red-500 text-sm mt-1">-->
<!--                      Password must be at least 8 characters long and contain letters, numbers, and a special character.-->
<!--                    <div v-if="!v$.password.minLength || !v$.password.hasLetter || !v$.password.hasNumber || !v$.password.hasSpecialCharacter">-->
<!--                      Password must be at least 8 characters long and contain letters, numbers, and a special character.-->
<!--                    </div>-->
<!--                    </p>-->

                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" >
                    Confirm Password
                  </Label>
                  <div class="mt-2">
                    <Input  v-model="v$.confirmPassword.$model" type="password" name="confirmPassword" id="confirmPassword"/>
                    <p v-if="v$.confirmPassword.$error" class="text-red-500 text-sm mt-1">
                      {{v$.confirmPassword.$errors[0].$message}}
                    </p>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </Button>
                </div>
              </form>

            </div>
  
            <p class="mt-10 text-center text-sm text-gray-500">
             Already have an account?
              <RouterLink to="/signin" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
               Sign in
              </RouterLink>
            </p>
          </div>
        </div>
  </template>


<script>
import Label from "../../components/ui/label/Label.vue";
import Input from "../../components/ui/input/Input.vue";
import Button from "../../components/ui/button/Button.vue";
import { useVuelidate } from '@vuelidate/core'
import {required, email, sameAs, helpers, maxLength, minLength, alpha} from '@vuelidate/validators'
import InputWithLabel from "@/components/InputWithLabel.vue";
import axios from 'axios'

import VueTailwindDatepicker from "vue-tailwind-datepicker";
import {ref} from "vue";
import {baseURL} from "@/lib/utils.js";

const formatter = ref({
  date: 'DD-MM-YYYY',
  month: 'MM',
})
export default {
  components: {
    VueTailwindDatepicker,
    InputWithLabel,
    Label,Input,Button
  },
  setup () {
    return {
      v$: useVuelidate(),
      formatter
    }
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birth: ''

    }
  },
  validations () {
    return {
      firstName: {
        required: helpers.withMessage('First name is required', required),
        maxLength: helpers.withMessage('First name max length is 20', maxLength(20))
      }, // Matches this.firstName
      lastName: {
        required: helpers.withMessage('Last name is required', required),
        maxLength: helpers.withMessage('Last name max length is 20', maxLength(20))
      }, // Matches this.lastName
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Please enter valid email', email)
      }, // Matches this.email
      password: {
        required: helpers.withMessage('Password is required', required),
        hasMatched: helpers.withMessage('Password at least 8 characters, at least one uppercase letter, one lowercase letter and one number:',
            helpers.regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/)),
      },
      confirmPassword: {
        required: helpers.withMessage('Confirm Password is required', required),
        sameAs: helpers.withMessage('Confirm Password must be same with password',sameAs(this.password) )
      },

    }
  },
  methods: {
    async submitForm () {

      console.log(this.v$.password)
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return
      // actually submit form
      const formData = {
        roleId: 1,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        birth: this.birth
      }
      const res = await  axios.post(`${baseURL}/auth/register`, formData);

      if(res.data){
        alert(res.data.message)
        this.$route.push('/signin')
      }

    }
  }
}


</script>
