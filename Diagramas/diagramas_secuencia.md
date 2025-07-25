# Diagramas de Secuencia - Interacciones Clave del Sistema

## 1. Diagrama de Secuencia: Autenticación de Usuario

```
    Usuario     Frontend    Backend    Middleware    Base de Datos    JWT Service
       │           │          │           │              │               │
       ├─ Login ──►│          │           │              │               │
       │           ├─ POST ──►│           │              │               │
       │           │       /auth/login    │              │               │
       │           │          ├─ Validar ►│              │               │
       │           │          │   datos   │              │               │
       │           │          │◄─ OK ────┤              │               │
       │           │          │           │              │               │
       │           │          ├─ Buscar ────────────────►│               │
       │           │          │   usuario                │               │
       │           │          │◄─ Datos ─────────────────┤               │
       │           │          │   usuario                │               │
       │           │          │           │              │               │
       │           │          ├─ Verificar               │               │
       │           │          │   password               │               │
       │           │          │           │              │               │
       │           │          ├─ Generar ──────────────────────────────►│
       │           │          │   token                                  │
       │           │          │◄─ JWT ───────────────────────────────────┤
       │           │          │   token                                  │
       │           │          │           │              │               │
       │           │◄─ 200 ───┤           │              │               │
       │           │   {token,│           │              │               │
       │           │   usuario}│           │              │               │
       │◄─ Success ┤          │           │              │               │
       │  + redirect           │           │              │               │
       │           │          │           │              │               │
```

## 2. Diagrama de Secuencia: Solicitud de Adopción

```
    Adoptante   Frontend   Backend   Auth Middleware   Base de Datos   Email Service
       │           │         │            │                │              │
       ├─ Solicitar│         │            │                │              │
       │  Adopción ►│         │            │                │              │
       │           ├─ POST ──►│            │                │              │
       │           │      /solicitudes    │                │              │
       │           │         ├─ Verificar ►│                │              │
       │           │         │    token    │                │              │
       │           │         │◄─ Usuario ──┤                │              │
       │           │         │   válido    │                │              │
       │           │         │            │                │              │
       │           │         ├─ Validar ───────────────────►│              │
       │           │         │   mascota                   │              │
       │           │         │   disponible                │              │
       │           │         │◄─ Estado ───────────────────┤              │
       │           │         │   mascota                   │              │
       │           │         │            │                │              │
       │           │         ├─ Crear ─────────────────────►│              │
       │           │         │   solicitud                 │              │
       │           │         │◄─ ID ────────────────────────┤              │
       │           │         │   solicitud                 │              │
       │           │         │            │                │              │
       │           │         ├─ Buscar ────────────────────►│              │
       │           │         │   centro                    │              │
       │           │         │◄─ Datos ─────────────────────┤              │
       │           │         │   centro                    │              │
       │           │         │            │                │              │
       │           │         ├─ Enviar ──────────────────────────────────►│
       │           │         │   notificación                             │
       │           │         │   al centro                                │
       │           │         │◄─ Email ───────────────────────────────────┤
       │           │         │   enviado                                  │
       │           │         │            │                │              │
       │           │◄─ 201 ──┤            │                │              │
       │           │   Created           │                │              │
       │◄─ Confirm ┤         │            │                │              │
       │  solicitud│         │            │                │              │
       │           │         │            │                │              │
```

## 3. Diagrama de Secuencia: Gestión de Solicitud por Personal

```
  Personal    Frontend    Backend   Auth Middleware   Base de Datos   Email Service
     │           │         │            │                │              │
     ├─ Ver ─────►│         │            │                │              │
     │ Solicitudes│         │            │                │              │
     │           ├─ GET ───►│            │                │              │
     │           │    /solicitudes      │                │              │
     │           │         ├─ Verificar ►│                │              │
     │           │         │    token +  │                │              │
     │           │         │    rol      │                │              │
     │           │         │◄─ Autorizado┤                │              │
     │           │         │            │                │              │
     │           │         ├─ Filtrar ───────────────────►│              │
     │           │         │   por centro                │              │
     │           │         │◄─ Lista ─────────────────────┤              │
     │           │         │   solicitudes               │              │
     │           │◄─ 200 ──┤            │                │              │
     │           │   Lista │            │                │              │
     │◄─ Mostrar ┤         │            │                │              │
     │  Lista    │         │            │                │              │
     │           │         │            │                │              │
     ├─ Aprobar ─►│         │            │                │              │
     │ Solicitud │         │            │                │              │
     │           ├─ PUT ───►│            │                │              │
     │           │    /solicitudes/:id  │                │              │
     │           │         ├─ Verificar ►│                │              │
     │           │         │    permisos │                │              │
     │           │         │◄─ OK ───────┤                │              │
     │           │         │            │                │              │
     │           │         ├─ Actualizar ────────────────►│              │
     │           │         │   estado                    │              │
     │           │         │◄─ Updated ──────────────────┤              │
     │           │         │            │                │              │
     │           │         ├─ Cambiar ───────────────────►│              │
     │           │         │   estado                    │              │
     │           │         │   mascota                   │              │
     │           │         │◄─ Updated ──────────────────┤              │
     │           │         │            │                │              │
     │           │         ├─ Notificar ─────────────────────────────────►│
     │           │         │   adoptante                                 │
     │           │         │◄─ Email ────────────────────────────────────┤
     │           │         │   enviado                                   │
     │           │◄─ 200 ──┤            │                │              │
     │           │   Success           │                │              │
     │◄─ Confirm ┤         │            │                │              │
     │  Operación│         │            │                │              │
     │           │         │            │                │              │
```

