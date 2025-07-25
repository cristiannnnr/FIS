# 4.2.2 Diagramas Estructurales - Complementarios

## 4.2.2.2 Diagrama de Objetos

### Instancias del Sistema en un Momento Específico

```
                    INSTANCIAS DEL SISTEMA
                   (Momento: Solicitud de Adopción)

┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
│        juan: Usuario                │    │        luna: Mascota                │
├─────────────────────────────────────┤    ├─────────────────────────────────────┤
│ id = 15                             │    │ id = 8                              │
│ nombre = "Juan Pérez"               │    │ nombre = "Luna"                     │
│ email = "juan@email.com"            │    │ especie = "Perro"                   │
│ rol = "adoptante"                   │    │ raza = "Golden Retriever"           │
│ password = "****"                   │    │ edad = 2                            │
└─────────────────────────────────────┘    │ sexo = "Hembra"                     │
                    │                      │ estado = "en_proceso"               │
                    │ crea                 │ id_centro = 3                       │
                    ▼                      └─────────────────────────────────────┘
┌─────────────────────────────────────┐                        │
│    solicitud_001: SolicitudAdopcion │                        │ pertenece_a
├─────────────────────────────────────┤                        ▼
│ id = 23                             │    ┌─────────────────────────────────────┐
│ id_mascota = 8                      │    │   centro_norte: CentroAtencion      │
│ id_adoptante = 15                   │    ├─────────────────────────────────────┤
│ estado = "pendiente"                │    │ id = 3                              │
│ fecha = "2025-07-24"                │    │ nombre = "Centro Norte"             │
│ id_centro = 3                       │    │ direccion = "Av. Norte 123"         │
└─────────────────────────────────────┘    │ telefono = "555-0123"               │
                    │                      │ encargado_id = 7                    │
                    │ para                 └─────────────────────────────────────┘
                    ▼                                          │
┌─────────────────────────────────────┐                        │ gestionado_por
│     ficha_luna: FichaMedica         │                        ▼
├─────────────────────────────────────┤    ┌─────────────────────────────────────┐
│ id = 12                             │    │        maria: Usuario               │
│ id_mascota = 8                      │    ├─────────────────────────────────────┤
│ peso = 25.5                         │    │ id = 7                              │
│ altura = 55.0                       │    │ nombre = "María García"             │
│ vacunas = "Rabia, Parvo, Moquillo"  │    │ email = "maria@centro.com"          │
│ observaciones = "Muy sociable"      │    │ rol = "personal"                    │
└─────────────────────────────────────┘    └─────────────────────────────────────┘

                    RELACIONES ENTRE OBJETOS

juan ────────── crea ──────────► solicitud_001
solicitud_001 ─ para ─────────► luna  
luna ──────── pertenece_a ────► centro_norte
centro_norte ── gestionado_por ► maria
luna ─────────── tiene ───────► ficha_luna
```

## 4.2.2.3 Diagrama de Componentes

### Arquitectura de Componentes del Sistema

```
                        ARQUITECTURA DE COMPONENTES

    ┌─────────────────────────────────────────────────────────────────┐
    │                     FRONTEND (React)                            │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
    │  │   Pages     │  │ Components  │  │   Assets    │             │
    │  │             │  │             │  │             │             │
    │  │ • Home      │  │ • Navbar    │  │ • Images    │             │
    │  │ • Login     │  │ • Cards     │  │ • Styles    │             │
    │  │ • Mascotas  │  │ • Forms     │  │             │             │
    │  │ • Alertas   │  │ • Lists     │  │             │             │
    │  └─────────────┘  └─────────────┘  └─────────────┘             │
    │                           │                                     │
    └───────────────────────────┼─────────────────────────────────────┘
                                │ HTTP/HTTPS
                                │ REST API Calls
                                ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                     BACKEND (Node.js/Express)                   │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
    │  │   Routes    │  │ Controllers │  │ Middleware  │             │
    │  │             │  │             │  │             │             │
    │  │ • /auth     │  │ • AuthCtrl  │  │ • auth.js   │             │
    │  │ • /mascotas │  │ • MascotaCtrl│  │ • roles.js  │             │
    │  │ • /solicitudes│ • SolicitudCtrl│ • cors.js   │             │
    │  │ • /alertas  │  │ • AlertaCtrl│  │ • upload.js │             │
    │  │ • /centros  │  │ • CentroCtrl│  │             │             │
    │  └─────────────┘  └─────────────┘  └─────────────┘             │
    │                           │                                     │
    │  ┌─────────────┐          │          ┌─────────────┐           │
    │  │   Models    │          │          │  Services   │           │
    │  │             │          │          │             │           │
    │  │ • Usuario   │          │          │ • Email     │           │
    │  │ • Mascota   │◄─────────┼─────────►│ • FileUpload│           │
    │  │ • Solicitud │          │          │ • Notification│         │
    │  │ • Alerta    │          │          │ • Validation│           │
    │  │ • Centro    │          │          │             │           │
    │  └─────────────┘          │          └─────────────┘           │
    │                           │                                     │
    └───────────────────────────┼─────────────────────────────────────┘
                                │ Sequelize ORM
                                ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                    DATABASE LAYER                               │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
    │  │   Config    │  │ Migrations  │  │   Seeds     │             │
    │  │             │  │             │  │             │             │
    │  │ • database.js│ • create_tables│ • admin_user  │             │
    │  │ • sequelize │  │ • add_indexes│ • test_data   │             │
    │  └─────────────┘  └─────────────┘  └─────────────┘             │
    │                           │                                     │
    └───────────────────────────┼─────────────────────────────────────┘
                                │ SQL Queries
                                ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                      SQLite Database                            │
    └─────────────────────────────────────────────────────────────────┘

                        COMPONENTES EXTERNOS

    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │ JWT Service │    │Email Service│    │File Storage │
    │             │    │             │    │             │
    │ • Generate  │    │ • SMTP      │    │ • Local     │
    │ • Validate  │    │ • Templates │    │ • Cloud     │
    │ • Refresh   │    │ • Queue     │    │ • CDN       │
    └─────────────┘    └─────────────┘    └─────────────┘
            ▲                   ▲                   ▲
            │                   │                   │
            └───────────────────┼───────────────────┘
                                │
                        ┌───────▼───────┐
                        │   BACKEND     │
                        │   SERVICES    │
                        └───────────────┘
```

