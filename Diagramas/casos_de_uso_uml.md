# Casos de Uso UML - Sistema de Adopciones y Alertas de Mascotas

## Actores del Sistema

### Actores Principales:
1. **Adoptante** - Usuario que busca adoptar mascotas
2. **Personal del Centro** - Empleados que gestionan mascotas y adopciones
3. **Administrador** - Usuario con permisos completos del sistema
4. **Dueño de Mascota** - Usuario que reporta mascotas perdidas/encontradas
5. **Usuario Anónimo** - Visitante sin cuenta en el sistema

### Actores Secundarios:
6. **Sistema de Autenticación** - Gestiona login y autorización
7. **Base de Datos** - Almacena información del sistema

---

## Casos de Uso por Módulo

### 1. GESTIÓN DE USUARIOS

#### CU-001: Registrar Usuario
- **Actor Principal:** Usuario Anónimo
- **Descripción:** Un usuario se registra en el sistema seleccionando su rol
- **Precondiciones:** El email no debe estar registrado
- **Flujo Principal:**
  1. El usuario accede al formulario de registro
  2. Ingresa nombre, email, contraseña y selecciona rol
  3. El sistema valida la información
  4. Se crea la cuenta y se redirige al login
- **Postcondiciones:** Usuario registrado en el sistema

#### CU-002: Iniciar Sesión
- **Actor Principal:** Usuario Registrado
- **Descripción:** Usuario autentica sus credenciales
- **Precondiciones:** Usuario debe estar registrado
- **Flujo Principal:**
  1. Usuario ingresa email y contraseña
  2. Sistema valida credenciales
  3. Se genera token JWT
  4. Usuario accede al sistema según su rol
- **Postcondiciones:** Usuario autenticado con sesión activa

#### CU-003: Cerrar Sesión
- **Actor Principal:** Usuario Autenticado
- **Descripción:** Usuario termina su sesión
- **Flujo Principal:**
  1. Usuario selecciona cerrar sesión
  2. Sistema invalida el token
  3. Se redirige a la página principal
- **Postcondiciones:** Sesión terminada

---

### 2. GESTIÓN DE MASCOTAS

#### CU-004: Consultar Mascotas Disponibles
- **Actor Principal:** Usuario Anónimo, Adoptante
- **Descripción:** Ver el catálogo de mascotas disponibles para adopción
- **Flujo Principal:**
  1. Usuario accede a la sección de mascotas
  2. Sistema muestra lista de mascotas disponibles
  3. Usuario puede ver detalles de cada mascota
- **Postcondiciones:** Lista de mascotas mostrada

#### CU-005: Ver Detalle de Mascota
- **Actor Principal:** Usuario Anónimo, Adoptante
- **Descripción:** Ver información completa de una mascota específica
- **Flujo Principal:**
  1. Usuario selecciona una mascota
  2. Sistema muestra información detallada
  3. Se muestran opciones según el tipo de usuario
- **Postcondiciones:** Información detallada mostrada

#### CU-006: Registrar Nueva Mascota
- **Actor Principal:** Personal del Centro, Administrador
- **Descripción:** Agregar una nueva mascota al sistema
- **Precondiciones:** Usuario autenticado con permisos
- **Flujo Principal:**
  1. Personal accede al formulario de registro
  2. Completa información de la mascota
  3. Opcionalmente sube foto
  4. Sistema valida y guarda la información
- **Postcondiciones:** Nueva mascota registrada

#### CU-007: Modificar Información de Mascota
- **Actor Principal:** Personal del Centro, Administrador
- **Descripción:** Actualizar datos de una mascota existente
- **Precondiciones:** Mascota debe existir, usuario con permisos
- **Flujo Principal:**
  1. Personal busca y selecciona mascota
  2. Modifica la información necesaria
  3. Sistema valida y actualiza los datos
- **Postcondiciones:** Información de mascota actualizada

#### CU-008: Eliminar Mascota
- **Actor Principal:** Personal del Centro, Administrador
- **Descripción:** Remover una mascota del sistema
- **Precondiciones:** Mascota debe existir, usuario con permisos
- **Flujo Principal:**
  1. Personal selecciona mascota a eliminar
  2. Sistema solicita confirmación
  3. Se elimina la mascota del sistema
- **Postcondiciones:** Mascota eliminada del sistema

