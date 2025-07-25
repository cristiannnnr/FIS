# 4.2.3 Diagramas de Comportamiento - Complementarios

## 4.2.3.4 Diagrama de Comunicación/Colaboración

### Comunicación entre Objetos - Proceso de Adopción

```
                    DIAGRAMA DE COMUNICACIÓN
                   (Proceso de Solicitud de Adopción)

    1: crearSolicitud(mascota_id)
    ┌─────────────────┐ ──────────────────► ┌─────────────────┐
    │                 │                      │                 │
    │   :Adoptante    │                      │ :SolicitudCtrl  │
    │                 │ ◄────────────────── │                 │
    └─────────────────┘  7: confirmarCreacion └─────────────────┘
                                                      │
                                                      │ 2: validarMascota(id)
                                                      ▼
                             ┌─────────────────┐ ◄─────────────────
                             │                 │ 3: estadoMascota
                             │    :Mascota     │ ──────────────────►
                             │                 │                     
                             └─────────────────┘                     
                                      │
                                      │ 4: crearRegistro(datos)
                                      ▼
    6: enviarNotificacion()    ┌─────────────────┐
    ┌─────────────────┐ ◄───── │                 │
    │                 │        │ :SolicitudModel │
    │ :EmailService   │        │                 │
    │                 │ ─────► └─────────────────┘
    └─────────────────┘  5: obtenerDatosCentro()        │
                                                        │
                                                        │ persistir()
                                                        ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │   :Database     │
                                              │                 │
                                              └─────────────────┘

Mensajes Numerados:
1: crearSolicitud(mascota_id) - Adoptante inicia solicitud
2: validarMascota(id) - Controlador valida mascota
3: estadoMascota - Mascota retorna su estado
4: crearRegistro(datos) - Se crea el modelo de solicitud
5: obtenerDatosCentro() - Se obtienen datos del centro
6: enviarNotificacion() - Se envía email al centro
7: confirmarCreacion - Se confirma al adoptante
```

### Comunicación - Gestión de Alertas

```
                    COMUNICACIÓN DE ALERTAS
                   (Reporte de Mascota Perdida)

    1: reportarPerdida(datos)
    ┌─────────────────┐ ──────────────────► ┌─────────────────┐
    │                 │                      │                 │
    │    :Dueno       │                      │  :AlertaCtrl    │
    │                 │ ◄────────────────── │                 │
    └─────────────────┘  8: confirmarAlerta  └─────────────────┘
                                                      │
                                                      │ 2: crearAlerta(datos)
                                                      ▼
                             ┌─────────────────┐ ◄─────────────────
                             │                 │ 3: alertaCreada  
                             │ :AlertaModel    │ ──────────────────►
                             │                 │                     
                             └─────────────────┘                     
                                      │
                                      │ 4: buscarCoincidencias()
                                      ▼
    7: notificarUsuarios()     ┌─────────────────┐
    ┌─────────────────┐ ◄───── │                 │
    │                 │        │ :MatchService   │
    │ :PushService    │        │                 │
    │                 │ ─────► └─────────────────┘
    └─────────────────┘   6: obtenerContactos()        │
                                                        │
                                                        │ 5: buscarSimilares()
                                                        ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │   :Database     │
                                              │                 │
                                              └─────────────────┘

Flujo de Mensajes:
1: reportarPerdida(datos) - Usuario reporta mascota perdida
2: crearAlerta(datos) - Controlador procesa los datos
3: alertaCreada - Se confirma creación en BD
4: buscarCoincidencias() - Se buscan alertas similares  
5: buscarSimilares() - Consulta en base de datos
6: obtenerContactos() - Se obtienen usuarios a notificar
7: notificarUsuarios() - Se envían notificaciones push
8: confirmarAlerta - Se confirma al usuario
```

## 4.2.3.5 Diagrama de Temporización (Timing)

### Temporización - Ciclo de Vida de una Solicitud

```
                    DIAGRAMA DE TEMPORIZACIÓN
                   (Estados de Solicitud vs Tiempo)

    Estados     │
                │
    COMPLETADA  ├─────────────────────────────────────────────────────────
                │                                                    ┌────
    PROGRAMADA  ├───────────────────────────────────────────────┬────┘
                │                                           ┌───┘
    APROBADA    ├─────────────────────────────────────┬─────┘
                │                                ┌────┘
    PENDIENTE   ├──────────────────────────┬─────┘
                │                     ┌────┘
    CREADA      ├─────────────────┬────┘
                │            ┌────┘
    INICIAL     ├────────────┘
                │
                └───┬────┬────┬────┬────┬────┬────┬────┬────┬──── Tiempo
                   0    1h   2h   1d   3d   5d   7d   10d  15d

Eventos Críticos:
• 0h: Solicitud creada por adoptante
• 1h: Personal recibe notificación  
• 2h: Personal revisa documentos
• 1d: Decisión tomada (aprobar/rechazar)
• 3d: Programación de entrega
• 5d: Preparación de documentos
• 7d: Entrega realizada
• 10d: Período de adaptación
• 15d: Adopción confirmada

Restricciones Temporales:
- Evaluación: Máximo 3 días
- Programación: Máximo 2 días después de aprobación
- Entrega: Máximo 5 días después de programación
```