### Dependencias entre Componentes

```
                    DIAGRAMA DE DEPENDENCIAS

Frontend Components:
┌─────────┐     uses     ┌─────────┐     calls     ┌─────────┐
│  Pages  │─────────────►│ Components│─────────────►│ API Calls│
└─────────┘              └─────────┘              └─────────┘

Backend Components:
┌─────────┐   processes   ┌─────────┐   manipulates ┌─────────┐
│ Routes  │─────────────►│Controllers│──────────────►│ Models  │
└─────────┘              └─────────┘               └─────────┘
     │                          │                        │
     │ validates               │ uses                   │ queries
     ▼                          ▼                        ▼
┌─────────┐              ┌─────────┐              ┌─────────┐
│Middleware│              │Services │              │Database │
└─────────┘              └─────────┘              └─────────┘

Service Dependencies:
┌─────────────┐    requires    ┌─────────────┐
│AuthController│──────────────►│ JWT Service │
└─────────────┘               └─────────────┘

┌─────────────┐    uses        ┌─────────────┐
│SolicitudCtrl│──────────────►│Email Service│
└─────────────┘               └─────────────┘

┌─────────────┐    uploads     ┌─────────────┐
│MascotaCtrl  │──────────────►│File Service │
└─────────────┘               └─────────────┘
```

## 4.2.2.4 Diagrama de Despliegue

### Infraestructura y Distribución de Componentes