---

### 3. GESTIÓN DE ADOPCIONES

#### CU-009: Solicitar Adopción
- **Actor Principal:** Adoptante
- **Descripción:** Un adoptante solicita adoptar una mascota específica
- **Precondiciones:** Usuario autenticado como adoptante, mascota disponible
- **Flujo Principal:**
  1. Adoptante selecciona mascota de interés
  2. Completa formulario de solicitud
  3. Sistema registra la solicitud
  4. Se notifica al centro correspondiente
- **Postcondiciones:** Solicitud de adopción creada

#### CU-010: Gestionar Solicitudes de Adopción
- **Actor Principal:** Personal del Centro, Administrador
- **Descripción:** Revisar y procesar solicitudes de adopción
- **Precondiciones:** Existen solicitudes pendientes
- **Flujo Principal:**
  1. Personal accede a lista de solicitudes
  2. Revisa detalles de cada solicitud
  3. Aprueba o rechaza la solicitud
  4. Sistema actualiza el estado
- **Postcondiciones:** Estado de solicitud actualizado

#### CU-011: Consultar Estado de Solicitud
- **Actor Principal:** Adoptante
- **Descripción:** Verificar el estado de sus solicitudes de adopción
- **Precondiciones:** Usuario tiene solicitudes creadas
- **Flujo Principal:**
  1. Adoptante accede a sus solicitudes
  2. Sistema muestra lista con estados
  3. Puede ver detalles de cada solicitud
- **Postcondiciones:** Estados de solicitudes mostrados

---

### 4. GESTIÓN DE ALERTAS (MASCOTAS PERDIDAS/ENCONTRADAS)

#### CU-012: Reportar Mascota Perdida
- **Actor Principal:** Dueño de Mascota
- **Descripción:** Reportar que una mascota se ha perdido
- **Precondiciones:** Usuario autenticado
- **Flujo Principal:**
  1. Dueño accede al formulario de alerta
  2. Selecciona tipo "perdido"
  3. Completa detalles de la mascota y ubicación
  4. Opcionalmente sube foto
  5. Sistema registra la alerta
- **Postcondiciones:** Alerta de mascota perdida creada

#### CU-013: Reportar Mascota Encontrada
- **Actor Principal:** Usuario Registrado
- **Descripción:** Reportar que se encontró una mascota
- **Precondiciones:** Usuario autenticado
- **Flujo Principal:**
  1. Usuario accede al formulario de alerta
  2. Selecciona tipo "encontrado"
  3. Describe la mascota y ubicación donde se encontró
  4. Opcionalmente sube foto
  5. Sistema registra la alerta
- **Postcondiciones:** Alerta de mascota encontrada creada

#### CU-014: Consultar Alertas
- **Actor Principal:** Usuario Anónimo, Usuario Registrado
- **Descripción:** Ver alertas de mascotas perdidas y encontradas
- **Flujo Principal:**
  1. Usuario accede a la sección de alertas
  2. Sistema muestra lista de alertas activas
  3. Usuario puede filtrar por tipo (perdido/encontrado)
  4. Puede ver detalles de cada alerta
- **Postcondiciones:** Lista de alertas mostrada

#### CU-015: Gestionar Alertas
- **Actor Principal:** Administrador, Personal del Centro
- **Descripción:** Administrar alertas del sistema
- **Precondiciones:** Usuario con permisos administrativos
- **Flujo Principal:**
  1. Personal accede a gestión de alertas
  2. Puede modificar o eliminar alertas
  3. Puede marcar alertas como resueltas
- **Postcondiciones:** Alertas gestionadas

---

### 5. GESTIÓN DE CENTROS DE ATENCIÓN

#### CU-016: Consultar Centros de Atención
- **Actor Principal:** Usuario Anónimo, Usuario Registrado
- **Descripción:** Ver información de centros de atención disponibles
- **Flujo Principal:**
  1. Usuario accede a la sección de centros
  2. Sistema muestra lista de centros
  3. Usuario puede ver detalles de cada centro
- **Postcondiciones:** Información de centros mostrada

#### CU-017: Gestionar Centros de Atención
- **Actor Principal:** Administrador
- **Descripción:** Crear, modificar o eliminar centros de atención
- **Precondiciones:** Usuario con permisos de administrador
- **Flujo Principal:**
  1. Administrador accede a gestión de centros
  2. Puede crear nuevos centros
  3. Puede modificar información existente
  4. Puede eliminar centros
