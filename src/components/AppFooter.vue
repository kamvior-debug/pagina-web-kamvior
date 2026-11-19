<script setup>
import SiteLogo from './SiteLogo.vue'
import { ref } from 'vue'
import { navigation } from '../data/navigation.js'
import { currentYear, site } from '../data/site.js'

const year = currentYear()
const logoMissing = ref(false)
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="identity">
        <a href="#inicio" aria-label="KAMVIOR, ir al inicio">
          <SiteLogo @missing="logoMissing = true" />
        </a>
        <p class="name" :class="{ 'sr-only': !logoMissing }">{{ site.name }}</p>
        <p :class="{ 'sr-only': !logoMissing }">{{ site.descriptor }}</p>
        <p class="slogan" :class="{ 'sr-only': !logoMissing }">{{ site.slogan }}</p>
      </div>

      <nav aria-label="Pie de página">
        <p class="footer-label">Mapa del sitio</p>
        <ul>
          <li v-for="item in navigation" :key="item.id">
            <a :href="`#${item.id}`">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div>
        <p class="footer-label">Contacto</p>
        <ul>
          <li>
            <a :href="`tel:${site.phoneTel}`">{{ site.phoneDisplay }}</a>
          </li>
          <li>
            <a :href="site.whatsappUrl" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="container legal">
      <p>© {{ year }} {{ site.name }}. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 4.25rem 0 2rem;
  background: var(--navy);
  color: var(--on-navy);
}

.footer-grid {
  display: grid;
  gap: 2rem;
}

.identity {
  display: grid;
  gap: 0.35rem;
  justify-items: start;
}

.identity a {
  display: inline-flex;
  margin-bottom: 0.65rem;
  padding: 0.55rem 0.75rem 0.45rem;
  border-radius: 14px;
  background: var(--white);
}

.name {
  color: var(--navy);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.slogan {
  max-width: 28ch;
  color: var(--muted);
}

.footer-label {
  margin-bottom: 1rem;
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
}

li + li {
  margin-top: 0.85rem;
}

a {
  color: var(--white);
  font-size: 1.05rem;
  text-decoration: none;
}

a:hover {
  color: var(--teal);
}

.identity a:hover {
  color: inherit;
}

a:focus-visible {
  outline-color: var(--white);
}

.legal {
  margin-top: 2.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--on-navy);
  font-size: 1rem;
}

@media (min-width: 800px) {
  .footer-grid {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }
}
</style>
