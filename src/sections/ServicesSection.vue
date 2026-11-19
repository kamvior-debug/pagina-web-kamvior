<script setup>
import { ArrowUpRight, Bot, Code, Database, LayoutDashboard, Workflow } from '@lucide/vue'
import { services } from '../data/services.js'
import { serviceMessage, whatsappLink } from '../data/site.js'

const icons = {
  Code,
  LayoutDashboard,
  Database,
  Workflow,
  Bot,
}
</script>

<template>
  <section id="servicios" class="section surface">
    <div class="container">
      <div class="section-head">
        <h2>Nuestros servicios</h2>
        <p class="lead">
          Software, datos y automatización para ordenar el trabajo de tu negocio.
        </p>
      </div>

      <div class="service-grid">
        <article v-for="service in services" :key="service.id" class="service">
          <span class="icon" aria-hidden="true">
            <component :is="icons[service.icon]" :size="24" :stroke-width="1.75" />
          </span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <a
            class="text-link"
            :href="whatsappLink(serviceMessage(service.title))"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Consultar ${service.title} por WhatsApp`"
          >
            Consultar por WhatsApp
            <ArrowUpRight :size="16" :stroke-width="1.75" aria-hidden="true" />
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(0, 168, 143, 0.12);
  color: var(--teal-text);
}

h3 {
  margin-top: 0.85rem;
  font-size: 1.12rem;
}

.service p {
  margin-top: 0.55rem;
  color: var(--muted);
}

.service :deep(svg) {
  color: var(--teal);
}

.text-link {
  margin-top: 1rem;
}

.service-grid {
  display: grid;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  background: var(--white);
}

.service {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;
  padding: 1.35rem 1.2rem 1.4rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.service:hover {
  background: #f8fbfa;
}

@media (min-width: 720px) {
  .service-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .service-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .service:nth-child(-n + 3) {
    grid-column: span 2;
  }

  .service:nth-child(n + 4) {
    grid-column: span 3;
  }
}
</style>
