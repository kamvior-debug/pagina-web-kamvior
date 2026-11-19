<script setup>
import { Clock, FolderOpen, LineChart, SlidersHorizontal } from '@lucide/vue'
import { benefits } from '../data/content.js'

const icons = {
  Clock,
  FolderOpen,
  SlidersHorizontal,
  LineChart,
}
</script>

<template>
  <section class="section band" aria-labelledby="beneficios-titulo">
    <div class="container">
      <div class="section-head">
        <h2 id="beneficios-titulo">Menos tareas manuales. Más tiempo para crecer.</h2>
        <p class="lead">
          La tecnología tiene sentido cuando te quita trabajo repetitivo y te deja ver mejor tu negocio.
        </p>
      </div>

      <div class="benefits">
        <article v-for="benefit in benefits" :key="benefit.id">
          <component
            :is="icons[benefit.icon]"
            :size="22"
            :stroke-width="1.75"
            aria-hidden="true"
          />
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band {
  background: var(--mint);
  color: var(--navy);
}

h2,
h3 {
  color: var(--navy);
}

.lead,
article p {
  color: var(--muted);
}

article :deep(svg) {
  color: var(--teal-text);
}

h3 {
  margin-top: 0.8rem;
  font-size: 1.12rem;
}

article p {
  margin-top: 0.4rem;
}

.benefits {
  display: grid;
  gap: 1.6rem;
}

@media (min-width: 900px) {
  .benefits {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
  }

  article {
    padding-inline: 1.15rem;
  }

  article:first-child {
    padding-left: 0;
  }

  article:last-child {
    padding-right: 0;
  }

  article + article {
    border-left: 1px solid rgba(6, 122, 104, 0.16);
  }
}
</style>
