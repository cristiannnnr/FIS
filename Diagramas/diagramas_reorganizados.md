# 4.2.4 Diagramas de Comportamiento Adicionales

## 4.2.4.2 Diagrama de Actividades

### Actividad Principal: Proceso Completo de Adopción

```
                    PROCESO COMPLETO DE ADOPCIÓN
    
    Adoptante                 Sistema                    Personal Centro
        │                        │                           │
        ┌───── Inicio ─────┐      │                           │
        │                  │      │                           │
        ├─ Buscar Mascotas ──────►│                           │
        │                        ├─ Mostrar Catálogo ───────►│
        │◄─ Ver Catálogo ─────────┤                           │
        │                        │                           │
        ├─ Filtrar Búsqueda ─────►│                           │
        │  [especie, edad, etc.]  │                           │
        │                        ├─ Aplicar Filtros         │
        │◄─ Resultados Filtrados ─┤                           │
        │                        │                           │
        ├─ Seleccionar Mascota ──►│                           │
        │                        ├─ Verificar Disponibilidad│
        │                        │   ┌─[No Disponible]       │
        │                        │   │                       │
        │◄─ Mensaje Error ───────┤◄─┘                       │
        │                        │                           │
        │                        │   ┌─[Disponible]          │
        │                        │   │                       │
        │                        ├─ Mostrar Detalles ──────►│
        │◄─ Info Completa ──────┤   │                       │
        │                        │   │                       │
        ├─ Decidir Adoptar       │   │                       │
        │   ┌─[No Interesa]      │   │                       │
        │   │                    │   │                       │
        │   └─ Volver a Buscar ──┤   │                       │
        │                        │   │                       │
        │   ┌─[Solicitar]        │   │                       │
        │   │                    │   │                       │
        ├─ Completar Formulario ►│   │                       │
        │  • Datos Personales    │   │                       │
        │  • Experiencia         │   │                       │
        │  • Vivienda            │   │                       │
        │  • Referencias         │   │                       │
        │                        │   │                       │
        │                        ├─ Validar Datos          │
        │                        │   ┌─[Datos Incompletos]   │
        │                        │   │                       │
        │◄─ Solicitar Corrección ┤◄─┘                       │
        │                        │                           │
        │                        │   ┌─[Datos Válidos]       │
        │                        │   │                       │
        │                        ├─ Crear Solicitud        │
        │                        ├─ Cambiar Estado Mascota  │
        │                        │   (DISPONIBLE → EN_PROCESO)│
        │                        ├─ Notificar Centro ──────►│
        │◄─ Confirmar Solicitud ──┤                           │
        │                        │                           │◄─ Recibir Notificación ─┤
        │                        │                           │                           │
        │                        │                           ├─ Revisar Documentos      │
        │                        │                           ├─ Verificar Referencias    │
        │                        │                           ├─ Evaluar Vivienda        │
        │                        │                           │                           │
        │                        │                           ├─ Tomar Decisión          │
        │                        │                           │   ┌─[Rechazar]            │
        │                        │                           │   │                       │
        │                        │◄─ Actualizar Estado ─────┤◄─┘                       │
        │                        │   (RECHAZADA)            │                           │
        │                        ├─ Cambiar Estado Mascota  │                           │
        │                        │   (EN_PROCESO → DISPONIBLE)│                          │
        │                        ├─ Enviar Notificación ───►│                           │
        │◄─ Recibir Rechazo ─────┤                           │                           │
        │                        │                           │                           │
        │                        │                           │   ┌─[Aprobar]            │
        │                        │                           │   │                       │
        │                        │◄─ Actualizar Estado ─────┤◄─┘                       │
        │                        │   (APROBADA)             │                           │
        │                        ├─ Enviar Notificación ───►│                           │
        │◄─ Recibir Aprobación ──┤                           │                           │
        │                        │                           │                           │
        │                        │                           ├─ Programar Entrega       │
        │                        │◄─ Crear Cita ────────────┤                           │
        │                        ├─ Notificar Cita ────────►│                           │
        │◄─ Recibir Cita ───────┤                           │                           │
        │                        │                           │                           │
        ├─ Confirmar Asistencia ►│────────────────────────────────────────────────────►│
        │                        │                           │◄─ Confirmar Recepción ───┤
        │                        │                           │                           │
        │                        │◄─ Actualizar Estado ─────┤                           │
        │                        │   (PROGRAMADA)           │                           │
        │                        │                           │                           │
        │                        │                           ├─ Preparar Documentos     │
        │                        │                           ├─ Preparar Mascota        │
        │                        │                           │                           │
        ├─ Asistir a Cita ──────►│────────────────────────────────────────────────────►│
        │                        │                           │◄─ Recibir Adoptante ────┤
        │                        │                           │                           │
        │                        │                           ├─ Entregar Documentos     │
        │                        │                           ├─ Explicar Cuidados       │
        │                        │                           ├─ Entregar Mascota        │
        │                        │                           │                           │
        ├─ Firmar Documentos ───►│────────────────────────────────────────────────────►│
        ├─ Recibir Mascota ─────►│────────────────────────────────────────────────────►│
        │                        │                           │                           │
        │                        │◄─ Confirmar Entrega ─────┤                           │
        │                        ├─ Actualizar Estado       │                           │
        │                        │   (COMPLETADA)           │                           │
        │                        ├─ Cambiar Estado Mascota  │                           │
        │                        │   (EN_PROCESO → ADOPTADA) │                           │
        │                        ├─ Crear Registro Adopción │                           │
        │◄─ Adopción Finalizada ─┤                           │                           │
        │                        │                           │                           │
        └───── Fin ─────────────│                           │                           │
                                │                           │                           │
```

