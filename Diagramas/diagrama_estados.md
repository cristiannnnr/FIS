# 4.2.4 Diagramas de Comportamiento

## 4.2.4.1 Diagrama de Estados

### Diagrama de Estados - Solicitud de Adopción

```
                    ESTADOS DE SOLICITUD DE ADOPCIÓN

    ┌─────────────┐
    │   INICIAL   │
    └──────┬──────┘
           │ crear solicitud
           │ [adoptante autenticado AND mascota disponible]
           ▼
    ┌─────────────┐
    │  PENDIENTE  │◄──────────┐
    └──────┬──────┘           │
           │                  │ revertir aprobación
           │ personal evalúa  │ [error en proceso]
           │                  │
    ┌──────┼──────┐           │
    │             │           │
    │[rechazar]   │[aprobar]  │
    │             │           │
    ▼             ▼           │
┌─────────┐   ┌─────────┐     │
│RECHAZADA│   │APROBADA │─────┘
└─────────┘   └────┬────┘
    │              │ programar entrega
    │              │ [documentos completos]
    │              ▼
    │         ┌─────────────┐
    │         │ PROGRAMADA  │
    │         └──────┬──────┘
    │                │ realizar entrega
    │                │ [mascota entregada AND documentos firmados]
    │                ▼
    │         ┌─────────────┐
    │         │ COMPLETADA  │
    │         └─────────────┘
    │                │
    │[cancelar]      │ [problema post-adopción]
    ▼                ▼
┌─────────┐   ┌─────────────┐
│CANCELADA│   │  DEVUELTA   │
└─────────┘   └─────────────┘

Estados Finales: RECHAZADA, COMPLETADA, CANCELADA, DEVUELTA
```

### Diagrama de Estados - Mascota

```
                         ESTADOS DE MASCOTA

    ┌─────────────┐
    │    NUEVA    │
    └──────┬──────┘
           │ registrar en sistema
           │ [datos completos AND centro asignado]
           ▼
    ┌─────────────┐
    │ DISPONIBLE  │◄─────────────────┐
    └──────┬──────┘                  │
           │                         │
           │ recibir solicitud        │ devolver
           │ [solicitud válida]       │ [adopción revertida]
           ▼                         │
    ┌─────────────┐                  │
    │ EN_PROCESO  │                  │
    └──────┬──────┘                  │
           │                         │
    ┌──────┼──────┐                  │
    │             │                  │
    │[rechazar    │[aprobar          │
    │ solicitud]  │ solicitud]       │
    │             │                  │
    ▼             ▼                  │
┌─────────┐   ┌─────────┐            │
│DISPONIBLE│   │ADOPTADA │────────────┘
└─────────┘   └────┬────┘
    ▲              │
    │              │ marcar no disponible
    │              │ [enfermedad, lesión, etc.]
    │              ▼
    │         ┌─────────────┐
    │         │NO_DISPONIBLE│
    │         └──────┬──────┘
    │                │ recuperar
    │                │ [tratamiento completado]
    └────────────────┘

                ┌─────────────┐
                │   PERDIDA   │ ←─── reporte de dueño
                └──────┬──────┘
                       │ encontrar
                       │ [coincidencia con alerta]
                       ▼
                ┌─────────────┐
                │ ENCONTRADA  │ ←─── reporte de usuario
                └─────────────┘

Estados Finales: ADOPTADA (permanente), ENCONTRADA (puede volver a DISPONIBLE)
```

### Diagrama de Estados - Usuario

```
                         ESTADOS DE USUARIO

    ┌─────────────┐
    │ NO_REGISTRADO│
    └──────┬──────┘
           │ registro exitoso
           │ [datos válidos AND email único]
           ▼
    ┌─────────────┐
    │  REGISTRADO │
    └──────┬──────┘
           │ login exitoso
           │ [credenciales válidas]
           ▼
    ┌─────────────┐                    ┌─────────────┐
    │   ACTIVO    │◄───────────────────┤  INACTIVO   │
    └──────┬──────┘                    └──────┬──────┘
           │                                  ▲
           │ logout / timeout                 │
           │ [sesión expirada]                │ reactivar cuenta
           └──────────────────────────────────┘ [admin autoriza]
           
    ┌─────────────┐
    │ SUSPENDIDO  │ ←─── suspender cuenta
    └──────┬──────┘      [violación términos]
           │
           │ rehabilitar
           │ [revisión administrativa]
           ▼
    ┌─────────────┐
    │   ACTIVO    │
    └─────────────┘

Estados por Rol:
- ADOPTANTE: puede crear solicitudes cuando ACTIVO
- PERSONAL: puede gestionar mascotas cuando ACTIVO  
- ADMIN: acceso completo cuando ACTIVO
- DUENO: puede crear alertas cuando ACTIVO
```

### Diagrama de Estados - Alerta

