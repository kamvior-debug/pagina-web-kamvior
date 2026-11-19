# KAMVIOR

Sitio institucional estático de KAMVIOR. Está hecho con Vue 3, JavaScript y Vite. No tiene backend, base de datos ni panel de administración.

La página se puede publicar en GitHub Pages y también se puede subir la carpeta `dist` a cualquier hosting de archivos estáticos.

## Requisitos

- Node.js 20.19 o superior. El flujo de publicación usa Node.js 24.
- npm.

En esta computadora, `node` y `npm` no estaban en el PATH del sistema. La compilación de esta versión se hizo con Node.js 24.22.1. Si `npm` no se reconoce en tu terminal, instala Node.js LTS y abre una terminal nueva:

```powershell
winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements
```

## Desarrollo

Desde la carpeta del proyecto:

```powershell
npm install
npm run dev
```

Vite muestra una dirección local, normalmente `http://localhost:5173/`.

Para revisar la compilación:

```powershell
npm run build
npm run preview
```

`npm run build` genera la carpeta `dist`.

## Ruta base

Vite necesita saber si el sitio vive en la raíz del dominio o dentro de una carpeta.

| Dónde se ve el sitio | Valor de `VITE_BASE_PATH` |
| --- | --- |
| `https://kamvior.com/` | `/` |
| `https://kamvior-debug.github.io/pagina-web-kamvior/` | `/pagina-web-kamvior/` |

En local, el valor por defecto es `/`. Para probar la ruta del repositorio antes de compilar:

```powershell
$env:VITE_BASE_PATH = "/pagina-web-kamvior/"
npm run build
Remove-Item Env:VITE_BASE_PATH
```

En GitHub Actions el orden es este:

1. Si existe la variable de repositorio `VITE_BASE_PATH`, se usa esa.
2. Si no existe, se usa `base_path` de `actions/configure-pages`.
3. Si Pages todavía no informa una ruta, se usa `/`.

Eso cubre los dos escenarios sin cambiar el código:

- Antes de asociar el dominio, un sitio de proyecto se publica en `/pagina-web-kamvior/` y la acción informa esa ruta.
- Cuando el dominio personalizado ya está guardado en Pages, la ruta base queda vacía y el build usa `/`.

No hace falta un archivo `CNAME` en este flujo. GitHub indica que, al publicar con un workflow de Actions, ese archivo no es necesario y se ignora. El dominio se guarda en Settings > Pages.

Recomendación: publica y revisa primero `https://kamvior-debug.github.io/pagina-web-kamvior/`. Asocia `kamvior.com` después. Si guardas el dominio antes de que el DNS apunte a GitHub, el dominio todavía no va a abrir el sitio.

## Marca

El encabezado y el pie usan `public/brand/kamvior-logo.png`.

Ese archivo no estaba en el proyecto. Se preparó a partir de `Logotipo tecnológico KAMVIOR en turquesa y azul marino-1.png`, porque coincide con la K geométrica, el azul marino, el turquesa y el acento de la palabra "tu". Se redujo de forma proporcional a 1440×480 y el fondo blanco se volvió transparente. El diseño no se redibujó.

No existe `public/brand/kamvior-icon.png`. El favicon usa, de forma temporal, el logotipo completo. Cuando tengas el ícono de la K geométrica, sin fondo ni recuadro, guárdalo en esa ruta y cambia el enlace del favicon en `index.html`.

En Descargas también están `KAMVIOR_Logo_Principal.png` y `KAMVIOR_Icono.png`. Son otra marca: un camaleón con las letras KV y, en el ícono, un recuadro azul. No se usaron porque no corresponden a la K geométrica aprobada para este sitio. Si esa fuera la marca definitiva, dímelo antes de reemplazar los archivos.

## Datos que se pueden editar

- Contacto, WhatsApp y mensajes: `src/data/site.js`
- Menú: `src/data/navigation.js`
- Servicios: `src/data/services.js`
- Ejemplos por tipo de negocio: `src/data/solutions.js`
- Beneficios, proceso y preguntas: `src/data/content.js`

## Formulario

No hay servidor. El formulario pide el nombre y qué necesita el negocio. Al enviar, abre WhatsApp con el mensaje armado. La persona tiene que confirmar el envío en WhatsApp. Si la ventana no se abre, la página muestra un enlace de respaldo.

## Publicar en GitHub

