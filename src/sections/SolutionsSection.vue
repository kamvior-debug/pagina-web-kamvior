<script setup>
import {
  BedDouble,
  Building2,
  Compass,
  Store,
  Truck,
  UtensilsCrossed,
} from '@lucide/vue'
import { solutions } from '../data/solutions.js'

const icons = {
  UtensilsCrossed,
  BedDouble,
  Store,
  Truck,
  Compass,
  Building2,
}
</script>

<template>
  <section id="soluciones" class="section">
    <div class="container">
      <div class="section-head">
        <h2>Para distintos negocios</h2>
        <p class="lead">
          Trabajamos con restaurantes, hospedajes, tiendas y otros equipos. La solución se conversa según cada caso.
        </p>
      </div>

      <ul class="audience">
        <li v-for="item in solutions" :key="item.id">
          <span class="mark" aria-hidden="true">
            <component :is="icons[item.icon]" :size="22" :stroke-width="1.75" />
          </span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.audience {
  display: grid;
  gap: 0.75rem;
}

li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 64px;
  padding: 0.85rem 1rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--white);
  color: var(--navy);
  font-weight: 700;
}

.mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: rgba(0, 168, 143, 0.14);
  color: var(--teal-text);
}

@media (min-width: 720px) {
  .audience {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