```
                        DIAGRAMA DE DESPLIEGUE

    ┌─────────────────────────────────────────────────────────────────┐
    │                    CLIENT DEVICES                               │
    │                                                                 │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
    │  │   Desktop   │  │   Mobile    │  │   Tablet    │             │
    │  │   Browser   │  │   Browser   │  │   Browser   │             │
    │  │             │  │             │  │             │             │
    │  │ Chrome/Edge │  │ Safari/Chrome│ │ Safari/Chrome│            │
    │  │ Firefox     │  │             │  │             │             │
    │  └─────────────┘  └─────────────┘  └─────────────┘             │
    └─────────────┬───────────────────────────────────────────────────┘
                  │ HTTPS/443
                  │ HTTP/80 (redirect)
                  ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                     WEB SERVER                                  │
    │                   (Development)                                 │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────────┐│
    │  │              Frontend Server                                ││
    │  │                Vite Dev Server                              ││
    │  │                  Port: 5173                                 ││
    │  │                                                             ││
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         ││
    │  │  │   React     │  │    CSS      │  │   Assets    │         ││
    │  │  │   Bundle    │  │   Styles    │  │   Images    │         ││
    │  │  └─────────────┘  └─────────────┘  └─────────────┘         ││
    │  └─────────────────────────────────────────────────────────────┘│
    └─────────────┬───────────────────────────────────────────────────┘
                  │ API Calls
                  │ HTTP/3001
                  ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                   APPLICATION SERVER                            │
    │                     Node.js Server                              │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────────┐│
    │  │              Backend Application                            ││
    │  │                Express.js Server                           ││
    │  │                  Port: 3001                                ││
    │  │                                                            ││
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        ││
    │  │  │     API     │  │ Middleware  │  │  Business   │        ││
    │  │  │   Routes    │  │    Layer    │  │    Logic    │        ││
    │  │  └─────────────┘  └─────────────┘  └─────────────┘        ││
    │  │                                                            ││
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        ││
    │  │  │    Auth     │  │   File      │  │   Email     │        ││
    │  │  │  Service    │  │  Upload     │  │  Service    │        ││
    │  │  └─────────────┘  └─────────────┘  └─────────────┘        ││
    │  └─────────────────────────────────────────────────────────────┘│
    └─────────────┬───────────────────────────────────────────────────┘
                  │ SQL Queries
                  │ Port: Internal
                  ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                    DATABASE SERVER                              │
    │                      SQLite DB                                  │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────────────────────────────────────────────────────┐│
    │  │                  Database Engine                            ││
    │  │                    SQLite 3                                 ││
    │  │               File: database.sqlite                         ││
    │  │                                                             ││
    │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         ││
    │  │  │    Tables   │  │   Indexes   │  │   Triggers  │         ││
    │  │  │   Schema    │  │    B-Tree   │  │   Constraints│        ││
    │  │  └─────────────┘  └─────────────┘  └─────────────┘         ││
    │  └─────────────────────────────────────────────────────────────┘│
    └─────────────────────────────────────────────────────────────────┘

                        EXTERNAL SERVICES

    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │             │    │             │    │             │
    │ Email SMTP  │    │ Cloud CDN   │    │ Monitoring  │
    │   Service   │    │  (Optional) │    │   Service   │
    │             │    │             │    │ (Optional)  │
    │ Gmail/SendGrid│   │ Cloudflare  │    │   Sentry    │
    └─────────────┘    └─────────────┘    └─────────────┘
            ▲                   ▲                   ▲
            │ SMTP/587          │ HTTPS/443         │ HTTP API
            │                   │                   │
            └───────────────────┼───────────────────┘
                                │
                        ┌───────▼───────┐
                        │ APPLICATION   │
                        │    SERVER     │
                        └───────────────┘

                        PRODUCTION DEPLOYMENT

    ┌─────────────────────────────────────────────────────────────────┐
    │                    PRODUCTION SETUP                             │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  Frontend: Static Files (Nginx/Apache)                         │
    │  Backend: Node.js (PM2 Process Manager)                        │
    │  Database: PostgreSQL/MySQL (Production)                       │
    │  Reverse Proxy: Nginx                                          │
    │  SSL: Let's Encrypt                                             │
    │  Monitoring: PM2 + Logs                                        │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
```

## 4.2.2.5 Diagrama de Paquetes

### Organización de Paquetes del Sistema

