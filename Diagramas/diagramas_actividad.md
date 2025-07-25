# Diagramas de Actividad - Procesos Clave del Sistema

## 1. Diagrama de Actividad: Proceso de Adopción

```
                    PROCESO DE ADOPCIÓN DE MASCOTA
    
    Adoptante                 Sistema                    Personal Centro
        │                        │                           │
        ├─ Buscar Mascotas ──────►│                           │
        │                        ├─ Mostrar Catálogo ───────►│
        │◄─ Ver Catálogo ─────────┤                           │
        │                        │                           │
        ├─ Seleccionar Mascota ──►│                           │
        │                        ├─ Mostrar Detalles ───────►│
        │◄─ Ver Detalles ─────────┤                           │
        │                        │                           │
        ├─ Solicitar Adopción ───►│                           │
        │                        ├─ Validar Datos           │
        │                        │   ┌─[Datos Inválidos]    │
        │                        │   │                       │
        │◄─ Mostrar Error ────────┤◄─┘                       │
        │                        │                           │
        │                        ├─ Crear Solicitud         │
        │                        ├─ Notificar Centro ──────►│
        │◄─ Confirmar Solicitud ──┤                           │
        │                        │                           │◄─ Recibir Notificación ─┤
        │                        │                           │                           │
        │                        │                           ├─ Revisar Solicitud       │
        │                        │                           │   ┌─[Rechazar]            │
        │                        │                           │   │                       │
        │                        │◄─ Actualizar Estado ─────┤◄─┘                       │
        │                        ├─ Notificar Rechazo ─────►│                           │
        │◄─ Recibir Notificación ─┤                           │                           │
        │                        │                           │   ┌─[Aprobar]            │
        │                        │                           │   │                       │
        │                        │◄─ Actualizar Estado ─────┤◄─┘                       │
        │                        ├─ Cambiar Estado Mascota  │                           │
        │                        ├─ Notificar Aprobación ──►│                           │
        │◄─ Recibir Notificación ─┤                           │                           │
        │                        │                           │                           │
        ├─ Coordinar Entrega ────►│────────────────────────────────────────────────────►│
        │                        │                           │◄─ Coordinar Entrega ─────┤
        │                        │                           │                           │
        │                        │◄─ Confirmar Adopción ────┤                           │
        │◄─ Adopción Completada ──┤                           │                           │
        │                        │                           │                           │
```

## 2. Diagrama de Actividad: Reporte de Mascota Perdida

```
                    REPORTE DE MASCOTA PERDIDA
    
    Dueño                     Sistema                    Otros Usuarios
        │                        │                           │
        ├─ Acceder Sistema ──────►│                           │
        │                        ├─ Verificar Autenticación │
        │                        │   ┌─[No Autenticado]      │
        │                        │   │                       │
        │◄─ Redirigir Login ─────┤◄─┘                       │
        │                        │                           │
        ├─ Ir a Reportes ────────►│                           │
        │                        ├─ Mostrar Formulario ─────►│
        │◄─ Ver Formulario ──────┤                           │
        │                        │                           │
        ├─ Completar Datos ──────►│                           │
        │  (Descripción,          │                           │
        │   Ubicación, Foto)      │                           │
        │                        ├─ Validar Información     │
        │                        │   ┌─[Datos Incompletos]   │
        │                        │   │                       │
        │◄─ Solicitar Datos ─────┤◄─┘                       │
        │                        │                           │
        │                        ├─ Crear Alerta           │
        │                        ├─ Publicar en Sistema     │
        │                        ├─ Notificar Usuarios ────►│
        │◄─ Confirmar Reporte ───┤                           │
        │                        │                           │◄─ Ver Nueva Alerta ──────┤
        │                        │                           │                           │
        │                        │◄─ Posible Coincidencia ──┤                           │
        │◄─ Notificar Coincidencia┤                           │                           │
        │                        │                           │                           │
        ├─ Verificar Info ───────►│                           │                           │
        │                        ├─ Contactar Usuario ─────►│                           │
        │                        │                           │◄─ Responder Contacto ────┤
        │◄─ Recibir Respuesta ───┤                           │                           │
        │                        │                           │                           │
        ├─ Confirmar Encuentro ──►│                           │                           │
        │                        ├─ Marcar Resuelta        │                           │
        │                        ├─ Archivar Alerta        │                           │
        │◄─ Cerrar Caso ─────────┤                           │                           │
        │                        │                           │                           │
```

