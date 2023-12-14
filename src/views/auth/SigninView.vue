
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h3 class="font-semibold text-2xl text-center">Car Service</h3>
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form @submit.prevent="submitForm" class="space-y-3" >

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
            <Label htmlFor="password" >
              Password
            </Label>
            <div class="mt-2">
              <Input  v-model="v$.password.$model" type="password" name="password" id="password"/>
              <p v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
                {{v$.password.$errors[0].$message}}
              </p>
            </div>
          </div>



          <div>
            <Button
                :disabled="this.isLoading"
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Button>
          </div>
        </form>

      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account?
        <RouterLink to="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign up
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
import {required, email, helpers} from '@vuelidate/validators'
import axios from "axios";
import {baseURL} from "@/lib/utils.js";
import {store} from "@/store.js";
export default {
  components: {
    Label,Input,Button
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
      password: '',
      isLoading: false

    }
  },
  validations () {
    return {
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Please enter valid email', email)
      }, // Matches this.email
      password: {
        required: helpers.withMessage('Password is required', required),
      }
    }
  },
  methods: {
    async submitForm () {
      this.isLoading = true
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the field to show it's `$errors`.

      if (!isFormCorrect) return
      // actually submit form
      const formData = {
        email: this.email,
        password: this.password,
      }
      const res = await  axios.post(`${baseURL}/auth/login`, formData).catch(function (error) {
        console.log('Error', error.message);
      })
     if(res?.data){
       store.user = res.data.data
       localStorage.setItem('user', JSON.stringify(res.data.data))
       localStorage.setItem('token', res.data.data.token)

       this.$router.push('/dashboard')
       this.isLoading = false

     }else {
       console.log('Invalid credentials')
       this.isLoading = false

     }
      // actually submit form
    }
  }
}


</script>