### Actividad: Gestión de Alertas de Mascotas

```
                    GESTIÓN DE ALERTAS DE MASCOTAS

    Dueño/Usuario              Sistema                    Otros Usuarios
        │                        │                           │
        ┌───── Inicio ─────┐      │                           │
        │                  │      │                           │
        ├─ Acceder Sistema ──────►│                           │
        │                        ├─ Verificar Autenticación │
        │                        │   ┌─[No Autenticado]      │
        │                        │   │                       │
        │◄─ Redirigir Login ─────┤◄─┘                       │
        │                        │                           │
        ├─ Iniciar Sesión ───────►│                           │
        │                        ├─ Validar Credenciales    │
        │◄─ Acceso Concedido ────┤                           │
        │                        │                           │
        ├─ Ir a Sección Alertas ►│                           │
        │                        ├─ Mostrar Opciones ──────►│
        │◄─ Ver Interfaz ────────┤                           │
        │                        │                           │
        ├─ Seleccionar Tipo      │                           │
        │   ┌─[Reportar Perdida]  │                           │
        │   │                    │                           │
        │   ├─ Completar Datos ──►│                           │
        │   │  • Descripción     │                           │
        │   │  • Última Ubicación│                           │
        │   │  • Fecha Pérdida   │                           │
        │   │  • Foto            │                           │
        │   │  • Características │                           │
        │   │                    │                           │
        │   │                    ├─ Validar Información     │
        │   │                    │   ┌─[Datos Incompletos]   │
        │   │                    │   │                       │
        │   │◄─ Solicitar Datos ─┤◄─┘                       │
        │   │                    │                           │
        │   │                    │   ┌─[Datos Válidos]       │
        │   │                    │   │                       │
        │   │                    ├─ Crear Alerta           │
        │   │                    ├─ Guardar en BD          │
        │   │                    ├─ Generar ID Única       │
        │   │◄─ Confirmar Creación┤                           │
        │   │                    │                           │
        │   │                    ├─ Buscar Coincidencias    │
        │   │                    │   Automáticas            │
        │   │                    ├─ Analizar Similitudes   │
        │   │                    │   ┌─[Sin Coincidencias]  │
        │   │                    │   │                       │
        │   │                    │   └─ Continuar Proceso   │
        │   │                    │                           │
        │   │                    │   ┌─[Hay Coincidencias]  │
        │   │                    │   │                       │
        │   │                    ├─ Obtener Lista Contactos ─────────────► │
        │   │                    ├─ Enviar Notificaciones ──────────────► │
        │   │                    │                           │◄─ Recibir Alerta ────────┤
        │   │                    │                           │                           │
        │   │◄─ Mostrar Coincidencias┤                           │                           │
        │   │                    │                           │                           │
        │   │                    ├─ Publicar en Sistema    │                           │
        │   │                    ├─ Activar Búsqueda       │                           │
        │   │                    │   Periódica              │                           │
        │   │◄─ Alerta Activa ───┤                           │                           │
        │   │                    │                           │                           │
        │   └─[Reportar Encontrada]                         │                           │
        │   │                    │                           │                           │
        │   ├─ Describir Hallazgo►│                           │                           │
        │   │  • Ubicación Actual│                           │                           │
        │   │  • Estado Animal   │                           │                           │
        │   │  • Foto Actual     │                           │                           │
        │   │  • Contacto        │                           │                           │
        │   │                    │                           │                           │
        │   │                    ├─ Crear Alerta Encontrada │                           │
        │   │                    ├─ Buscar Alertas Perdidas │                           │
        │   │                    │   Coincidentes           │                           │
        │   │                    │                           │                           │
        │   │                    │   ┌─[Hay Matches]         │                           │
        │   │                    │   │                       │                           │
        │   │                    ├─ Notificar Dueños ──────────────────────────────────► │
        │   │                    │   Potenciales            │                           │
        │   │                    │                           │◄─ Recibir Notificación ──┤
        │   │                    │                           │                           │
        │   │                    │◄─ Verificar Coincidencia ──────────────────────────── │
        │   │                    ├─ Facilitar Contacto     │                           │
        │   │◄─ Posible Match ───┤                           │                           │
        │   │                    │                           │                           │
        │   ├─ Confirmar Match ──►│                           │                           │
        │   │                    ├─ Marcar Alertas         │                           │
        │   │                    │   como RESUELTAS         │                           │
        │   │                    ├─ Actualizar Estados     │                           │
        │   │◄─ Caso Cerrado ────┤                           │                           │
        │   │                    │                           │                           │
        └───── Fin ─────────────│                           │                           │
                                │                           │                           │

Actividades Paralelas:
• Búsqueda automática cada 6 horas
• Notificaciones push en tiempo real
• Limpieza de alertas expiradas (30 días)
• Análisis de patrones de pérdidas
```

