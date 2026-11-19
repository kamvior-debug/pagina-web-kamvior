<template>
  <section id="nosotros" class="section">
    <div class="container about-grid">
      <div>
        <h2>Conoce KAMVIOR</h2>
        <p class="lead">
          En KAMVIOR creemos que la tecnología debe estar al alcance de quienes desean hacer crecer
          sus ideas y negocios. Desarrollamos soluciones digitales prácticas y personalizadas, con
          una atención cercana y transparente.
        </p>
      </div>

      <div class="principles">
        <article>
          <h3>Misión</h3>
          <p>
            Crear soluciones accesibles de software, automatización y análisis de datos que
            simplifiquen el trabajo de emprendedores y negocios, ayudándolos a mejorar y crecer.
          </p>
        </article>
        <article>
          <h3>Visión</h3>
          <p>
            Ser la opción de confianza para emprendedores y negocios que buscan crecer con
            tecnología práctica, accesible e innovadora.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  gap: 2rem;
}

h2 {
  font-size: clamp(1.75rem, 3vw, 2.4rem);
}

.principles {
  display: grid;
  gap: 1.35rem;
}

article {
  padding-top: 0.9rem;
  border-top: 2px solid var(--teal);
}

h3 {
  font-size: 1.05rem;
}

article p {
  margin-top: 0.45rem;
  color: var(--muted);
}

@media (min-width: 860px) {
  .about-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 4rem;
    align-items: start;
  }
}
</style>