## 4. Diagrama de Secuencia: Reporte de Mascota Perdida

```
    Dueño     Frontend    Backend   Auth Middleware   Base de Datos   Push Service
       │         │          │            │               │              │
       ├─ Crear ►│          │            │               │              │
       │ Alerta  │          │            │               │              │
       │         ├─ POST ──►│            │               │              │
       │         │     /alertas         │               │              │
       │         │          ├─ Verificar ►│               │              │
       │         │          │    token   │               │              │
       │         │          │◄─ Usuario ─┤               │              │
       │         │          │   válido   │               │              │
       │         │          │            │               │              │
       │         │          ├─ Validar ──────────────────►│              │
       │         │          │   datos                    │              │
       │         │          │◄─ OK ───────────────────────┤              │
       │         │          │            │               │              │
       │         │          ├─ Crear ────────────────────►│              │
       │         │          │   alerta                   │              │
       │         │          │◄─ ID ───────────────────────┤              │
       │         │          │   alerta                   │              │
       │         │          │            │               │              │
       │         │          ├─ Buscar ───────────────────►│              │
       │         │          │   coincidencias            │              │
       │         │          │   automáticas              │              │
       │         │          │◄─ Posibles ─────────────────┤              │
       │         │          │   matches                  │              │
       │         │          │            │               │              │
       │         │          ├─ Notificar ─────────────────────────────────►│
       │         │          │   usuarios                                  │
       │         │          │   interesados                               │
       │         │          │◄─ Push ─────────────────────────────────────┤
       │         │          │   enviado                                   │
       │         │◄─ 201 ───┤            │               │              │
       │         │   Created            │               │              │
       │◄─ Success         │            │               │              │
       │  + ID Alerta      │            │               │              │
       │         │          │            │               │              │
```

## 5. Diagrama de Secuencia: Consulta de Mascotas (Usuario Anónimo)

```
  Usuario    Frontend    Backend    Cache    Base de Datos
    Anónimo     │          │         │           │
       │        │          │         │           │
       ├─ Ver ──►│          │         │           │
       │Mascotas │          │         │           │
       │        ├─ GET ────►│         │           │
       │        │     /mascotas      │           │
       │        │          ├─ Check ►│           │
       │        │          │   cache │           │
       │        │          │◄─ Miss ─┤           │
       │        │          │         │           │
       │        │          ├─ Query ─────────────►│
       │        │          │   mascotas          │
       │        │          │   disponibles       │
       │        │          │◄─ Lista ─────────────┤
       │        │          │   mascotas          │
       │        │          │         │           │
       │        │          ├─ Cache ►│           │
       │        │          │   result│           │
       │        │          │◄─ Stored┤           │
       │        │          │         │           │
       │        │          ├─ Format │           │
       │        │          │   response         │
       │        │◄─ 200 ───┤         │           │
       │        │   Lista  │         │           │
       │◄─ Ver ─┤   JSON   │         │           │
       │ Catálogo         │         │           │
       │        │          │         │           │
       │        │          │         │           │
       ├─ Ver ──►│          │         │           │
       │Detalle  │          │         │           │
       │        ├─ GET ────►│         │           │
       │        │  /mascotas/:id     │           │
       │        │          ├─ Check ►│           │
       │        │          │   cache │           │
       │        │          │◄─ Hit ──┤           │
       │        │◄─ 200 ───┤         │           │
       │        │   Cached │         │           │
       │◄─ Ver ─┤   Data   │         │           │
       │ Detalles         │         │           │
       │        │          │         │           │
```

## 6. Diagrama de Secuencia: Registro de Nueva Mascota