### Actividad: Registro y Gestión de Mascotas

```
                    REGISTRO Y GESTIÓN DE MASCOTAS

    Personal Centro            Sistema                    Base de Datos
        │                        │                           │
        ┌───── Inicio ─────┐      │                           │
        │                  │      │                           │
        ├─ Acceder Panel ────────►│                           │
        │  Administrativo         │                           │
        │                        ├─ Verificar Permisos      │
        │                        │   ┌─[Sin Permisos]        │
        │                        │   │                       │
        │◄─ Denegar Acceso ──────┤◄─┘                       │
        │                        │                           │
        │                        │   ┌─[Permisos OK]         │
        │                        │   │                       │
        │◄─ Mostrar Dashboard ───┤◄─┘                       │
        │                        │                           │
        ├─ Seleccionar Acción    │                           │
        │   ┌─[Registrar Nueva]   │                           │
        │   │                    │                           │
        │   ├─ Completar Formulario►                          │
        │   │  • Datos Básicos   │                           │
        │   │    - Nombre        │                           │
        │   │    - Especie       │                           │
        │   │    - Raza          │                           │
        │   │    - Edad          │                           │
        │   │    - Sexo          │                           │
        │   │  • Descripción     │                           │
        │   │  • Estado Inicial  │                           │
        │   │  • Fotos           │                           │
        │   │                    │                           │
        │   │                    ├─ Validar Datos          │
        │   │                    │   ┌─[Datos Inválidos]     │
        │   │                    │   │                       │
        │   │◄─ Mostrar Errores ─┤◄─┘                       │
        │   │                    │                           │
        │   │                    │   ┌─[Datos Válidos]       │
        │   │                    │   │                       │
        │   │                    ├─ Procesar Imágenes      │
        │   │                    ├─ Crear Registro ────────►│
        │   │                    │                           ├─ Insertar Mascota
        │   │                    │◄─ ID Generado ───────────┤
        │   │                    │                           │
        │   │                    ├─ Crear Ficha Médica ────►│
        │   │                    │   Inicial                │ ├─ Insertar Ficha
        │   │                    │◄─ Ficha Creada ──────────┤
        │   │                    │                           │
        │   │◄─ Confirmar Registro┤                           │
        │   │                    │                           │
        │   └─[Gestionar Existente]                         │
        │   │                    │                           │
        │   ├─ Buscar Mascota ───►│                           │
        │   │  [por ID, nombre,   ├─ Consultar BD ──────────►│
        │   │   o criterios]      │                           ├─ Buscar Registros
        │   │                    │◄─ Resultados ─────────────┤
        │   │◄─ Mostrar Lista ───┤                           │
        │   │                    │                           │
        │   ├─ Seleccionar Item ►│                           │
        │   │                    ├─ Cargar Detalles ───────►│
        │   │                    │                           ├─ Obtener Datos Completos
        │   │                    │◄─ Info Completa ─────────┤
        │   │◄─ Mostrar Detalles ┤                           │
        │   │                    │                           │
        │   ├─ Elegir Acción     │                           │
        │   │   ┌─[Actualizar]    │                           │
        │   │   │                │                           │
        │   │   ├─ Modificar Datos►                          │
        │   │   │                ├─ Validar Cambios        │
        │   │   │                ├─ Actualizar BD ─────────►│
        │   │   │                │                           ├─ Update Registro
        │   │   │                │◄─ Confirmación ──────────┤
        │   │   │◄─ Cambios Guardados─┤                       │
        │   │   │                │                           │
        │   │   └─[Cambiar Estado]                          │
        │   │   │                │                           │
        │   │   ├─ Seleccionar Estado►                        │
        │   │   │  • Disponible   │                           │
        │   │   │  • En Proceso   │                           │
        │   │   │  • No Disponible│                           │
        │   │   │  • Adoptada     │                           │
        │   │   │                │                           │
        │   │   │                ├─ Validar Transición     │
        │   │   │                │   ┌─[Transición Inválida] │
        │   │   │                │   │                       │
        │   │   │◄─ Error Estado ─┤◄─┘                       │
        │   │   │                │                           │
        │   │   │                │   ┌─[Transición Válida]   │
        │   │   │                │   │                       │
        │   │   │                ├─ Actualizar Estado ─────►│
        │   │   │                │                           ├─ Update Estado
        │   │   │                ├─ Registrar Auditoría ───►│
        │   │   │                │                           ├─ Log Cambio
        │   │   │                │◄─ Estado Actualizado ────┤
        │   │   │◄─ Confirmar Cambio─┤                       │
        │   │   │                │                           │
        └───── Fin ─────────────│                           │
                                │                           │

Actividades de Fondo:
• Backup automático de datos cada 24h
• Verificación de integridad referencial
• Limpieza de archivos temporales
• Generación de reportes estadísticos
```

