
-----

# 🚀 Gestión de Publicaciones (SPA)

Este es un proyecto de aplicación de página única (SPA) desarrollado con **React** y **Vite** para simular la gestión de publicaciones (posts) a través de operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

El proyecto cumple con los requisitos técnicos de manejar rutas (`/` y `/nuevo`) usando **React Router** y simula las peticiones HTTP utilizando la API pública de **JSONPlaceholder**.

## 📋 Requisitos Funcionales Implementados

  * **Listado Principal (`/`):** Muestra los posts obtenidos de la API con sus títulos y cuerpo (body).
  * **Creación (`/nuevo`):** El botón "Añadir Publicación" navega a la ruta `/nuevo` y abre un modal para crear un nuevo post.
  * **Edición/Eliminación:** Cada tarjeta de post tiene botones para abrir el modal de edición o el modal de confirmación de eliminación.
  * **Búsqueda:** Búsqueda *client-side* que filtra los posts por el texto contenido en el título o el cuerpo del post.
  * **Persistencia (Simulada):** Las operaciones de escritura (**POST/PUT/DELETE**) se manejan directamente en el estado (`useState`) del *frontend* para ofrecer una *UI optimista*, ya que JSONPlaceholder simula las operaciones pero no guarda los cambios de forma permanente.
  * **Estados de UI:** Manejo de estados de `loading` (carga inicial) y `error` (fallo en la API).

-----

## 💻 Instalación y Ejecución Local

Sigue estos pasos para clonar el repositorio y ejecutar la aplicación en tu entorno de desarrollo.

### 1\. Clonar el Repositorio

```bash
git clone https://docs.github.com/es/repositories/creating-and-managing-repositories/quickstart-for-repositories
cd nombre-de-tu-carpeta
```

### 2\. Instalación de Dependencias

El proyecto utiliza **Vite + React** y **React Router DOM**.

```bash
npm install
# o
yarn install
```

### 3\. Ejecución del Servidor de Desarrollo

Inicia la aplicación en modo de desarrollo. Se abrirá automáticamente en tu navegador (generalmente en `http://localhost:5173`).

```bash
npm run dev
# o
yarn dev
```

-----

## 🛠️ Build y Despliegue (Deploy)

Para generar la versión optimizada para producción y desplegarla.

### 1\. Generar la Versión de Producción (Build)

Este comando genera los archivos estáticos optimizados en el directorio `dist/`.

```bash
npm run build
# o
yarn build
```

### 2\. Despliegue en Vercel (o Netlify)

Puedes desplegar la aplicación fácilmente conectando tu repositorio de GitHub con un servicio de *hosting* como Vercel.

**Pasos para Vercel:**

1.  Asegúrate de haber subido la última versión de tu código a tu repositorio de **GitHub**.
2.  Ve a **Vercel.com** y haz clic en "New Project".
3.  Conecta tu cuenta de GitHub y selecciona el repositorio de este proyecto.
4.  Vercel detectará automáticamente que es un proyecto **Vite / React**.
5.  Configura las opciones de **Build Settings** (si no lo hace automáticamente):
      * **Build Command:** `npm run build`
      * **Output Directory:** `dist`
6.  Haz clic en "Deploy". Vercel se encargará de ejecutar el *build* y publicar la URL pública.