### Temporización - Sesión de Usuario

```
                    TEMPORIZACIÓN DE SESIÓN

    Estado      │
                │
    EXPIRADA    ├─────────────────────────────────────────────────────────
                │                                                    ┌────
    EXPIRANDO   ├───────────────────────────────────────────────┬────┘
                │                                          ┌────┘
    ACTIVA      ├──────────────────────────────────────────┘
                │    ┌─────────────────────────────────────┐
    INACTIVA    ├────┘                                     └────┬────
                │                                               │
    SIN_SESION  ├────┬──────────────────────────────────────────┘
                │    └┐
                │     └┐ Login
                │      └┐
                └───────┴────┬────┬────┬────┬────┬────┬────┬──── Tiempo
                           Login 5min 10min 25min 28min 30min Logout

Eventos de Tiempo:
• Login: Usuario inicia sesión
• 5min: Actividad detectada (reset timer)
• 10min: Actividad detectada (reset timer)  
• 25min: Inactividad detectada
• 28min: Warning de expiración
• 30min: Expiración automática
• Logout: Cierre manual de sesión

Timeouts Configurados:
- Inactividad: 25 minutos
- Warning: 2 minutos antes de expirar
- Expiración total: 30 minutos
- Renovación automática: Si hay actividad
```

### Temporización - Proceso de Alertas

```
                    TEMPORIZACIÓN DE ALERTAS

    Estado      │
                │
    ARCHIVADA   ├─────────────────────────────────────────────────────────
                │                                                    ┌────
    EXPIRADA    ├───────────────────────────────────────────────┬────┘
                │                                          ┌────┘
    RESUELTA    ├─────────────────────────────┬─────────────┘
                │                        ┌────┘
    ACTIVA      ├────────────────────┬────┘
                │               ┌────┘
    CREADA      ├───────────────┘
                │
                └───┬────┬────┬────┬────┬────┬────┬────┬────┬──── Tiempo
                   0   1h   6h   1d   7d   15d  30d  35d  60d

Ciclo de Vida:
• 0h: Alerta creada
• 1h: Publicada en sistema
• 6h: Primera búsqueda de coincidencias
• 1d: Notificaciones enviadas
• 7d: Revisión de estado
• 15d: Recordatorio al usuario
• 30d: Expiración automática
• 35d: Período de gracia para renovar
• 60d: Archivado permanente

Políticas de Tiempo:
- Búsqueda automática: Cada 6 horas
- Recordatorios: Cada 15 días
- Expiración: 30 días
- Gracia para renovar: 5 días
- Archivado final: 60 días
```

## 4.2.3.6 Diagrama de Interacción General

### Vista General de Flujos de Control

