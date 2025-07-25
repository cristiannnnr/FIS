# 4.2.3 Diagramas Estructurales

## 4.2.3.1 Diagrama de Clases

### Diagrama de Clases del Sistema de Adopciones y Alertas de Mascotas

```
┌─────────────────────────────────────┐
│               Usuario               │
├─────────────────────────────────────┤
│ - id: Integer (PK)                  │
│ - nombre: String                    │
│ - email: String (Unique)            │
│ - password: String                  │
│ - rol: Enum('admin', 'personal',    │
│         'adoptante', 'dueno')       │
├─────────────────────────────────────┤
│ + registrar(): Boolean              │
│ + autenticar(email, password): JWT  │
│ + cerrarSesion(): Boolean          │
│ + actualizarPerfil(): Boolean      │
│ + validarRol(rol): Boolean         │
└─────────────────────────────────────┘
                    │
                    │ 1..*
                    ▼
┌─────────────────────────────────────┐         ┌─────────────────────────────────────┐
│           CentroAtencion            │         │             Mascota                 │
├─────────────────────────────────────┤         ├─────────────────────────────────────┤
│ - id: Integer (PK)                  │         │ - id: Integer (PK)                  │
│ - nombre: String                    │         │ - nombre: String                    │
│ - direccion: String                 │    1    │ - especie: String                   │
│ - telefono: String                  │◄────────│ - raza: String                      │
│ - email: String                     │    1..* │ - edad: Integer                     │
│ - encargado_id: Integer (FK)        │         │ - sexo: String                      │
├─────────────────────────────────────┤         │ - descripcion: Text                 │
│ + crearCentro(): Boolean            │         │ - foto: String                      │
│ + actualizarInfo(): Boolean         │         │ - estado: String                    │
│ + eliminarCentro(): Boolean         │         │ - id_centro: Integer (FK)           │
│ + asignarPersonal(): Boolean        │         ├─────────────────────────────────────┤
│ + obtenerMascotas(): Array          │         │ + registrarMascota(): Boolean       │
└─────────────────────────────────────┘         │ + actualizarEstado(): Boolean       │
                    │                           │ + eliminarMascota(): Boolean        │
                    │                           │ + buscarPorCriterios(): Array       │
                    │                           │ + cambiarEstado(estado): Boolean    │
                    │                           └─────────────────────────────────────┘
                    │                                           │
                    │                                           │ 1
                    │                                           ▼
                    │                           ┌─────────────────────────────────────┐
                    │                           │           FichaMedica               │
                    │                           ├─────────────────────────────────────┤
                    │                           │ - id: Integer (PK)                  │
                    │                           │ - id_mascota: Integer (FK)          │
                    │                           │ - peso: Decimal                     │
                    │                           │ - altura: Decimal                   │
                    │                           │ - vacunas: Text                     │
                    │                           │ - tratamientos: Text                │
                    │                           │ - observaciones: Text               │
                    │                           │ - fecha_ultima_revision: Date       │
                    │                           ├─────────────────────────────────────┤
                    │                           │ + crearFicha(): Boolean             │
                    │                           │ + actualizarFicha(): Boolean        │
                    │                           │ + agregarVacuna(): Boolean          │
                    │                           │ + agregarTratamiento(): Boolean     │
                    │                           │ + obtenerHistorial(): Array         │
                    │                           └─────────────────────────────────────┘
                    │                                           │
                    │                                           │ 1
                    │                                           ▼
                    │                           ┌─────────────────────────────────────┐
                    │                           │        SolicitudAdopcion            │
                    │                      1..* │├─────────────────────────────────────┤
                    └───────────────────────────┤│ - id: Integer (PK)                  │
                                                │ - id_mascota: Integer (FK)          │
┌─────────────────────────────────────┐        │ - id_adoptante: Integer (FK)        │
│              Mensaje                │        │ - estado: String                    │
├─────────────────────────────────────┤        │ - fecha: Date                       │
│ - id: Integer (PK)                  │        │ - id_centro: Integer (FK)           │
│ - id_remitente: Integer (FK)        │        ├─────────────────────────────────────┤
│ - id_destinatario: Integer (FK)     │        │ + crearSolicitud(): Boolean         │
│ - asunto: String                    │        │ + actualizarEstado(): Boolean       │
│ - contenido: Text                   │        │ + aprobarSolicitud(): Boolean       │
│ - fecha_envio: DateTime             │        │ + rechazarSolicitud(): Boolean      │
│ - leido: Boolean                    │        │ + obtenerSolicitudesPorCentro():Array│
├─────────────────────────────────────┤        │ + notificarDecision(): Boolean      │
│ + enviarMensaje(): Boolean          │        └─────────────────────────────────────┘
│ + marcarLeido(): Boolean           │                            │
│ + obtenerConversacion(): Array     │                            │ *
│ + eliminarMensaje(): Boolean       │                            ▼
└─────────────────────────────────────┘        ┌─────────────────────────────────────┐
                    │                           │             Alerta                  │
                    │ *                         ├─────────────────────────────────────┤
                    ▼                           │ - id: Integer (PK)                  │
┌─────────────────────────────────────┐        │ - tipo: Enum('perdido',             │
│        Autenticacion                │        │         'encontrado')               │
├─────────────────────────────────────┤        │ - id_mascota: Integer (FK)          │
│ - token: String                     │        │ - detalles: Text                    │
│ - usuario_id: Integer (FK)          │        │ - foto: String                      │
│ - fecha_expiracion: DateTime        │        │ - ubicacion: String                 │
│ - activo: Boolean                   │        │ - fecha: Date                       │
├─────────────────────────────────────┤        │ - id_usuario: Integer (FK)          │
│ + generarToken(): String            │        ├─────────────────────────────────────┤
│ + validarToken(): Boolean          │        │ + crearAlerta(): Boolean            │
│ + revocarToken(): Boolean          │        │ + buscarCoincidencias(): Array      │
│ + renovarToken(): String           │        │ + marcarResuelta(): Boolean         │
└─────────────────────────────────────┘        │ + notificarUsuarios(): Boolean     │
                                               │ + actualizarDetalles(): Boolean    │
                                               └─────────────────────────────────────┘
```