```
                        DIAGRAMA DE PAQUETES

    ┌─────────────────────────────────────────────────────────────────┐
    │                       FIS-SYSTEM                                │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  ┌─────────────────────────────┐  ┌─────────────────────────────┐│
    │  │          frontend           │  │          backend            ││
    │  │        (React App)          │  │      (Node.js API)          ││
    │  ├─────────────────────────────┤  ├─────────────────────────────┤│
    │  │                             │  │                             ││
    │  │ ┌─────────────────────────┐ │  │ ┌─────────────────────────┐ ││
    │  │ │         src             │ │  │ │       controllers       │ ││
    │  │ ├─────────────────────────┤ │  │ ├─────────────────────────┤ ││
    │  │ │ • App.jsx               │ │  │ │ • authController.js     │ ││
    │  │ │ • main.jsx              │ │  │ │ • mascotaController.js  │ ││
    │  │ │ • Login.jsx             │ │  │ │ • solicitudController.js│ ││
    │  │ │ • Register.jsx          │ │  │ │ • alertaController.js   │ ││
    │  │ └─────────────────────────┘ │  │ └─────────────────────────┘ ││
    │  │                             │  │                             ││
    │  │ ┌─────────────────────────┐ │  │ ┌─────────────────────────┐ ││
    │  │ │        pages            │ │  │ │        models           │ ││
    │  │ ├─────────────────────────┤ │  │ ├─────────────────────────┤ ││
    │  │ │ • Home.jsx              │ │  │ │ • Usuario.js            │ ││
    │  │ │ • Mascotas.jsx          │ │  │ │ • Mascota.js            │ ││
    │  │ │ • Alertas.jsx           │ │  │ │ • SolicitudAdopcion.js  │ ││
    │  │ │ • Solicitudes.jsx       │ │  │ │ • Alerta.js             │ ││
    │  │ │ • Centros.jsx           │ │  │ │ • CentroAtencion.js     │ ││
    │  │ └─────────────────────────┘ │  │ └─────────────────────────┘ ││
    │  │                             │  │                             ││
    │  │ ┌─────────────────────────┐ │  │ ┌─────────────────────────┐ ││
    │  │ │      components         │ │  │ │        routes           │ ││
    │  │ ├─────────────────────────┤ │  │ ├─────────────────────────┤ ││
    │  │ │ • Navbar.jsx            │ │  │ │ • auth.js               │ ││
    │  │ │ • MascotaCard.jsx       │ │  │ │ • mascotas.js           │ ││
    │  │ │ • MascotaForm.jsx       │ │  │ │ • solicitudes.js        │ ││
    │  │ │ • CentroCard.jsx        │ │  │ │ • alertas.js            │ ││
    │  │ │ • PrivateRoute.jsx      │ │  │ │ • centros.js            │ ││
    │  │ └─────────────────────────┘ │  │ └─────────────────────────┘ ││
    │  │                             │  │                             ││
    │  │ ┌─────────────────────────┐ │  │ ┌─────────────────────────┐ ││
    │  │ │        assets           │ │  │ │       middleware        │ ││
    │  │ ├─────────────────────────┤ │  │ ├─────────────────────────┤ ││
    │  │ │ • Header.jpg            │ │  │ │ • auth.js               │ ││
    │  │ │ • Hero.png              │ │  │ │ • roles.js              │ ││
    │  │ │ • react.svg             │ │  │ │                         │ ││
    │  │ └─────────────────────────┘ │  │ └─────────────────────────┘ ││
    │  └─────────────────────────────┘  │                             ││
    │                                   │ ┌─────────────────────────┐ ││
    │                                   │ │        config           │ ││
    │                                   │ ├─────────────────────────┤ ││
    │                                   │ │ • database.js           │ ││
    │                                   │ └─────────────────────────┘ ││
    │                                   └─────────────────────────────┘│
    └─────────────────────────────────────────────────────────────────┘

                        DEPENDENCIAS ENTRE PAQUETES

    frontend.src ─────depends on─────► frontend.components
    frontend.pages ───depends on─────► frontend.components  
    frontend.components ─uses────────► frontend.assets

    backend.routes ───depends on─────► backend.controllers
    backend.controllers ─uses────────► backend.models
    backend.controllers ─uses────────► backend.middleware
    backend.models ───depends on─────► backend.config

    frontend ────API calls───────────► backend.routes

                        PAQUETES EXTERNOS

    ┌─────────────────────────────┐  ┌─────────────────────────────┐
    │      Frontend Dependencies │  │      Backend Dependencies   │
    ├─────────────────────────────┤  ├─────────────────────────────┤
    │                             │  │                             │
    │ • react                     │  │ • express                   │
    │ • react-dom                 │  │ • sequelize                 │
    │ • react-router-dom          │  │ • sqlite3                   │
    │ • @mui/material             │  │ • bcryptjs                  │
    │ • @mui/icons-material       │  │ • jsonwebtoken              │
    │ • axios                     │  │ • cors                      │
    │ • vite                      │  │ • multer                    │
    │                             │  │ • nodemailer                │
    └─────────────────────────────┘  └─────────────────────────────┘
                    ▲                                ▲
                    │                                │
                    └────────── imported by ────────┘
                               respective packages

                        ESTRUCTURA DE ARCHIVOS

    FIS/
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── assets/
    │   │   └── main files
    │   ├── public/
    │   └── package.json
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── config/
    │   └── package.json
    └── README.md
```

### Reglas de Dependencia entre Paquetes

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGLAS DE DEPENDENCIA                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 1. FRONTEND NO PUEDE DEPENDER DIRECTAMENTE DE BACKEND          │
│    ✓ Correcto: frontend → HTTP API → backend                   │
│    ✗ Incorrecto: frontend → require(backend)                   │
│                                                                 │
│ 2. MODELOS NO PUEDEN DEPENDER DE CONTROLADORES                 │
│    ✓ Correcto: controllers → models                            │
│    ✗ Incorrecto: models → controllers                          │
│                                                                 │
│ 3. COMPONENTES NO PUEDEN IMPORTAR PÁGINAS                      │
│    ✓ Correcto: pages → components                              │
│    ✗ Incorrecto: components → pages                            │
│                                                                 │
│ 4. MIDDLEWARE PUEDE SER USADO POR RUTAS Y CONTROLADORES        │
│    ✓ Correcto: routes → middleware                             │
│    ✓ Correcto: controllers → middleware                        │
│                                                                 │
│ 5. CONFIGURACIÓN PUEDE SER USADA POR CUALQUIER PAQUETE         │
│    ✓ Correcto: cualquier_paquete → config                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
