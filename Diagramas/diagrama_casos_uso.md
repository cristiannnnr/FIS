# Diagrama de Casos de Uso - Sistema de Adopciones y Alertas de Mascotas

```
                    SISTEMA DE ADOPCIONES Y ALERTAS DE MASCOTAS
    
    ┌─────────────────┐                                                    ┌─────────────────┐
    │                 │                                                    │                 │
    │   Usuario       │                                                    │   Personal      │
    │   Anónimo       │                                                    │   del Centro    │
    │                 │                                                    │                 │
    └─────────┬───────┘                                                    └─────────┬───────┘
              │                                                                      │
              │ ┌─────────────────────────────────────────────────────────────────┐ │
              └─┤                                                                 ├─┘
                │  ┌─ CU-004: Consultar Mascotas Disponibles                     │
                │  │                                                             │
                │  ├─ CU-005: Ver Detalle de Mascota                            │
                │  │                                                             │
                │  ├─ CU-014: Consultar Alertas                                 │
                │  │                                                             │
                │  └─ CU-016: Consultar Centros de Atención                     │
                │                                                                │
                └────────────────────────────────────────────────────────────────┘
                          
    ┌─────────────────┐                                                    ┌─────────────────┐
    │                 │                                                    │                 │
    │   Adoptante     │                                                    │   Dueño de      │
    │                 │                                                    │   Mascota       │
    │                 │                                                    │                 │
    └─────────┬───────┘                                                    └─────────┬───────┘
              │                                                                      │
              │ ┌─────────────────────────────────────────────────────────────────┐ │
              └─┤                                                                 ├─┘
                │  ┌─ CU-009: Solicitar Adopción                                  │
                │  │                                                             │
                │  ├─ CU-011: Consultar Estado de Solicitud                      │
                │  │                                                             │
                │  ├─ CU-012: Reportar Mascota Perdida                           │
                │  │                                                             │
                │  ├─ CU-013: Reportar Mascota Encontrada                        │
                │  │                                                             │
                │  ├─ CU-018: Consultar Ficha Médica (propia)                   │
                │  │                                                             │
                │  ├─ CU-020: Enviar Mensaje                                     │
                │  │                                                             │
                │  └─ CU-021: Consultar Mensajes                                │
                │                                                                │
                └────────────────────────────────────────────────────────────────┘

              ┌─────────────────────────────────────────────────────────────────┐
              │                                                                 │
              │  ┌─ CU-006: Registrar Nueva Mascota                            │
              │  │                                                             │
              │  ├─ CU-007: Modificar Información de Mascota                   │
              │  │                                                             │
              │  ├─ CU-008: Eliminar Mascota                                   │
              │  │                                                             │
              │  ├─ CU-010: Gestionar Solicitudes de Adopción                  │
              │  │                                                             │
              │  ├─ CU-015: Gestionar Alertas                                  │
              │  │                                                             │
              │  ├─ CU-018: Consultar Ficha Médica                             │
              │  │                                                             │
              │  └─ CU-019: Actualizar Ficha Médica                            │
              │                                                                │
              └────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐
    │                 │
    │   Administrador │
    │                 │
    │                 │
    └─────────┬───────┘
              │
              │ ┌─────────────────────────────────────────────────────────────────┐
              └─┤                                                                 │
                │  ┌─ CU-017: Gestionar Centros de Atención                      │
                │  │                                                             │
                │  └─ Todos los casos de uso del Personal del Centro             │
                │                                                                │
                └────────────────────────────────────────────────────────────────┘

            ┌─────────────────────────────────────────────────────────────────────┐
            │                        CASOS DE USO BASE                           │
            │                                                                     │
            │  ┌─ CU-001: Registrar Usuario                                       │
            │  │                                                                 │
            │  ├─ CU-002: Iniciar Sesión                                         │
            │  │                                                                 │
            │  └─ CU-003: Cerrar Sesión                                          │
            │                                                                     │
            └─────────────────────────────────────────────────────────────────────┘

```

## Relaciones Especiales entre Casos de Uso

### << include >> (Inclusión)
```
CU-006: Registrar Nueva Mascota ────include────> CU-002: Iniciar Sesión
CU-007: Modificar Información ──────include────> CU-002: Iniciar Sesión  
CU-009: Solicitar Adopción ─────────include────> CU-002: Iniciar Sesión
CU-009: Solicitar Adopción ─────────include────> CU-005: Ver Detalle Mascota
CU-010: Gestionar Solicitudes ──────include────> CU-011: Consultar Estado
```

### << extend >> (Extensión)
```
CU-006: Registrar Nueva Mascota ────extend─────> CU-019: Crear Ficha Médica
CU-009: Solicitar Adopción ─────────extend─────> CU-020: Enviar Mensaje
CU-012: Reportar Perdida ───────────extend─────> CU-020: Notificación Automática
CU-013: Reportar Encontrada ────────extend─────> CU-020: Notificación Automática
```

### Herencia/Generalización
```
                    ┌─ Gestionar Alerta ─┐
                    │                    │
                    ▼                    ▼
        CU-012: Reportar Perdida    CU-013: Reportar Encontrada
        

                    ┌─ Gestionar Mascota ─┐
                    │                     │
                    ▼                     ▼
        CU-006: Registrar          CU-007: Modificar
                    │                     │
                    ▼                     ▼
               CU-008: Eliminar     CU-019: Actualizar Ficha
```

## Actores y Sus Jerarquías

```
                         Usuario
                           │
                ┌──────────┼──────────┐
                │          │          │
         Usuario Anónimo   │    Usuario Registrado
                           │          │
                    Administrador     │
                                      │
                        ┌─────────────┼─────────────┐
                        │             │             │
                   Adoptante    Personal Centro   Dueño Mascota
```

## Restricciones de Acceso por Actor

**Usuario Anónimo:**
- Solo lectura de información pública
- Registro en el sistema

**Usuario Registrado:**
- Todas las funciones de Usuario Anónimo
- Gestión de alertas
- Mensajería
- Funciones específicas según su rol

**Adoptante:**
- Solicitar adopciones
- Ver sus solicitudes
- Consultar fichas médicas de mascotas adoptadas

**Personal del Centro:**
- Gestión completa de mascotas de su centro
- Gestión de solicitudes de adopción
- Gestión de fichas médicas

**Dueño de Mascota:**
- Reportar mascotas perdidas
- Gestionar sus alertas

**Administrador:**
- Acceso completo al sistema
- Gestión de centros de atención
- Gestión de usuarios
- Supervisión general