```
                    DIAGRAMA DE INTERACCIÓN GENERAL
                        (Flujo Principal del Sistema)

    ┌─────────────────────────────────────────────────────────────────┐
    │                    INICIO DEL SISTEMA                           │
    └─────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                  AUTENTICACIÓN                                  │
    │                                                                 │
    │  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
    │  │   Registro  │   │    Login    │   │ Recuperar   │           │
    │  │             │   │             │   │ Password    │           │
    │  └─────────────┘   └─────────────┘   └─────────────┘           │
    └─────────────────────────┬───────────────────────────────────────┘
                              │ [usuario autenticado]
                              ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │                  NAVEGACIÓN PRINCIPAL                           │
    │                                                                 │
    │         ┌─────────────┐              ┌─────────────┐            │
    │         │   Consulta  │              │  Gestión    │            │
    │         │   Pública   │              │ Autenticada │            │
    │         └─────┬───────┘              └──────┬──────┘            │
    └───────────────┼──────────────────────────────┼──────────────────┘
                    │                              │
         ┌──────────┼──────────┐        ┌─────────┼─────────┐
         │                     │        │                   │
         ▼                     ▼        ▼                   ▼
    ┌─────────┐         ┌─────────┐  ┌─────────┐     ┌─────────┐
    │Ver      │         │Ver      │  │Gestionar│     │Gestionar│
    │Mascotas │         │Alertas  │  │Mascotas │     │Solicitudes│
    └────┬────┘         └────┬────┘  └────┬────┘     └────┬────┘
         │                   │            │               │
         │ [seleccionar]     │            │ [crear nueva] │
         ▼                   │            ▼               │
    ┌─────────┐              │       ┌─────────┐          │
    │Detalle  │              │       │Registrar│          │
    │Mascota  │              │       │Mascota  │          │
    └────┬────┘              │       └────┬────┘          │
         │                   │            │               │
         │ [solicitar]       │            │ [guardar]     │
         ▼                   │            ▼               │
    ┌─────────┐              │       ┌─────────┐          │
    │Crear    │              │       │Crear    │          │
    │Solicitud│              │       │Ficha    │          │
    └────┬────┘              │       │Médica   │          │
         │                   │       └─────────┘          │
         │ [enviar]          │                            │
         ▼                   │                            │
    ┌─────────┐              │                            │
    │Confirmar│              │                            │
    │Solicitud│              │                            │
    └─────────┘              │                            │
                             │                            │
                             │ [reportar]                 │ [evaluar]
                             ▼                            ▼
                        ┌─────────┐                  ┌─────────┐
                        │Crear    │                  │Revisar  │
                        │Alerta   │                  │Solicitud│
                        └────┬────┘                  └────┬────┘
                             │                            │
                             │ [publicar]                 │
                             ▼                            │
                        ┌─────────┐                       │
                        │Buscar   │                       │
                        │Coincidencias│                   │
                        └────┬────┘                       │
                             │                            │
                             │ [encontrar]                │ [decidir]
                             ▼                            ▼
                        ┌─────────┐                  ┌─────────┐
                        │Notificar│                  │Aprobar/ │
                        │Usuarios │                  │Rechazar │
                        └─────────┘                  └────┬────┘
                                                          │
                                                          │ [si aprobada]
                                                          ▼
                                                     ┌─────────┐
                                                     │Programar│
                                                     │Entrega  │
                                                     └────┬────┘
                                                          │
                                                          │ [realizar]
                                                          ▼
                                                     ┌─────────┐
                                                     │Completar│
                                                     │Adopción │
                                                     └─────────┘

    ref: Autenticación
    ┌─────────────────────────────────────────────────────────────────┐
    │                    SUBPROCESO: LOGIN                            │
    │                                                                 │
    │  Usuario → Credenciales → Validación → Token → Redirección     │
    │                              │                                  │
    │                         [si válido]                            │
    │                              │                                  │
    │                              ▼                                  │
    │                         Establecer Sesión                      │
    └─────────────────────────────────────────────────────────────────┘

    ref: Gestión de Solicitudes  
    ┌─────────────────────────────────────────────────────────────────┐
    │                SUBPROCESO: EVALUACIÓN                          │
    │                                                                 │
    │  Solicitud → Revisar Docs → Evaluar → Decisión → Notificar     │
    │                    │                     │                      │
    │               [documentos OK]       [aprobar/rechazar]          │
    │                    │                     │                      │
    │                    ▼                     ▼                      │
    │              Verificar Adoptante    Actualizar Estado           │
    └─────────────────────────────────────────────────────────────────┘
```

### Matriz de Interacciones

```
┌─────────────────────────────────────────────────────────────────┐
│                    MATRIZ DE INTERACCIONES                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           │ User │ Auth │ Mascota │ Solicitud │ Alerta │ Centro │
│───────────┼──────┼──────┼─────────┼───────────┼────────┼────────│
│ User      │  -   │  R   │    R    │     C     │   C    │   R    │
│ Auth      │  U   │  -   │    -    │     -     │   -    │   -    │  
│ Mascota   │  -   │  -   │    U    │     R     │   R    │   -    │
│ Solicitud │  R   │  -   │    R    │     U     │   -    │   R    │
│ Alerta    │  R   │  -   │    R    │     -     │   U    │   -    │
│ Centro    │  R   │  -   │    C    │     R     │   -    │   U    │
│                                                                 │
│ Leyenda:                                                        │
│ C = Create (Crear)                                              │
│ R = Read (Leer)                                                 │
│ U = Update (Actualizar)                                         │
│ D = Delete (Eliminar)                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flujos Críticos del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                      FLUJOS CRÍTICOS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 1. FLUJO DE ADOPCIÓN (Principal)                                │
│    Usuario → Buscar → Seleccionar → Solicitar → Evaluar →      │
│    Aprobar → Programar → Entregar → Completar                  │
│                                                                 │
│ 2. FLUJO DE ALERTAS (Secundario)                               │
│    Usuario → Reportar → Publicar → Buscar → Coincidir →        │
│    Notificar → Resolver                                        │
│                                                                 │
│ 3. FLUJO DE GESTIÓN (Administrativo)                           │
│    Personal → Autenticar → Gestionar → Modificar →             │
│    Actualizar → Notificar                                      │
│                                                                 │
│ 4. FLUJO DE CONSULTA (Público)                                 │
│    Visitante → Navegar → Consultar → Ver → Registrar           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Estos diagramas complementarios proporcionan una vista completa del comportamiento y la estructura del sistema, mostrando cómo los componentes interactúan en el tiempo y cómo están organizados arquitectónicamente.
