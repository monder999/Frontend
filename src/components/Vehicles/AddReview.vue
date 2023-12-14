<template>
  <DialogContent class="sm:max-w-xl">
    <DialogHeader>
      <DialogTitle>Add Review</DialogTitle>
      <DialogDescription>
        Add vehicle review and continue. Click add when you're done.
      </DialogDescription>
    </DialogHeader>
    <form @submit.prevent="submitForm" class="grid gap-3 py-4">
      <div>
        <Label htmlFor="rating">
          Rating
        </Label>
        <div class="mt-2">

          <div class="flex space-x-1">
            <label v-for="(rating, index) in [...Array(5)]" name="rating">
              <input
                  class="sr-only"
                  type="radio" :value="index + 1"
                  @input="onChange($event)" v-model="this.rating"/>
              <span
                  v-if="(index + 1) <= (this.hover || this.rating)"
                  @mouseenter="this.setHover(index + 1)"
                  @mouseleave="this.setHover(null)"
              >
                  <StarFill class="h-5 w-5 cursor-pointer"/>
                </span>
              <span v-else @mouseenter="this.setHover(index + 1)" @mouseleave="this.setHover(null)"
              >
                  <StarIcon class="h-5 w-5 cursor-pointer"/>
                </span>
            </label>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="message">
          Message
        </Label>
        <div class="mt-2">
          <Textarea rows="4"  class="max-h-[220px]" v-model="this.message" name="message" id="message"/>

        </div>
      </div>

      <DialogFooter>
        <Button :disabled="!this.rating" type="submit">
          Add
        </Button>
      </DialogFooter>
    </form>

  </DialogContent>

</template>

<script>
import {Button} from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  StarIcon,
} from '@heroicons/vue/24/outline'
import {StarIcon as StarFill} from '@heroicons/vue/24/solid';

import {Textarea} from "../ui/textarea";
import {Label} from '../ui/label'

import axios from "axios";

import {store} from "@/store.js";
import {baseURL, headers} from "@/lib/utils.js";


const {user} = store;
export default {
  components: {
    StarIcon,
    StarFill,
    Label, Button,
    Textarea,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  },


  data() {
    return {
      rating: null,
      message: '',
      hover: null,
    }
  },

  props: ['details'],
  methods: {
    onChange(event) {
      this.rating = event.target.value;

    },
    setHover(current) {
      this.hover = current;
    },
    async submitForm() {

      // actually submit form
      if(!this.rating) return;

      const formData = {
        vehicleId: this.details.vehicleId,
        rating: this.rating,
        message: this.message,

      }


      const res = await axios.post(`${baseURL}/reviews`, formData, {
        headers: headers()
      });

      if (res.data) {
        this.rating = null
        this.message = ''
      }

    }
  }

}


</script>

