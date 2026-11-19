<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Menu, X } from '@lucide/vue'
import SiteLogo from './SiteLogo.vue'
import { navigation } from '../data/navigation.js'
import { quoteUrl } from '../data/site.js'

const open = ref(false)
const active = ref('inicio')
const headerRef = ref(null)
const panelRef = ref(null)
const toggleRef = ref(null)

let observer
let desktopQuery

function syncHeaderHeight() {
  if (!headerRef.value) return
  document.documentElement.style.setProperty('--header-h', `${headerRef.value.offsetHeight}px`)
}

function focusables() {
  const nodes = []
  if (toggleRef.value && toggleRef.value.offsetParent !== null) nodes.push(toggleRef.value)
  if (panelRef.value) nodes.push(...panelRef.value.querySelectorAll('a, button'))
  return nodes
}

async function toggleMenu() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    panelRef.value?.querySelector('a')?.focus()
  }
}

function closeMenu(restoreFocus) {
  if (!open.value) return
  open.value = false
  if (restoreFocus) toggleRef.value?.focus()
}

function onNavigate() {
  open.value = false
}

function onKeydown(event) {
  if (!open.value || desktopQuery?.matches) return

  if (event.key === 'Escape') {
    closeMenu(true)
    return
  }

  if (event.key !== 'Tab') return

  const items = focusables()
  if (!items.length) return

  const first = items[0]
  const last = items[items.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(open, (isOpen) => {
  document.body.classList.toggle('nav-open', isOpen)
  syncHeaderHeight()
})

onMounted(() => {
  syncHeaderHeight()
  window.addEventListener('resize', syncHeaderHeight)
  document.addEventListener('keydown', onKeydown)

  desktopQuery = window.matchMedia('(min-width: 960px)')
  const onDesktop = () => {
    if (desktopQuery.matches) open.value = false
  }
  desktopQuery.addEventListener('change', onDesktop)
  desktopQuery._onDesktop = onDesktop

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visible?.target?.id) active.value = visible.target.id
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 },
  )

  navigation.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) observer.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', syncHeaderHeight)
  document.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('nav-open')
  observer?.disconnect()
  if (desktopQuery?._onDesktop) {
    desktopQuery.removeEventListener('change', desktopQuery._onDesktop)
  }
})
</script>

<template>
  <header ref="headerRef" class="site-header">
    <div class="accent" aria-hidden="true"></div>
    <div class="container header-bar">
      <a class="brand" href="#inicio" aria-label="KAMVIOR, ir al inicio" @click="onNavigate">
        <SiteLogo priority />
      </a>

      <button
        ref="toggleRef"
        class="menu-toggle"
        type="button"
        aria-controls="menu-principal"
        :aria-expanded="open"
        @click="toggleMenu"
      >
        <Menu v-if="!open" :size="22" :stroke-width="1.75" aria-hidden="true" />
        <X v-else :size="22" :stroke-width="1.75" aria-hidden="true" />
        <span class="sr-only">{{ open ? 'Cerrar menú' : 'Abrir menú' }}</span>
      </button>

      <div id="menu-principal" ref="panelRef" class="nav-panel" :class="{ 'is-open': open }">
        <nav class="nav-links" aria-label="Principal">
          <a
            v-for="item in navigation"
            :key="item.id"
            class="nav-link"
            :href="`#${item.id}`"
            :aria-current="active === item.id ? 'true' : undefined"
            @click="onNavigate"
          >
            {{ item.label }}
          </a>
        </nav>
        <a
          class="btn btn-primary nav-cta"
          :href="quoteUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onNavigate"
        >
          Solicitar cotización
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--white);
  border-bottom: 1px solid var(--line);
}

.accent {
  height: 3px;
  background: var(--teal);
}

.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 4.4rem;
}

.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: var(--white);
  color: var(--navy);
}

.nav-panel {
  display: none;
}

.nav-panel.is-open {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: fixed;
  z-index: 40;
  top: var(--header-h);
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0.75rem 1.25rem 2rem;
  overflow: auto;
  background: var(--white);
}

.nav-links {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0.35rem 0.15rem;
  border-radius: 8px;
  color: var(--navy);
  font-weight: 600;
  text-decoration: none;
}

.nav-link[aria-current='true'] {
  color: var(--teal-text);
}

.nav-cta {
  margin-top: 0.75rem;
}

@media (max-width: 959px) {
  .nav-cta {
    width: 100%;
  }
}

@media (min-width: 960px) {
  .menu-toggle {
    display: none;
  }

  .nav-panel,
  .nav-panel.is-open {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: static;
    gap: 0.15rem;
    margin-left: auto;
    padding: 0;
    overflow: visible;
    background: transparent;
  }

  .nav-links {
    flex-direction: row;
  }

  .nav-link {
    min-height: 44px;
    padding: 0.4rem 0.7rem;
  }

  .nav-link[aria-current='true'] {
    border-radius: 0;
    box-shadow: inset 0 -2px 0 var(--teal);
  }

  .nav-link:hover {
    color: var(--teal-text);
  }

  .nav-cta {
    margin-top: 0;
    margin-left: 0.45rem;
    width: auto;
  }
}
</style>
