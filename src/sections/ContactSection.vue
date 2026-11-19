<script setup>
import { reactive, ref } from 'vue'
import { contactMessage, site, whatsappLink } from '../data/site.js'

const form = reactive({
  name: '',
  need: '',
})

const errors = ref({})
const readyLink = ref('')

function validate() {
  const next = {}
  if (!form.name.trim()) next.nombre = 'Ingresa tu nombre.'
  if (!form.need.trim()) next.necesidad = 'Cuéntanos qué necesitas.'
  errors.value = next
  return Object.keys(next).length === 0
}

function onSubmit() {
  readyLink.value = ''
  if (!validate()) {
    const firstId = Object.keys(errors.value)[0]
    document.getElementById(firstId)?.focus()
    return
  }

  const url = whatsappLink(
    contactMessage({
      name: form.name.trim(),
      need: form.need.trim(),
    }),
  )

  readyLink.value = url
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="contacto" class="section">
    <div class="container contact-grid">
      <div>
        <h2>Cuéntanos qué necesita tu negocio</h2>
        <p class="lead">
          Conversemos sobre tu idea y encontremos una solución adaptada a tus necesidades.
        </p>
        <div class="direct">
          <p class="direct-label">WhatsApp</p>
          <a class="phone" :href="`tel:${site.phoneTel}`">{{ site.phoneDisplay }}</a>
          <a class="text-link" :href="site.whatsappUrl" target="_blank" rel="noopener noreferrer">
            Abrir chat de WhatsApp
          </a>
          <p class="fine">
            Tus datos se abren en WhatsApp. Este sitio no los envía a un servidor.
          </p>
        </div>
      </div>

      <form class="form" novalidate @submit.prevent="onSubmit">
        <p class="fine">Los campos con * son obligatorios.</p>

        <p v-if="Object.keys(errors).length" class="form-alert" role="alert">
          Revisa los campos marcados para continuar.
        </p>

        <div class="fields">
          <div class="field" :class="{ 'is-invalid': errors.nombre }">
            <label for="nombre">Nombre <span aria-hidden="true">*</span></label>
            <input
              id="nombre"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              maxlength="80"
              aria-required="true"
              :aria-invalid="Boolean(errors.nombre)"
              :aria-describedby="errors.nombre ? 'nombre-error' : undefined"
            />
            <p v-if="errors.nombre" id="nombre-error" class="field-error">{{ errors.nombre }}</p>
          </div>

          <div class="field" :class="{ 'is-invalid': errors.necesidad }">
            <label for="necesidad">Qué necesitas <span aria-hidden="true">*</span></label>
            <textarea
              id="necesidad"
              v-model="form.need"
              name="need"
              maxlength="800"
              placeholder="Por ejemplo, un dashboard de ventas o automatizar un Excel."
              aria-required="true"
              :aria-invalid="Boolean(errors.necesidad)"
              :aria-describedby="errors.necesidad ? 'necesidad-error' : undefined"
            ></textarea>
            <p v-if="errors.necesidad" id="necesidad-error" class="field-error">{{ errors.necesidad }}</p>
          </div>
        </div>

        <button class="btn btn-primary" type="submit">Consultar por WhatsApp</button>

        <p v-if="readyLink" class="form-status" role="status">
          El mensaje está listo. No se envía solo: confírmalo en WhatsApp.
          <a :href="readyLink" target="_blank" rel="noopener noreferrer">Continuar en WhatsApp</a>
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-size: clamp(1.75rem, 3vw, 2.4rem);
}

.contact-grid {
  display: grid;
  gap: 2rem;
}

.direct {
  display: grid;
  justify-items: start;
  gap: 0.35rem;
  margin-top: 1.25rem;
}

.direct-label {
  color: var(--teal-text);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.phone {
  color: var(--navy);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-decoration: none;
}

.phone:hover {
  color: var(--teal-text);
}

.direct .fine {
  margin-top: 0.45rem;
  max-width: 36ch;
}

.form {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--white);
}

.fields {
  display: grid;
  gap: 0.95rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

label {
  font-size: 0.92rem;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  background: var(--white);
  color: var(--navy);
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.field.is-invalid input,
.field.is-invalid select,
.field.is-invalid textarea {
  border-color: var(--danger);
}

.field-error,
.form-alert {
  color: var(--danger);
  font-size: 0.875rem;
  font-weight: 600;
}

.form-status {
  color: var(--navy);
  font-size: 0.92rem;
}

.form-status a {
  color: var(--teal-text);
  font-weight: 700;
}

.btn {
  width: 100%;
}

@media (min-width: 720px) {
  .form {
    padding: 1.6rem;
  }

  .btn {
    width: auto;
  }
}

@media (min-width: 900px) {
  .contact-grid {
    grid-template-columns: 0.85fr 1.15fr;
    gap: 3rem;
    align-items: start;
  }
}
</style>