---

# 4.2.5 Diagramas de Interacción

## 4.2.5.1 Diagrama de Secuencia

*Nota: Los diagramas de secuencia ya están detallados en el archivo `diagramas_secuencia.md`. Aquí se presenta un resumen de los principales:*

### Principales Secuencias Implementadas:

1. **Autenticación de Usuario**
   - Usuario → Frontend → Backend → Middleware → Base de Datos → JWT Service

2. **Solicitud de Adopción**
   - Adoptante → Frontend → Backend → Auth Middleware → Base de Datos → Email Service

3. **Gestión de Solicitud por Personal**
   - Personal → Frontend → Backend → Auth Middleware → Base de Datos → Email Service

4. **Reporte de Mascota Perdida**
   - Dueño → Frontend → Backend → Auth Middleware → Base de Datos → Push Service

5. **Consulta de Mascotas (Usuario Anónimo)**
   - Usuario Anónimo → Frontend → Backend → Cache → Base de Datos

6. **Registro de Nueva Mascota**
   - Personal → Frontend → Backend → Auth Middleware → File Upload → Base de Datos

7. **Sistema de Mensajería**
   - Remitente → Frontend → Backend → Auth Middleware → Base de Datos → WebSocket Service

## 4.2.5.2 Diagrama de Colaboración