- **Postcondiciones:** Centros gestionados según la operación

---

### 6. GESTIÓN DE FICHAS MÉDICAS

#### CU-018: Consultar Ficha Médica
- **Actor Principal:** Personal del Centro, Administrador, Adoptante (propia)
- **Descripción:** Ver información médica de una mascota
- **Precondiciones:** Usuario con permisos apropiados
- **Flujo Principal:**
  1. Usuario autorizado accede a la ficha médica
  2. Sistema muestra historial médico
  3. Se muestran vacunas, tratamientos, etc.
- **Postcondiciones:** Ficha médica mostrada

#### CU-019: Actualizar Ficha Médica
- **Actor Principal:** Personal del Centro, Administrador
- **Descripción:** Agregar o modificar información médica
- **Precondiciones:** Usuario con permisos, mascota registrada
- **Flujo Principal:**
  1. Personal accede a la ficha médica
  2. Agrega nueva información médica
  3. Sistema valida y guarda los cambios
- **Postcondiciones:** Ficha médica actualizada

---

### 7. COMUNICACIÓN Y MENSAJERÍA

#### CU-020: Enviar Mensaje
- **Actor Principal:** Usuario Registrado
- **Descripción:** Enviar mensajes entre usuarios del sistema
- **Precondiciones:** Usuarios autenticados
- **Flujo Principal:**
  1. Usuario accede a sistema de mensajería
  2. Selecciona destinatario
  3. Escribe y envía mensaje
  4. Sistema notifica al destinatario
- **Postcondiciones:** Mensaje enviado

#### CU-021: Consultar Mensajes
- **Actor Principal:** Usuario Registrado
- **Descripción:** Ver mensajes recibidos y enviados
- **Precondiciones:** Usuario autenticado
- **Flujo Principal:**
  1. Usuario accede a bandeja de mensajes
  2. Sistema muestra mensajes organizados
  3. Usuario puede leer y responder mensajes
- **Postcondiciones:** Mensajes mostrados

---

## Relaciones entre Casos de Uso

### Includes (Inclusión):
- Todos los CU que requieren autenticación **incluyen** CU-002 (Iniciar Sesión)
- CU-009 (Solicitar Adopción) **incluye** CU-005 (Ver Detalle de Mascota)
- CU-010 (Gestionar Solicitudes) **incluye** CU-011 (Consultar Estado de Solicitud)

### Extends (Extensión):
- CU-006 (Registrar Nueva Mascota) **extiende** CU-018 (Crear Ficha Médica)
- CU-009 (Solicitar Adopción) **extiende** CU-020 (Enviar Mensaje al Centro)
- CU-012, CU-013 (Reportar Alertas) **extienden** CU-020 (Enviar Notificaciones)

### Generalización:
- CU-012 y CU-013 **generalizan** de "Gestionar Alerta"
- CU-006, CU-007, CU-008 **generalizan** de "Gestionar Mascota"

---

## Restricciones y Reglas de Negocio

1. **RN-001:** Solo usuarios autenticados pueden crear solicitudes de adopción
2. **RN-002:** Una mascota solo puede tener una solicitud aprobada a la vez
3. **RN-003:** Solo personal del centro puede modificar información de mascotas
4. **RN-004:** Las alertas tienen una vigencia de 30 días por defecto
5. **RN-005:** Los adoptantes solo pueden ver fichas médicas de sus mascotas adoptadas
6. **RN-006:** Cada centro gestiona sus propias mascotas y solicitudes

---

## Diagramas Sugeridos

Para complementar estos casos de uso, se recomienda crear:

1. **Diagrama de Casos de Uso General** - Mostrando todos los actores y casos de uso principales
2. **Diagramas de Casos de Uso por Módulo** - Uno para cada subsistema
3. **Diagramas de Actividad** - Para flujos complejos como el proceso de adopción
4. **Diagramas de Secuencia** - Para interacciones críticas como autenticación
5. **Diagrama de Estados** - Para el estado de las solicitudes de adopción

---

*Documento generado mediante ingeniería inversa del sistema FIS - Sistema de Adopciones y Alertas de Mascotas*
