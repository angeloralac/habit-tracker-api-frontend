# Habit Tracker API - Semana 1
Actividad Unidad 1 – Programación Avanzada  
Semana 1  

## Descripción del Proyecto

Esta aplicación es una API REST desarrollada en Express.js conectada a una base de datos MongoDB Atlas mediante Mongoose.

Permite gestionar hábitos realizando operaciones CRUD:
- Crear hábitos
- Consultar hábitos
- Actualizar hábitos
- Eliminar hábitos

---

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Nodemon

---

## Instalación del Proyecto

1. Clonar el repositorio
2. Instalar dependencias:

npm install

---

## Configuración del archivo .env

Crear un archivo .env en la raíz del proyecto con la siguiente variable:

MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/habitDB

Reemplazar usuario y password con las credenciales reales de MongoDB Atlas.

---

## Ejecutar el Proyecto

Modo desarrollo:

npm run dev

Modo normal:

node server.js

El servidor correrá en:

http://localhost:3000

---

## Endpoints

### Crear hábito
POST /api/habits

### Obtener hábitos
GET /api/habits

### Actualizar hábito
PUT /api/habits/:id

### Eliminar hábito
DELETE /api/habits/:id

---

## Conceptos Aplicados

- Enrutamiento modular con express.Router()
- Conexión a MongoDB con Mongoose
- Uso de variables de entorno con dotenv
- Arquitectura básica backend

---


# Habit Tracker API - Semana 2
Actividad Unidad 2 – Programación Avanzada  
Semana 2 

## Descripción del Proyecto

Esta aplicación es una API REST desarrollada en Express.js conectada a una base de datos MongoDB Atlas mediante Mongoose.

Permite gestionar hábitos realizando operaciones CRUD:
- Crear hábitos
- Consultar hábitos
- Actualizar hábitos
- Eliminar hábitos

---

## Tecnologías agregadas

- Next.js
- Redux Toolkt
- React-redux
- Integración de request GET con el backend
- Separación de proyectos

---

## Ejecución del Proyecto

## Backend
1. Entrar en la carpeta backend
2. Instalar dependencias:

3. Crear el archivo .env
4. Ejecutar el servidor node server.js

## Frontend
1. Entrar en la carpeta frontend
2. Instalar dependencias
3. Ejecutar el servidor


---

## Funcionalidades Implementadas

- Configuración inicial de Next.js
- Integración de Redux
- Request GET 
- Conexion a MongoDB Atlas

# Habit Tracker API - Semana 3
Actividad Unidad 2 – Programación Avanzada  
Semana 3

## Descripción del Proyecto

En esta semana se trabajó el frontend en Next.js agregando TailwindCSS y construyendo una interfaz para mostrar los hábitos usando el estado global con Redux.

---

## Tecnologías agregadas

- TailwindCSS
- Diseño con componentes UI (cards/lista) usando Tailwind
- Renderizado de lista dinámica desde Redux

---

## Ejecución del Proyecto


## Frontend
1. Entrar en la carpeta frontend
2. Instalar dependencias
3. Ejecutar el servidor

---

## Funcionalidades Implementadas

- Integración de TailwindCSS en Next.js
- Lista dinámica de hábitos desde Redux
- Barra de progreso (estática por ahora)
- Botón “Done” (sin funcionalidad por ahora)

# Habit Tracker API - Semana 4
## Actividad Unidad 4 – Programación Avanzada
### Semana 4

## Descripción del Proyecto
En esta semana se trabajó el frontend en Next.js conectándolo con el backend para mostrar hábitos reales desde la base de datos. Además, se implementó la funcionalidad del botón “Done” para marcar hábitos como completados y una barra de progreso dinámica que cambia según el avance diario.

## Tecnologías agregadas
- Next.js
- TailwindCSS
- Redux Toolkit
- Fetch API
- Conexión con backend en Express

## Ejecución del Proyecto
### Frontend
1. Entrar en la carpeta `frontend`
2. Instalar dependencias con `npm install`
3. Ejecutar el proyecto con `npm run dev`
4. Abrir en navegador `http://localhost:3000`

## Funcionalidades Implementadas
- Consumo de hábitos desde el backend
- Lista dinámica de hábitos
- Botón “Done” funcional
- Actualización automática de hábitos al marcar uno
- Barra de progreso dinámica
- Cambio de color en la barra según avance
- Visualización de racha por hábito
- Mensaje si el hábito ya fue marcado el mismo día

# Habit Tracker Frontend - Semana 5

## Actividad Unidad 5 – Programación Avanzada  
## Semana 5

## Descripción del Proyecto
En esta semana se trabajó el frontend del proyecto Habit Tracker en Next.js, integrando el registro e inicio de sesión de usuarios, así como el envío del token JWT al backend para permitir la creación de hábitos autenticados desde la interfaz.

## Tecnologías agregadas
- Next.js
- React
- Redux Toolkit
- cookies-next

## Ejecución del Proyecto

### Frontend
1. Entrar en la carpeta `frontend`
2. Instalar dependencias con `npm install`
3. Ejecutar el proyecto con `npm run dev`

## Funcionalidades Implementadas
- Registro de usuario desde el frontend
- Login de usuario desde el frontend - usuario: angelo - contraseña: 1
- Almacenamiento del token JWT
- Envío del token JWT al backend
- Formulario para agregar hábitos autenticados
- Visualización de hábitos en pantalla
- Marcado de hábitos como completados


# Habit Tracker API Frontend - Semana 6
Actividad Unidad 6 – Programación Avanzada  
Semana 6  

## Descripción del Proyecto
En esta semana se trabajó el despliegue del frontend del proyecto **Habit Tracker** utilizando **Vercel**. Además, se corrigió la conexión entre el frontend y el backend desplegado para que la aplicación pudiera consumir correctamente la API en producción.

## Tecnologías agregadas
- Next.js
- React
- Redux Toolkit
- React Redux
- cookies-next
- Vercel

## Ejecución del Proyecto

### Frontend
1. Entrar en la carpeta `frontend`
2. Instalar dependencias con `npm install`
3. Ejecutar el proyecto con `npm run dev`

## Funcionalidades Implementadas
- Despliegue del frontend en Vercel
- Conexión del frontend con el backend desplegado en Vercel
- Corrección de rutas `fetch` que antes apuntaban a `localhost`
- Registro de usuarios desde la interfaz
- Login de usuarios desde la interfaz
- Visualización de hábitos desde la aplicación
- Consumo de la API desplegada en producción

## Enlace del Frontend
https://habit-tracker-api-frontend.vercel.app

## Resultado de la Semana
Se logró desplegar correctamente el frontend en Vercel y conectarlo con el backend desplegado, permitiendo acceder a la aplicación desde un enlace público.