## 3. Diagrama de Actividad: Gestión de Solicitudes (Personal)

```
                    GESTIÓN DE SOLICITUDES DE ADOPCIÓN
    
    Personal Centro              Sistema                    Adoptante
        │                        │                           │
        ├─ Acceder Panel ────────►│                           │
        │                        ├─ Verificar Permisos      │
        │                        │   ┌─[Sin Permisos]        │
        │                        │   │                       │
        │◄─ Denegar Acceso ──────┤◄─┘                       │
        │                        │                           │
        ├─ Ver Solicitudes ──────►│                           │
        │                        ├─ Filtrar por Centro      │
        │                        ├─ Mostrar Lista ─────────►│
        │◄─ Lista Solicitudes ───┤                           │
        │                        │                           │
        ├─ Seleccionar Solicitud ►│                           │
        │                        ├─ Mostrar Detalles ──────►│
        │◄─ Ver Detalles ────────┤                           │
        │                        │                           │
        ├─ Evaluar Solicitud     │                           │
        │   ┌─[Rechazar]          │                           │
        │   │                    │                           │
        │   ├─ Rechazar ─────────►│                           │
        │   │                    ├─ Actualizar Estado       │
        │   │                    ├─ Enviar Notificación ───►│
        │   │                    │                           │◄─ Recibir Rechazo ───────┤
        │   │                    │                           │                           │
        │   └─[Aprobar]           │                           │                           │
        │   │                    │                           │                           │
        │   ├─ Aprobar ──────────►│                           │                           │
        │   │                    ├─ Verificar Disponibilidad│                           │
        │   │                    │   ┌─[No Disponible]       │                           │
        │   │                    │   │                       │                           │
        │   │◄─ Error Estado ────┤◄─┘                       │                           │
        │   │                    │                           │                           │
        │   │                    ├─ Actualizar Estado       │                           │
        │   │                    ├─ Marcar Mascota Adoptada │                           │
        │   │                    ├─ Enviar Notificación ───►│                           │
        │   │                    │                           │◄─ Recibir Aprobación ───┤
        │   │                    │                           │                           │
        │   ├─ Programar Entrega ►│                           │                           │
        │   │                    ├─ Crear Cita             │                           │
        │   │                    ├─ Notificar Cita ────────►│                           │
        │   │                    │                           │◄─ Confirmar Cita ───────┤
        │   │                    │                           │                           │
        │   ├─ Realizar Entrega  │                           │                           │
        │   │                    │                           │                           │
        │   ├─ Confirmar Adopción►│                           │                           │
        │   │                    ├─ Finalizar Proceso      │                           │
        │   │                    ├─ Actualizar Registros   │                           │
        │   │                    ├─ Notificar Finalización ►│                           │
        │   │                    │                           │◄─ Adopción Completada ──┤
        │   │                    │                           │                           │
```

## 4. Diagrama de Actividad: Registro de Usuario

```
                    REGISTRO DE NUEVO USUARIO
    
    Usuario                    Sistema                    Base de Datos
        │                        │                           │
        ├─ Acceder Registro ─────►│                           │
        │                        ├─ Mostrar Formulario ─────►│
        │◄─ Ver Formulario ──────┤                           │
        │                        │                           │
        ├─ Completar Datos ──────►│                           │
        │  (Nombre, Email,        │                           │
        │   Password, Rol)        │                           │
        │                        ├─ Validar Formato         │
        │                        │   ┌─[Formato Inválido]    │
        │                        │   │                       │
        │◄─ Mostrar Errores ─────┤◄─┘                       │
        │                        │                           │
        │                        ├─ Verificar Email ────────►│
        │                        │                           ├─ Buscar Email
        │                        │◄─ Resultado Búsqueda ────┤
        │                        │   ┌─[Email Existe]        │
        │                        │   │                       │
        │◄─ Error Email Duplicado┤◄─┘                       │
        │                        │                           │
        │                        ├─ Encriptar Password      │
        │                        ├─ Crear Usuario ──────────►│
        │                        │                           ├─ Insertar Registro
        │                        │◄─ Confirmar Creación ────┤
        │                        │   ┌─[Error BD]            │
        │                        │   │                       │
        │◄─ Error Interno ───────┤◄─┘                       │
        │                        │                           │
        │                        ├─ Generar Respuesta       │
        │◄─ Confirmar Registro ──┤                           │
        │                        │                           │
        ├─ Ir a Login ───────────►│                           │
        │                        ├─ Redirigir Login ────────►│
        │◄─ Página Login ────────┤                           │
        │                        │                           │
```