El repositorio es [kamvior-debug/pagina-web-kamvior](https://github.com/kamvior-debug/pagina-web-kamvior). El CNAME de `www` debe apuntar a `kamvior-debug.github.io`, porque esa es la cuenta dueña del repositorio.

Dominio: `kamvior.com`

La verificación del dominio en GitHub no publica el sitio. Solo demuestra que la cuenta puede usarlo.

1. Sube el proyecto a GitHub.
   - El repositorio ya está creado: `kamvior-debug/pagina-web-kamvior`.
   - La rama principal debe llamarse `main`, porque el workflow escucha esa rama.
   - No subas `node_modules` ni `dist`. El `.gitignore` ya los excluye.

2. Activa GitHub Actions.
   - El archivo `.github/workflows/deploy.yml` entra con el código.
   - En el repositorio, abre la pestaña Actions y permite los workflows si GitHub lo pide.

3. Configura Settings > Pages.
   - Entra a Settings > Pages.
   - En Build and deployment, Source, elige GitHub Actions.

4. La fuente de publicación es GitHub Actions, no una rama.
   - El workflow usa las acciones oficiales `checkout`, `setup-node`, `configure-pages`, `upload-pages-artifact` y `deploy-pages`.
   - Compila el proyecto y publica el contenido de `dist`.

5. Revisa el despliegue.
   - En Actions, abre el workflow "Desplegar sitio en GitHub Pages".
   - Si el primer intento falla porque Pages aún no estaba configurado, vuelve a ejecutarlo con Run workflow.
   - Al terminar, la URL de prueba debería ser `https://kamvior-debug.github.io/pagina-web-kamvior/`.
   - Confirma que el logotipo, los estilos y los enlaces de WhatsApp cargan.

6. Asocia el dominio personalizado.
   - En Settings > Pages, Custom domain, escribe `kamvior.com` y guarda.
   - No hace falta crear un archivo `CNAME` para este workflow.
   - Espera a que termine un nuevo despliegue. A partir de ese momento la ruta base automática pasa a ser `/`.

7. Configura el DNS en Hostinger, sin cambiar los nameservers.
   - Entra a hPanel > Dominios > `kamvior.com` > DNS / Zona DNS.
   - No cambies los nameservers. Deben seguir siendo los de Hostinger.
   - No borres el registro TXT que verifica la propiedad del dominio en GitHub.
   - No borres registros de correo: MX, SPF, DKIM ni otros CNAME o TXT usados por el email.
   - No crees un comodín `*.kamvior.com`. GitHub advierte que un DNS wildcard facilita el secuestro de subdominios.
   - Hostinger normalmente no ofrece ALIAS ni ANAME para el dominio apex. Usa los registros A y AAAA.
   - Si `@` ya tiene un registro A o AAAA apuntando al parking o al hosting de Hostinger, reemplaza esos registros del sitio web. Un A o AAAA extra en `@` puede impedir que GitHub emita el certificado HTTPS. No reemplaces los registros de correo.
   - Crea estos registros, según la documentación vigente de GitHub Pages:

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `kamvior-debug.github.io` |

   - El CNAME no lleva `https://` ni una ruta.
   - La propagación puede tardar desde unos minutos hasta 24 horas. GitHub recomienda comprobarlo con `dig`.

8. Verifica HTTPS.
   - Cuando el DNS ya apunte a GitHub y el certificado esté disponible, en Settings > Pages activa Enforce HTTPS.
   - No lo actives antes: GitHub puede no generar el certificado si el DNS todavía no coincide.
   - `www.kamvior.com` debe redirigir a `kamvior.com` si el CNAME de `www` apunta a `kamvior-debug.github.io` y el dominio guardado en Pages es el apex.
   - Abre `https://kamvior.com/` y confirma el candado.

Documentación usada:

- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## GitHub Pages y un sitio comercial

GitHub Pages no está pensado ni permitido como hosting gratuito para operar un negocio en línea, un sitio de comercio electrónico u otro sitio dirigido principalmente a facilitar transacciones comerciales o a ofrecer software comercial como servicio. Tampoco debe usarse para transacciones sensibles como contraseñas o tarjetas.

KAMVIOR presenta servicios y abre una conversación por WhatsApp. No envía pagos desde la página, pero eso no significa que el alojamiento cumpla automáticamente las condiciones de GitHub. Conviene leer las condiciones vigentes antes de dejar el sitio comercial solo en GitHub Pages.

El proyecto sigue siendo portable. Con `VITE_BASE_PATH=/`, la carpeta `dist` se puede publicar en Hostinger, Netlify, Cloudflare Pages u otro hosting estático.

## Estructura

```text
src/
  assets/
  components/
  data/
  sections/
  styles/
  App.vue
  main.js
public/
  brand/
  robots.txt
  sitemap.xml
.github/workflows/deploy.yml
```

No se usa Vue Router: la página es una sola, con secciones y anclas. Así se evita configuración extra en GitHub Pages.