### Relaciones Detalladas

#### 1. Asociaciones Principales

```
Usuario (1) ──────── (0..*) CentroAtencion
   │                           │
   │ encargado                 │ tiene
   │                           │
   └─ Relación: Un usuario con rol 'personal' o 'admin' 
      puede ser encargado de uno o más centros

CentroAtencion (1) ──────── (0..*) Mascota
   │                               │
   │ alberga                       │ pertenece_a
   │                               │
   └─ Relación: Un centro puede tener múltiples mascotas

Mascota (1) ──────── (1) FichaMedica
   │                      │
   │ tiene                │ pertenece_a
   │                      │
   └─ Relación: Cada mascota tiene una única ficha médica

Usuario (1) ──────── (0..*) SolicitudAdopcion
   │ adoptante                    │
   │                              │ crea
   │                              │
   └─ Relación: Un adoptante puede crear múltiples solicitudes

Mascota (1) ──────── (0..*) SolicitudAdopcion
   │                            │
   │ es_solicitada              │ solicita
   │                            │
   └─ Relación: Una mascota puede tener múltiples solicitudes

Usuario (1) ──────── (0..*) Mensaje
   │ remitente                 │
   │                           │ envía
   │                           │
   └─ Relación: Un usuario puede enviar múltiples mensajes

Usuario (1) ──────── (0..*) Mensaje
   │ destinatario              │
   │                           │ recibe
   │                           │
   └─ Relación: Un usuario puede recibir múltiples mensajes

Usuario (1) ──────── (0..*) Alerta
   │ creador                   │
   │                           │ crea
   │                           │
   └─ Relación: Un usuario puede crear múltiples alertas
```

#### 2. Composición y Agregación

```
CentroAtencion ◆──────── Mascota
│ Composición: Si se elimina el centro, 
│ se deben reasignar las mascotas

Mascota ◆──────── FichaMedica
│ Composición: Si se elimina la mascota,
│ se elimina su ficha médica

Usuario ◇──────── SolicitudAdopcion
│ Agregación: Si se elimina el usuario,
│ las solicitudes quedan huérfanas pero se mantienen

Usuario ◇──────── Alerta
│ Agregación: Si se elimina el usuario,
│ las alertas pueden mantenerse anónimas
```