## 5. Diagrama de Actividad: Autenticación de Usuario

```
                    PROCESO DE AUTENTICACIÓN
    
    Usuario                    Sistema                    Base de Datos
        │                        │                           │
        ├─ Ingresar Credenciales ►│                           │
        │                        ├─ Validar Formato         │
        │                        │   ┌─[Formato Inválido]    │
        │                        │   │                       │
        │◄─ Error Formato ───────┤◄─┘                       │
        │                        │                           │
        │                        ├─ Buscar Usuario ─────────►│
        │                        │                           ├─ Consultar por Email
        │                        │◄─ Datos Usuario ─────────┤
        │                        │   ┌─[Usuario No Existe]   │
        │                        │   │                       │
        │◄─ Error Credenciales ──┤◄─┘                       │
        │                        │                           │
        │                        ├─ Verificar Password      │
        │                        │   ┌─[Password Incorrecto] │
        │                        │   │                       │
        │◄─ Error Credenciales ──┤◄─┘                       │
        │                        │                           │
        │                        ├─ Generar Token JWT       │
        │                        ├─ Crear Sesión           │
        │                        ├─ Preparar Respuesta     │
        │◄─ Token + Datos Usuario┤                           │
        │                        │                           │
        ├─ Almacenar Token ──────►│                           │
        │                        ├─ Redirigir según Rol ───►│
        │◄─ Acceso Autorizado ───┤                           │
        │                        │                           │
```

## 6. Estados de una Solicitud de Adopción

```
            ESTADOS DE SOLICITUD DE ADOPCIÓN

    ┌─────────────┐    Crear Solicitud    ┌─────────────┐
    │   INICIO    ├─────────────────────► │  PENDIENTE  │
    └─────────────┘                       └──────┬──────┘
                                                 │
                                    ┌────────────┼────────────┐
                                    │                         │
                              Rechazar                   Aprobar
                                    │                         │
                                    ▼                         ▼
                            ┌─────────────┐           ┌─────────────┐
                            │  RECHAZADA  │           │  APROBADA   │
                            └─────────────┘           └──────┬──────┘
                                                             │
                                                    Programar Entrega
                                                             │
                                                             ▼
                                                    ┌─────────────┐
                                                    │ PROGRAMADA  │
                                                    └──────┬──────┘
                                                           │
                                                   Realizar Entrega
                                                           │
                                                           ▼
                                                    ┌─────────────┐
                                                    │ COMPLETADA  │
                                                    └─────────────┘
```

## 7. Estados de una Mascota

```
                ESTADOS DE MASCOTA EN EL SISTEMA

    ┌─────────────┐    Registrar    ┌─────────────┐
    │    NUEVA    ├────────────────►│ DISPONIBLE  │
    └─────────────┘                 └──────┬──────┘
                                           │
                                    ┌──────┼──────┐
                                    │             │
                            Recibir Solicitud   Marcar
                                    │        No Disponible
                                    ▼             │
                            ┌─────────────┐       │
                            │ EN PROCESO  │       │
                            └──────┬──────┘       │
                                   │             │
                            ┌──────┼──────┐       │
                            │             │       │
                        Rechazar      Aprobar     │
                            │             │       │
                            ▼             ▼       ▼
                    ┌─────────────┐ ┌─────────────────────┐
                    │ DISPONIBLE  │ │     ADOPTADA        │
                    └─────────────┘ └─────────────────────┘
                            ▲                     │
                            │                     │
                            └─────────────────────┘
                                Devolver (excepcional)
```
