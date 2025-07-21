
# FIS - Sistema de Adopciones y Alertas de Mascotas

Este proyecto es una plataforma completa para la gestión y adopción de mascotas, con backend en Node.js/Express y frontend en React + Material UI.

---

## Requisitos previos
- Node.js (v16 o superior recomendado)
- npm (v8 o superior)

---

## Instalación y ejecución

### 1. Clona el repositorio
```bash
# Clona este repositorio y entra a la carpeta
cd FIS
```

### 2. Instala dependencias
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

---

## Ejecución del proyecto

### 1. Inicia el backend
```bash
cd backend
npm start
# o
node app.js
```
El backend se ejecuta por defecto en [http://localhost:3001](http://localhost:3001)

### 2. Inicia el frontend
En otra terminal:
```bash
cd frontend
npm run dev
```
El frontend estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto que indique Vite).

---

## Configuración de la base de datos
- Por defecto, el backend usa Sequelize. Puedes configurar tu base de datos en `backend/config/database.js`.
- Si usas PostgreSQL, instala el driver:
  ```bash
  npm install pg pg-hstore
  ```
- Asegúrate de tener la base de datos creada y los datos de conexión correctos.

---

## Notas
- El frontend consume la API del backend en `http://localhost:3001`.
- Puedes modificar las URLs en los archivos de frontend si cambias el puerto o el host del backend.
- Para desarrollo, puedes usar ambos servidores en paralelo.

---

## Scripts útiles
- **Backend:**
  - `npm start` o `node app.js` — Inicia el servidor Express
- **Frontend:**
  - `npm run dev` — Inicia el servidor de desarrollo Vite
  - `npm run build` — Genera la versión de producción
  - `npm run preview` — Previsualiza la build de producción

---

## Autor
Cristian David Romero Gil 
Jairo Arturo Barrera
- Proyecto para FIS - Universidad 
