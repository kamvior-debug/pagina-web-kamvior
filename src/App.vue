<script setup>
import { onMounted, onUnmounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import HeroSection from './sections/HeroSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import SolutionsSection from './sections/SolutionsSection.vue'
import BenefitsSection from './sections/BenefitsSection.vue'
import ProcessSection from './sections/ProcessSection.vue'
import AboutSection from './sections/AboutSection.vue'
import FaqSection from './sections/FaqSection.vue'
import ContactSection from './sections/ContactSection.vue'

let revealFrame = 0
let stopReveal = () => {}

function syncReveal(sections) {
  const height = window.innerHeight
  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    const onScreen = rect.top < height * 0.86 && rect.bottom > height * 0.14
    const away = rect.bottom < 0 || rect.top > height
    if (onScreen) section.classList.add('is-visible')
    else if (away) section.classList.remove('is-visible')
  }
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sections = [...document.querySelectorAll('main section')].filter((section) => section.id !== 'inicio')
  if (reduce) return

  for (const section of sections) section.classList.add('reveal')

  const onScroll = () => {
    cancelAnimationFrame(revealFrame)
    revealFrame = requestAnimationFrame(() => syncReveal(sections))
  }

  syncReveal(sections)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  stopReveal = () => {
    cancelAnimationFrame(revealFrame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
})

onUnmounted(() => stopReveal())
</script>

<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <AppHeader />
  <main id="contenido">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <SolutionsSection />
    <BenefitsSection />
    <ProcessSection />
    <FaqSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
