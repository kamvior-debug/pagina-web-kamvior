// Datos de contacto de KAMVIOR.
// Si cambia el número, actualiza phoneDisplay, phoneTel y whatsappUrl juntos.

export const site = {
  name: 'KAMVIOR',
  descriptor: 'Software & Automation',
  slogan: 'Tecnología que se adapta a tu negocio.',
  url: 'https://kamvior.com/',
  locale: 'es-PE',
  phoneDisplay: '+51 903 537 091',
  phoneTel: '+51903537091',
  whatsappUrl: 'https://wa.me/51903537091',
}

export function whatsappLink(message) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`
}

export const quoteMessage =
  'Hola KAMVIOR, quisiera solicitar una cotización. ¿Podemos conversar sobre lo que necesita mi negocio?'

export const quoteUrl = whatsappLink(quoteMessage)

export function serviceMessage(serviceName) {
  return `Hola KAMVIOR, me interesa el servicio de ${serviceName}. ¿Podemos conversar sobre lo que necesita mi negocio?`
}

export function contactMessage({ name, need }) {
  return [
    'Hola KAMVIOR, quisiera conversar sobre una solución para mi negocio.',
    '',
    `Nombre: ${name}`,
    '',
    'Qué necesito:',
    need,
  ].join('\n')
}

export function assetUrl(file) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${String(file).replace(/^\//, '')}`
}

export function currentYear() {
  return new Date().getFullYear()
}
