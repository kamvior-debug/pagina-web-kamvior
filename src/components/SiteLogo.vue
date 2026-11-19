<script setup>
import { ref } from 'vue'
import { assetUrl } from '../data/site.js'

defineProps({
  priority: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['missing'])
const missing = ref(false)
const src = assetUrl('brand/kamvior-logo.png')

function onError() {
  missing.value = true
  emit('missing')
}
</script>

<template>
  <span class="site-logo">
    <img
      v-if="!missing"
      :src="src"
      alt=""
      width="1440"
      height="480"
      :fetchpriority="priority ? 'high' : 'low'"
      :loading="priority ? 'eager' : 'lazy'"
      decoding="async"
      @error="onError"
    />
    <span v-else class="site-logo-fallback" aria-hidden="true">KAMV<span>I</span>OR</span>
  </span>
</template>

<style scoped>
.site-logo {
  display: block;
}

.site-logo img {
  width: auto;
  height: auto;
  max-width: min(232px, 64vw);
  max-height: 78px;
  aspect-ratio: 3 / 1;
  object-fit: contain;
}

.site-logo-fallback {
  display: inline-block;
  color: var(--navy);
  font-weight: 700;
  letter-spacing: 0.12em;
  font-size: 1.15rem;
}

.site-logo-fallback span {
  color: var(--teal);
}
</style>
