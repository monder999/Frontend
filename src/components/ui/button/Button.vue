<script setup>
import { Primitive } from "radix-vue";
import { buttonVariants } from "./index.js";
import { cn } from "@/lib/utils.js";

defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  as: { type: String, required: false, default: "button" },
  asChild: { type: Boolean, required: false },
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
