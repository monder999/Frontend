
<template>
  <DialogContent class="sm:max-w-xl">
    <DialogHeader>
      <DialogTitle class="capitalize">{{appointment.name}}</DialogTitle>
      <DialogDescription>
       View the appointment deatils
      </DialogDescription>
    </DialogHeader>

    <div class="text-sm text-gray-400">
     {{appointment.description}}
    </div>
  </DialogContent>

</template>

<script>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

export default {
  components: {Button,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

  },

  data () {
    return {
    }
  },

  props: ['appointment'],

}
</script>