```
  Personal    Frontend    Backend   Auth Middleware   File Upload   Base de Datos
     │           │         │            │               Service         │
     ├─ Agregar ─►│         │            │                  │            │
     │ Mascota   │         │            │                  │            │
     │           ├─ POST ──►│            │                  │            │
     │           │   /mascotas          │                  │            │
     │           │   + FormData        │                  │            │
     │           │         ├─ Verificar ►│                  │            │
     │           │         │    token + │                  │            │
     │           │         │    rol     │                  │            │
     │           │         │◄─ Autorizado                  │            │
     │           │         │            │                  │            │
     │           │         ├─ Procesar ─────────────────────►│            │
     │           │         │   imagen                       │            │
     │           │         │◄─ URL ──────────────────────────┤            │
     │           │         │   imagen                       │            │
     │           │         │            │                  │            │
     │           │         ├─ Validar ────────────────────────────────────►│
     │           │         │   centro                                    │
     │           │         │   pertenece                                 │
     │           │         │   al usuario                                │
     │           │         │◄─ Válido ───────────────────────────────────┤
     │           │         │            │                  │            │
     │           │         ├─ Crear ─────────────────────────────────────►│
     │           │         │   mascota                                   │
     │           │         │◄─ ID ────────────────────────────────────────┤
     │           │         │   mascota                                   │
     │           │         │            │                  │            │
     │           │         ├─ Crear ─────────────────────────────────────►│
     │           │         │   ficha                                     │
     │           │         │   médica                                    │
     │           │         │◄─ ID ────────────────────────────────────────┤
     │           │         │   ficha                                     │
     │           │◄─ 201 ──┤            │                  │            │
     │           │   Created           │                  │            │
     │◄─ Success ┤         │            │                  │            │
     │  Mascota  │         │            │                  │            │
     │  Agregada │         │            │                  │            │
     │           │         │            │                  │            │
```

## 7. Diagrama de Secuencia: Sistema de Mensajería

```
   Remitente   Frontend    Backend   Auth Middleware   Base de Datos   WebSocket
      │           │         │            │               │            Service
      ├─ Enviar ──►│         │            │               │              │
      │ Mensaje   │         │            │               │              │
      │           ├─ POST ──►│            │               │              │
      │           │    /mensajes        │               │              │
      │           │         ├─ Verificar ►│               │              │
      │           │         │    token   │               │              │
      │           │         │◄─ Usuario ─┤               │              │
      │           │         │   válido   │               │              │
      │           │         │            │               │              │
      │           │         ├─ Validar ──────────────────►│              │
      │           │         │   destinatario             │              │
      │           │         │   existe                   │              │
      │           │         │◄─ Válido ──────────────────┤              │
      │           │         │            │               │              │
      │           │         ├─ Crear ────────────────────►│              │
      │           │         │   mensaje                  │              │
      │           │         │◄─ ID ───────────────────────┤              │
      │           │         │   mensaje                  │              │
      │           │         │            │               │              │
      │           │         ├─ Verificar ────────────────►│              │
      │           │         │   destinatario             │              │
      │           │         │   online                   │              │
      │           │         │◄─ Estado ──────────────────┤              │
      │           │         │            │               │              │
      │           │         ├─ Push ─────────────────────────────────────►│
      │           │         │   notificación                             │
      │           │         │   en tiempo real                           │
      │           │         │◄─ Entregado ────────────────────────────────┤
      │           │◄─ 201 ──┤            │               │              │
      │           │   Created           │               │              │
      │◄─ Success ┤         │            │               │              │
      │  Enviado  │         │            │               │              │
      │           │         │            │               │              │
      │           │         │◄─ WebSocket ────────────────────────────────┤
      │           │         │   Delivery                                 │
      │           │         │   Confirmation                             │
      │           │         │            │               │              │
```

## Notas sobre los Diagramas de Secuencia

### Patrones Identificados:

1. **Autenticación Consistente**: Todos los endpoints protegidos siguen el mismo patrón de verificación de token JWT.

2. **Validación en Capas**: 
   - Frontend: Validación básica de UI
   - Backend: Validación de negocio
   - Base de Datos: Restricciones de integridad

3. **Manejo de Errores**: Cada diagrama incluye puntos de falla y respuestas de error apropiadas.

4. **Servicios Externos**: 
   - Email Service para notificaciones
   - File Upload Service para imágenes
   - WebSocket Service para comunicación en tiempo real
   - Push Service para notificaciones móviles

5. **Cache Strategy**: Implementación de cache para consultas frecuentes (como listado de mascotas).

6. **Autorización por Roles**: Los middlewares verifican no solo autenticación sino también autorización según el rol del usuario.

### Consideraciones de Arquitectura:

- **Stateless**: El backend mantiene un diseño sin estado usando JWT
- **RESTful**: Todas las APIs siguen principios REST
- **Separation of Concerns**: Clara separación entre autenticación, autorización y lógica de negocio
- **Error Handling**: Manejo consistente de errores con códigos HTTP apropiados
- **Security**: Validación tanto en frontend como backend