### Clases de Control y Utilidad

```
┌─────────────────────────────────────┐
│           AuthController            │
├─────────────────────────────────────┤
│ + login(email, password): Response  │
│ + register(userData): Response      │
│ + logout(token): Response          │
│ + validateToken(token): Boolean    │
│ + refreshToken(token): String      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         MascotaController           │
├─────────────────────────────────────┤
│ + obtenerTodas(): Array            │
│ + obtenerPorId(id): Mascota        │
│ + crear(data): Mascota             │
│ + actualizar(id, data): Boolean    │
│ + eliminar(id): Boolean            │
│ + buscarPorFiltros(filtros): Array │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       SolicitudController           │
├─────────────────────────────────────┤
│ + crear(data): SolicitudAdopcion    │
│ + obtenerPorCentro(id): Array      │
│ + actualizarEstado(id, estado): Boolean │
│ + aprobar(id): Boolean             │
│ + rechazar(id, motivo): Boolean    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          AlertaController           │
├─────────────────────────────────────┤
│ + crear(data): Alerta              │
│ + obtenerTodas(): Array            │
│ + buscarCoincidencias(alerta): Array│
│ + marcarResuelta(id): Boolean      │
│ + filtrarPorTipo(tipo): Array      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         NotificationService         │
├─────────────────────────────────────┤
│ + enviarEmail(destinatario, asunto, │
│   contenido): Boolean              │
│ + enviarNotificacionPush(usuario,   │
│   mensaje): Boolean                │
│ + notificarNuevaAlerta(alerta): Boolean │
│ + notificarCambioSolicitud(solicitud): Boolean │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           FileUploadService         │
├─────────────────────────────────────┤
│ + subirImagen(archivo): String      │
│ + eliminarImagen(url): Boolean      │
│ + validarFormato(archivo): Boolean  │
│ + redimensionar(imagen, tamaño): String │
└─────────────────────────────────────┘
```

### Interfaces y Abstracciones

```
┌─────────────────────────────────────┐
│        <<interface>>                │
│           Notificable               │
├─────────────────────────────────────┤
│ + enviarNotificacion(): Boolean     │
│ + configurarNotificaciones(): Boolean │
└─────────────────────────────────────┘
                    ▲
                    │ implements
                    │
┌─────────────────────────────────────┐
│             Usuario                 │
│  (implementa Notificable)           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        <<interface>>                │
│           Auditable                 │
├─────────────────────────────────────┤
│ + obtenerHistorialCambios(): Array  │
│ + registrarCambio(accion): Boolean  │
└─────────────────────────────────────┘
                    ▲
                    │ implements
                    │
         ┌──────────┴──────────┐
         │                     │
┌─────────────────┐   ┌─────────────────┐
│    Mascota      │   │ SolicitudAdopcion│
│ (implementa     │   │ (implementa      │
│  Auditable)     │   │  Auditable)      │
└─────────────────┘   └─────────────────┘

┌─────────────────────────────────────┐
│        <<abstract>>                 │
│           BaseModel                 │
├─────────────────────────────────────┤
│ # id: Integer                       │
│ # created_at: DateTime              │
│ # updated_at: DateTime              │
├─────────────────────────────────────┤
│ + save(): Boolean                   │
│ + delete(): Boolean                 │
│ + validate(): Boolean               │
│ + toJSON(): Object                  │
└─────────────────────────────────────┘
                    ▲
                    │ extends
         ┌──────────┼──────────┐
         │          │          │
┌─────────────┐ ┌─────────┐ ┌─────────────┐
│   Usuario   │ │ Mascota │ │   Alerta    │
└─────────────┘ └─────────┘ └─────────────┘
```

### Enumeraciones

