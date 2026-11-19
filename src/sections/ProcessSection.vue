<script setup>
import { steps } from '../data/content.js'

const samples = 72
const start = 10
const span = 76
const mid = 50
const amp = 16

const wave = Array.from({ length: samples + 1 }, (_, index) => {
  const t = index / samples
  const x = start + span * t
  const y = mid + amp * Math.cos(Math.PI * t * 3)
  return `${x.toFixed(2)} ${y.toFixed(2)}`
}).join(' L ')

const places = steps.map((_, index) => {
  const t = index / (steps.length - 1)
  const x = start + span * t
  const y = mid + amp * Math.cos(Math.PI * index)
  return { x: `${x.toFixed(2)}%`, y: `${y.toFixed(2)}%` }
})
</script>

<template>
  <section class="section" aria-labelledby="proceso-titulo">
    <div class="container">
      <div class="section-head">
        <h2 id="proceso-titulo">Cómo trabajamos</h2>
        <p class="lead">
          El primero es el diagnóstico: el problema y qué quieres mejorar. De ahí salen el acuerdo, el desarrollo y el acompañamiento.
        </p>
      </div>

      <div class="path">
        <svg class="line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            :d="`M ${wave}`"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </svg>

        <ol class="steps">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            :class="index % 2 === 0 ? 'is-low' : 'is-high'"
            :style="{ '--x': places[index].x, '--y': places[index].y }"
          >
            <span class="knot" aria-hidden="true">0{{ index + 1 }}</span>
            <div class="copy">
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.path {
  position: relative;
}

.line {
  display: none;
}

.steps {
  position: relative;
  display: grid;
  gap: 1.5rem;
}

.steps::before {
  content: "";
  position: absolute;
  top: 1.3rem;
  bottom: 1.3rem;
  left: 1.25rem;
  width: 2px;
  border-radius: 999px;
  background: var(--teal);
}

li {
  display: grid;
  grid-template-columns: 2.6rem minmax(0, 1fr);
  gap: 0.85rem;
  align-items: start;
}

.knot {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 2px solid var(--teal);
  border-radius: 50%;
  background: var(--white);
  color: var(--navy);
  font-weight: 700;
  position: relative;
  z-index: 1;
}

li:first-child .knot {
  background: var(--navy);
  border-color: var(--navy);
  color: var(--white);
}

h3 {
  font-size: 1.08rem;
}

.copy p {
  margin-top: 0.2rem;
  color: var(--muted);
}

@media (min-width: 860px) {
  .path {
    height: 32rem;
  }

  .line {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--teal);
    pointer-events: none;
  }

  .steps {
    position: absolute;
    inset: 0;
    display: block;
  }

  .steps::before {
    display: none;
  }

  li {
    position: absolute;
    left: var(--x);
    top: var(--y);
    display: block;
    width: 0;
    height: 0;
  }

  .knot {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .copy {
    position: absolute;
    z-index: 1;
    width: 12.5rem;
    background: var(--white);
    text-align: center;
  }

  .is-high .copy {
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
  }

  .is-low .copy {
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
  }

  li:first-child .copy {
    left: 0;
    transform: none;
    text-align: left;
  }

  li:last-child .copy {
    left: auto;
    right: 0;
    transform: none;
    text-align: right;
  }
}
</style>