```
                         ESTADOS DE ALERTA

    ┌─────────────┐
    │   CREADA    │
    └──────┬──────┘
           │ publicar en sistema
           │ [datos validados]
           ▼
    ┌─────────────┐
    │   ACTIVA    │
    └──────┬──────┘
           │
    ┌──────┼──────┐
    │             │
    │[timeout]    │[coincidencia encontrada]
    │[30 días]    │[usuario reporta]
    │             │
    ▼             ▼
┌─────────┐   ┌─────────────┐
│EXPIRADA │   │  RESUELTA   │
└─────────┘   └─────────────┘
    │              │
    │ renovar      │ reabrir
    │ [usuario     │ [falsa alarma]
    │  solicita]   │
    ▼              ▼
┌─────────┐   ┌─────────────┐
│ ACTIVA  │   │   ACTIVA    │
└─────────┘   └─────────────┘

Estados Especiales:
- PAUSADA: temporal, por moderación
- ARCHIVADA: permanente, para histórico
```

### Diagrama de Estados - Sesión de Usuario

```
                       ESTADOS DE SESIÓN

    ┌─────────────┐
    │ SIN_SESION  │
    └──────┬──────┘
           │ intentar login
           │ [credenciales ingresadas]
           ▼
    ┌─────────────┐
    │ AUTENTICANDO│
    └──────┬──────┘
           │
    ┌──────┼──────┐
    │             │
    │[falló]      │[éxito]
    │             │
    ▼             ▼
┌─────────┐   ┌─────────────┐
│SIN_SESION│   │   ACTIVA    │
└─────────┘   └──────┬──────┘
    ▲                │
    │                │ actividad de usuario
    │                │ [reset timer]
    │                ▼
    │         ┌─────────────┐
    │         │   ACTIVA    │ ←─┐
    │         └──────┬──────┘   │
    │                │          │ renovar token
    │                │ timeout  │ [antes de expirar]
    │                │ warning  │
    │                ▼          │
    │         ┌─────────────┐   │
    │         │ EXPIRANDO   │───┘
    │         └──────┬──────┘
    │                │ timeout final
    │                │ [sin actividad]
    └────────────────┘

Transiciones Especiales:
- logout manual: ACTIVA → SIN_SESION
- forzar logout: cualquier estado → SIN_SESION
- cambio de password: ACTIVA → SIN_SESION (requiere re-login)
```

### Diagrama de Estados - Centro de Atención

```
                    ESTADOS DE CENTRO DE ATENCIÓN

    ┌─────────────┐
    │   CREADO    │
    └──────┬──────┘
           │ asignar personal
           │ [al menos un encargado]
           ▼
    ┌─────────────┐
    │ OPERATIVO   │
    └──────┬──────┘
           │
    ┌──────┼──────┐
    │             │
    │[mantenimiento] [sin personal]
    │             │
    ▼             ▼
┌─────────────┐ ┌─────────────┐
│MANTENIMIENTO│ │ INACTIVO    │
└──────┬──────┘ └──────┬──────┘
       │               │
       │ completar     │ asignar personal
       │ mantenimiento │ [nuevo encargado]
       ▼               ▼
┌─────────────┐ ┌─────────────┐
│ OPERATIVO   │ │ OPERATIVO   │
└─────────────┘ └─────────────┘

Estados de Capacidad:
- COMPLETO: no puede recibir más mascotas
- DISPONIBLE: puede recibir mascotas
- LIMITADO: capacidad reducida
```

### Transiciones con Eventos y Condiciones

#### Solicitud de Adopción - Transiciones Detalladas

```
Estado: PENDIENTE
├─ Evento: evaluarSolicitud()
│  ├─ [cumpleRequisitos() == true] → APROBADA
│  └─ [cumpleRequisitos() == false] → RECHAZADA
├─ Evento: cancelarPorAdoptante() → CANCELADA
└─ Evento: timeoutEvaluacion() [después 30 días] → EXPIRADA

Estado: APROBADA  
├─ Evento: programarEntrega()
│  ├─ [documentosCompletos() == true] → PROGRAMADA
│  └─ [documentosCompletos() == false] → PENDIENTE_DOCUMENTOS
├─ Evento: cancelarPorCentro() → CANCELADA
└─ Evento: problemasLegales() → SUSPENDIDA

Estado: PROGRAMADA
├─ Evento: realizarEntrega()
│  ├─ [entregaExitosa() == true] → COMPLETADA
│  └─ [problemaEnEntrega() == true] → APROBADA
├─ Evento: cancelarCita() → APROBADA
└─ Evento: noAsistencia() [después 3 días] → CANCELADA

Estado: COMPLETADA
├─ Evento: reportarProblema() [dentro 30 días] → EN_REVISION
└─ Evento: solicitarDevolucion() → PROCESO_DEVOLUCION
```

#### Mascota - Transiciones con Guardas

