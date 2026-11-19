<script setup>
import { computed, ref } from 'vue'
import { quoteUrl, site } from '../data/site.js'

const panels = [
  {
    id: 'resumen',
    label: 'Resumen',
    note: 'Movimiento del negocio',
    metrics: [
      { label: 'Pedidos', width: '100%' },
      { label: 'Reservas', width: '72%' },
      { label: 'Stock', width: '48%' },
    ],
    bars: [46, 72, 54, 88, 63, 78, 58],
  },
  {
    id: 'pedidos',
    label: 'Pedidos',
    note: 'Pedidos del día',
    metrics: [
      { label: 'En curso', width: '84%' },
      { label: 'Listos', width: '58%' },
      { label: 'Pendientes', width: '36%' },
    ],
    bars: [40, 68, 52, 82, 46, 74, 38],
  },
  {
    id: 'inventario',
    label: 'Inventario',
    note: 'Estado del stock',
    metrics: [
      { label: 'Disponible', width: '92%' },
      { label: 'Por reponer', width: '44%' },
      { label: 'En revisión', width: '26%' },
    ],
    bars: [72, 40, 78, 54, 86, 48, 64],
  },
  {
    id: 'reservas',
    label: 'Reservas',
    note: 'Reservas de la semana',
    metrics: [
      { label: 'Hoy', width: '62%' },
      { label: 'Mañana', width: '80%' },
      { label: 'La semana', width: '50%' },
    ],
    bars: [34, 60, 76, 48, 88, 58, 42],
  },
]

const activeId = ref(panels[0].id)
const active = computed(() => panels.find((panel) => panel.id === activeId.value) || panels[0])
</script>

<template>
  <section id="inicio" class="section hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="kicker">{{ site.descriptor }}</p>
        <h1>Digitaliza, automatiza y haz crecer tu negocio.</h1>
        <p class="lead">
          Desarrollamos páginas web, software a medida y automatizaciones para ayudarte a
          simplificar tareas, organizar tu información y mejorar la gestión de tu negocio.
        </p>
        <div class="actions">
          <a class="btn btn-secondary" href="#servicios">Explorar servicios</a>
          <a class="btn btn-primary" :href="quoteUrl" target="_blank" rel="noopener noreferrer">
            Solicitar cotización
          </a>
        </div>
        <p class="fine promise">El alcance, el precio y el plazo se conversan antes de empezar.</p>
      </div>

      <figure class="demo">
        <div class="demo-window">
          <div class="demo-chrome">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot is-accent"></span>
            <p>Panel de gestión</p>
            <span class="tag">Vista demostrativa</span>
          </div>
          <div class="demo-body">
            <div class="demo-side" role="tablist" aria-label="Secciones del panel">
              <button
                v-for="panel in panels"
                :key="panel.id"
                type="button"
                role="tab"
                :aria-selected="panel.id === active.id"
                @click="activeId = panel.id"
              >
                {{ panel.label }}
              </button>
            </div>
            <div class="demo-main" role="tabpanel" :aria-label="active.label">
              <div class="metrics">
                <div v-for="metric in active.metrics" :key="metric.label">
                  <span>{{ metric.label }}</span>
                  <i :style="{ width: metric.width }"></i>
                </div>
              </div>
              <div class="chart">
                <span class="chart-label">{{ active.note }}</span>
                <div class="bars" aria-hidden="true">
                  <span
                    v-for="(height, index) in active.bars"
                    :key="`${active.id}-${index}`"
                    :style="{ height: `${height}%` }"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <figcaption>
          Demostración visual de una interfaz de gestión. No muestra datos ni resultados de clientes.
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero.section {
  background: var(--navy);
  color: var(--white);
  padding-top: 1.6rem;
  padding-bottom: 3.2rem;
}

.hero-grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

.hero-grid > * {
  min-width: 0;
}

.kicker {
  margin-bottom: 0.85rem;
  color: var(--teal);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  max-width: 16ch;
  color: var(--white);
  font-size: clamp(2.15rem, 4.6vw, 3.55rem);
}

.hero .lead,
.promise,
figcaption {
  color: var(--on-navy);
}

.hero .lead {
  max-width: 42rem;
}

.hero :deep(.btn-primary) {
  background: var(--white);
  color: var(--navy);
}

.hero :deep(.btn-primary:hover) {
  background: #e7f7f4;
}

.hero :deep(.btn-secondary) {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.45);
}

.hero :deep(.btn-secondary:hover) {
  background: rgba(255, 255, 255, 0.08);
}

.hero :deep(a:focus-visible) {
  outline-color: var(--white);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.6rem;
}

.promise {
  margin-top: 0.95rem;
}

.demo-window {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--white);
  box-shadow: var(--shadow);
}

.demo-chrome {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 46px;
  padding: 0.7rem 0.9rem;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.demo-chrome p {
  margin-left: 0.35rem;
  color: var(--navy);
  font-size: 0.86rem;
  font-weight: 700;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d5dce6;
}

.dot.is-accent {
  background: var(--teal);
}

.tag {
  margin-left: auto;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(0, 168, 143, 0.12);
  color: var(--teal-text);
  font-size: 0.72rem;
  font-weight: 700;
}

.demo-body {
  display: grid;
  min-height: 280px;
}

.demo-side {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.7rem;
  background: #fbfcfd;
  border-bottom: 1px solid var(--line);
}

.demo-side button {
  flex: none;
  min-height: 40px;
  padding: 0.4rem 0.75rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 700;
}

.demo-side button[aria-selected='true'] {
  background: rgba(0, 168, 143, 0.14);
  color: var(--navy);
}

.demo-main {
  display: grid;
  gap: 0.85rem;
  padding: 0.9rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.metrics div {
  padding: 0.65rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 10px;
}

.metrics span,
.chart-label {
  display: block;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
}

.metrics i {
  display: block;
  height: 4px;
  margin-top: 0.7rem;
  border-radius: 999px;
  background: var(--teal);
}

.metrics div:nth-child(2) i {
  background: var(--navy);
}

.chart {
  display: grid;
  align-content: end;
  gap: 0.85rem;
  min-height: 168px;
  padding: 0.85rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: linear-gradient(180deg, #f7fbfa 0%, #ffffff 70%);
}

.bars {
  display: flex;
  align-items: end;
  gap: 0.45rem;
  height: 112px;
}

.bars span {
  flex: 1;
  border-radius: 6px 6px 2px 2px;
  background: var(--navy);
}

.bars span:nth-child(even) {
  background: var(--teal);
}

figcaption {
  margin-top: 0.75rem;
  font-size: 0.84rem;
}

@media (min-width: 720px) {
  .demo-body {
    grid-template-columns: 132px 1fr;
  }

  .demo-side {
    display: grid;
    align-content: start;
    border-bottom: 0;
    border-right: 1px solid var(--line);
  }

  .demo-side button {
    text-align: left;
  }
}

@media (min-width: 980px) {
  .hero.section {
    padding-top: 2.2rem;
    padding-bottom: 4rem;
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
    gap: 3rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hero-copy,
  .demo {
    animation: enter 0.7s ease both;
  }

  .demo {
    animation-delay: 0.08s;
  }
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