*Nota: Los diagramas de colaboración ya están detallados en el archivo `diagramas_comportamiento_complementarios.md`. Incluyen:*

### Colaboraciones Principales:

1. **Comunicación en Proceso de Adopción**
   - Interacción entre :Adoptante, :SolicitudCtrl, :Mascota, :SolicitudModel, :EmailService, :Database

2. **Comunicación en Gestión de Alertas**
   - Interacción entre :Dueno, :AlertaCtrl, :AlertaModel, :MatchService, :PushService, :Database

---

# 4.2.6 Diagramas de Implementación

## 4.2.6.1 Diagrama de Componentes

*Nota: El diagrama de componentes está detallado en el archivo `diagramas_estructurales_complementarios.md`. Incluye:*

### Arquitectura de Componentes:

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Pages     │  │ Components  │  │   Assets    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP/HTTPS REST API
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js/Express)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Routes    │  │ Controllers │  │ Middleware  │             │
│  │   Models    │  │  Services   │  │   Config    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Sequelize ORM
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SQLite Database                            │
└─────────────────────────────────────────────────────────────────┘
```

## 4.2.6.2 Diagrama de Despliegue

*Nota: El diagrama de despliegue está detallado en el archivo `diagramas_estructurales_complementarios.md`. Incluye:*

### Infraestructura de Despliegue:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT DEVICES                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Desktop   │  │   Mobile    │  │   Tablet    │             │
│  │   Browser   │  │   Browser   │  │   Browser   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────┬───────────────────────────────────────────────────┘
              │ HTTPS/443
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     WEB SERVER                                  │
│              Frontend Server (Vite Dev Server)                  │
│                        Port: 5173                               │
└─────────────┬───────────────────────────────────────────────────┘
              │ API Calls HTTP/3001
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION SERVER                            │
│              Backend Application (Express.js)                   │
│                        Port: 3001                               │
└─────────────┬───────────────────────────────────────────────────┘
              │ SQL Queries
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE SERVER                              │
│                   SQLite DB Engine                              │
│                 File: database.sqlite                           │
└─────────────────────────────────────────────────────────────────┘

External Services:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Email SMTP  │    │ Cloud CDN   │    │ Monitoring  │
│   Service   │    │  (Optional) │    │   Service   │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Configuración de Producción:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend: Static Files served by Nginx/Apache                 │
│  Backend: Node.js with PM2 Process Manager                     │
│  Database: PostgreSQL/MySQL for production                     │
│  Reverse Proxy: Nginx with SSL/TLS                            │
│  Security: Let's Encrypt SSL certificates                      │
│  Monitoring: PM2 + Application logs + Health checks            │
│  Backup: Automated database backups                            │
│  CDN: Static assets served from Content Delivery Network      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