```
Estado: DISPONIBLE
├─ Evento: recibirSolicitud(solicitud)
│  ├─ [solicitud.adoptante.esValido() == true] → EN_PROCESO
│  └─ [solicitud.adoptante.esValido() == false] → DISPONIBLE
├─ Evento: marcarNoDisponible(motivo)
│  ├─ [motivo == "enfermedad"] → NO_DISPONIBLE
│  ├─ [motivo == "comportamiento"] → EN_EVALUACION
│  └─ [motivo == "adoptada"] → ADOPTADA
└─ Evento: reportarPerdida() → PERDIDA

Estado: EN_PROCESO
├─ Evento: aprobarSolicitud() → ADOPTADA
├─ Evento: rechazarSolicitud() → DISPONIBLE
├─ Evento: cancelarProceso() → DISPONIBLE
└─ Evento: timeout() [después 15 días sin decisión] → DISPONIBLE

Estado: NO_DISPONIBLE
├─ Evento: completarTratamiento()
│  ├─ [evaluacionVeterinaria() == "apto"] → DISPONIBLE
│  └─ [evaluacionVeterinaria() == "no_apto"] → RETIRADA
└─ Evento: eutanasia() [casos extremos] → RETIRADA
```

### Diagramas de Estados Anidados

#### Estado Compuesto - Usuario Autenticado

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO_AUTENTICADO                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    navegación     ┌─────────────┐              │
│  │   NAVEGANDO │◄─────────────────►│ REALIZANDO  │              │
│  │             │                   │   ACCION    │              │
│  └─────────────┘                   └─────────────┘              │
│         │                                 │                     │
│         │ timeout inactividad             │ completar acción    │
│         ▼                                 ▼                     │
│  ┌─────────────┐                   ┌─────────────┐              │
│  │   INACTIVO  │                   │   NAVEGANDO │              │
│  └─────────────┘                   └─────────────┘              │
│         │                                                       │
│         │ actividad detectada                                   │
│         └─────────────────────────────────────────────────────┐ │
│                                                               │ │
│                                                               ▼ │
│                                                        ┌─────────┐│
│                                                        │NAVEGANDO││
│                                                        └─────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Estados Concurrentes - Sistema de Notificaciones

```
┌─────────────────────────────────────────────────────────────────┐
│                     SISTEMA_NOTIFICACIONES                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐                    ┌─────────────┐             │
│  │   EMAIL     │                    │    PUSH     │             │
│  ├─────────────┤                    ├─────────────┤             │
│  │ ○ Inactivo  │                    │ ○ Inactivo  │             │
│  │ ● Enviando  │       ||           │ ● Enviando  │             │
│  │ ○ Completado│                    │ ○ Completado│             │
│  │ ○ Error     │                    │ ○ Error     │             │
│  └─────────────┘                    └─────────────┘             │
│                                                                 │
│  ┌─────────────┐                    ┌─────────────┐             │
│  │    SMS      │                    │  IN_APP     │             │
│  ├─────────────┤                    ├─────────────┤             │
│  │ ○ Inactivo  │                    │ ○ Inactivo  │             │
│  │ ● Enviando  │       ||           │ ● Mostrando │             │
│  │ ○ Completado│                    │ ○ Leído     │             │
│  │ ○ Error     │                    │ ○ Descartado│             │
│  └─────────────┘                    └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Nota: || indica que los estados son concurrentes (pueden ejecutarse simultáneamente)
```

### Invariantes y Restricciones de Estados

```
┌─────────────────────────────────────────────────────────────────┐
│                       INVARIANTES                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ INV-001: Una mascota ADOPTADA no puede recibir nuevas           │
│          solicitudes de adopción                               │
│                                                                 │
│ INV-002: Un usuario SUSPENDIDO no puede realizar acciones      │
│          que requieran autenticación                           │
│                                                                 │
│ INV-003: Una solicitud COMPLETADA no puede cambiar de estado   │
│          excepto a DEVUELTA                                    │
│                                                                 │
│ INV-004: Una alerta EXPIRADA puede renovarse solo por su       │
│          creador original                                      │
│                                                                 │
│ INV-005: Un centro INACTIVO no puede gestionar solicitudes     │
│          de adopción nuevas                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Eventos del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    EVENTOS DEL SISTEMA                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ E001: UsuarioRegistrado(usuario, timestamp)                     │
│ E002: SolicitudCreada(solicitud, mascota, adoptante)           │
│ E003: SolicitudAprobada(solicitud, personal)                   │
│ E004: MascotaAdoptada(mascota, adoptante, fecha)               │
│ E005: AlertaCreada(alerta, usuario, tipo)                      │
│ E006: AlertaResuelta(alerta, resolucion)                       │
│ E007: SesionExpirada(usuario, sessionId)                       │
│ E008: CentroInactivo(centro, motivo)                           │
│ E009: NotificacionEnviada(tipo, destinatario, estado)          │
│ E010: ErrorSistema(modulo, descripcion, timestamp)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Estos diagramas de estados proporcionan una vista completa del comportamiento dinámico del sistema, mostrando cómo los objetos cambian de estado en respuesta a eventos y bajo qué condiciones ocurren estas transiciones.