```
┌─────────────────────────────────────┐
│        <<enumeration>>              │
│           TipoUsuario               │
├─────────────────────────────────────┤
│ ADMIN                               │
│ PERSONAL                            │
│ ADOPTANTE                           │
│ DUENO                               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        <<enumeration>>              │
│          EstadoMascota              │
├─────────────────────────────────────┤
│ DISPONIBLE                          │
│ EN_PROCESO                          │
│ ADOPTADA                            │
│ NO_DISPONIBLE                       │
│ PERDIDA                             │
│ ENCONTRADA                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        <<enumeration>>              │
│         EstadoSolicitud             │
├─────────────────────────────────────┤
│ PENDIENTE                           │
│ APROBADA                            │
│ RECHAZADA                           │
│ PROGRAMADA                          │
│ COMPLETADA                          │
│ CANCELADA                           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        <<enumeration>>              │
│           TipoAlerta                │
├─────────────────────────────────────┤
│ PERDIDO                             │
│ ENCONTRADO                          │
└─────────────────────────────────────┘
```

### Restricciones y Reglas de Negocio

```
┌─────────────────────────────────────┐
│         Restricciones OCL           │
├─────────────────────────────────────┤
│                                     │
│ Context Usuario                     │
│ inv emailUnico:                     │
│   Usuario.allInstances()->          │
│   forAll(u1, u2 | u1 <> u2 implies │
│   u1.email <> u2.email)            │
│                                     │
│ Context Mascota                     │
│ inv estadoValido:                   │
│   self.estado in {'disponible',     │
│   'en_proceso', 'adoptada',         │
│   'no_disponible'}                  │
│                                     │
│ Context SolicitudAdopcion           │
│ inv mascotaDisponible:              │
│   self.estado = 'pendiente' implies │
│   self.mascota.estado = 'disponible'│
│                                     │
│ Context SolicitudAdopcion           │
│ inv unaSolicitudAprobadaPorMascota: │
│   SolicitudAdopcion.allInstances()  │
│   ->select(s | s.id_mascota =       │
│   self.id_mascota and              │
│   s.estado = 'aprobada')->size() <= 1│
│                                     │
└─────────────────────────────────────┘
```

### Patrones de Diseño Identificados

1. **Repository Pattern**: Para acceso a datos
2. **Controller Pattern**: Para lógica de presentación
3. **Observer Pattern**: Para notificaciones
4. **Strategy Pattern**: Para diferentes tipos de alertas
5. **Factory Pattern**: Para creación de objetos según rol
6. **Singleton Pattern**: Para servicios de configuración

### Multiplicidades y Cardinalidades

| Relación | Desde | Hacia | Cardinalidad | Descripción |
|----------|-------|-------|--------------|-------------|
| Usuario-CentroAtencion | Usuario | CentroAtencion | 1:0..* | Un encargado puede gestionar varios centros |
| CentroAtencion-Mascota | CentroAtencion | Mascota | 1:0..* | Un centro puede tener muchas mascotas |
| Mascota-FichaMedica | Mascota | FichaMedica | 1:1 | Cada mascota tiene una ficha médica |
| Usuario-SolicitudAdopcion | Usuario | SolicitudAdopcion | 1:0..* | Un adoptante puede hacer varias solicitudes |
| Mascota-SolicitudAdopcion | Mascota | SolicitudAdopcion | 1:0..* | Una mascota puede tener varias solicitudes |
| Usuario-Mensaje (Remitente) | Usuario | Mensaje | 1:0..* | Un usuario puede enviar muchos mensajes |
| Usuario-Mensaje (Destinatario) | Usuario | Mensaje | 1:0..* | Un usuario puede recibir muchos mensajes |
| Usuario-Alerta | Usuario | Alerta | 1:0..* | Un usuario puede crear muchas alertas |

---

## Referencias a Diagramas Relacionados

- **4.2.4.1 Diagrama de Estados**: Consulte `diagrama_estados.md`
- **4.2.4.2 Diagrama de Actividades**: Consulte `diagramas_reorganizados.md`
- **4.2.5.1 Diagrama de Secuencia**: Consulte `diagramas_secuencia.md`
- **4.2.5.2 Diagrama de Colaboración**: Consulte `diagramas_comportamiento_complementarios.md`
- **4.2.6.1 Diagrama de Componentes**: Consulte `diagramas_estructurales_complementarios.md`
- **4.2.6.2 Diagrama de Despliegue**: Consulte `diagramas_reorganizados.md`
