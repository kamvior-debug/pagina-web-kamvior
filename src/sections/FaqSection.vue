<script setup>
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { faq } from '../data/content.js'

const openId = ref('')

function toggle(id) {
  openId.value = openId.value === id ? '' : id
}
</script>

<template>
  <section class="section surface" aria-labelledby="faq-titulo">
    <div class="container faq-layout">
      <div class="section-head">
        <h2 id="faq-titulo">Preguntas frecuentes</h2>
        <p class="lead">Respuestas directas, sin precios fijos ni promesas que no podamos cumplir.</p>
      </div>

      <div class="faq-list">
        <article v-for="item in faq" :key="item.id" class="faq-item">
          <h3>
            <button
              :id="`faq-button-${item.id}`"
              type="button"
              :aria-expanded="openId === item.id"
              :aria-controls="`faq-panel-${item.id}`"
              @click="toggle(item.id)"
            >
              <span>{{ item.question }}</span>
              <ChevronDown
                :size="20"
                :stroke-width="1.75"
                aria-hidden="true"
                :class="{ 'is-open': openId === item.id }"
              />
            </button>
          </h3>
          <div
            :id="`faq-panel-${item.id}`"
            role="region"
            :aria-labelledby="`faq-button-${item.id}`"
            v-show="openId === item.id"
          >
            <p>{{ item.answer }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-layout {
  display: grid;
  gap: 0.5rem;
}

.faq-item {
  border-top: 1px solid var(--line);
}

.faq-item:last-child {
  border-bottom: 1px solid var(--line);
}

h3 {
  font-size: 1rem;
  letter-spacing: 0;
}

button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-height: 56px;
  padding: 1rem 0;
  border: 0;
  background: transparent;
  color: var(--navy);
  font-weight: 700;
  text-align: left;
}

button :deep(svg) {
  flex: none;
  transition: transform 0.16s ease;
}

button :deep(.is-open) {
  transform: rotate(180deg);
}

.faq-item p {
  max-width: 68ch;
  padding-bottom: 1.05rem;
  color: var(--muted);
}

@media (min-width: 860px) {
  .faq-layout {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 3rem;
    align-items: start;
  }

  .section-head {
    margin-bottom: 0;
  }
}
</style>
