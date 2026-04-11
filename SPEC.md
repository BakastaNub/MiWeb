# Portafolio Personal - Wilsolution

## Descripción
Rediseño completo del portafolio personal con diseño limpio, oscuro y tecnológico.

## Requisitos

### 1. Contenido
- **Sobre Mí**: Biografía, ubicación, enfoque, disponibilidad
- **Proyectos**: Links a otras páginas alojadas en Netlify
- **Habilidades/Tecnologías**: Por categoría (Frontend, Backend, Herramientas)
- **Contacto**: Email, GitHub, LinkedIn + formulario

### 2. Estilo Visual
- Fondo oscuro (#0a0a0a)
- Acento: cyan/neon (#22d3ee)
- Limpio, moderno, tech
- Logo por agregar después

### 3. Proyectos - Lógica Automática
- Archivo: `src/data/proyectos.json`
- Agregar proyectos solo con: nombre, descripción, tecnologías, URL
- La imagen (favicon) se extrae automáticamente de la URL
- Desktop: Hover gira la card 180° -> muestra tecnologías + botón
- Mobile: Click/tap gira la card -> misma lógica

### 4. Habilidades - Lógica Automática
- Archivo: `src/data/habilidades.json`
- Por categoría: Frontend, Backend, Herramientas

### 5. Estructura de Archivos
```
src/
├── data/
│   ├── proyectos.json
│   └── habilidades.json
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── SobreMi.jsx
│   ├── Proyectos.jsx
│   ├── Habilidades.jsx
│   └── Contacto.jsx
├── App.jsx
└── index.css
```

## Plan de Transformación

### 1. Inicializar Proyecto React
- Crear proyecto con Vite en /miweb
- Instalar dependencias necesarias

### 2. Estructura de Archivos
```
src/
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── SobreMi.jsx
│   ├── Proyectos.jsx
│   ├── Habilidades.jsx
│   └── Contacto.jsx
├── data/
│   ├── proyectos.json
│   └── habilidades.json
├── App.jsx
└── index.css
```

### 3. Componentes a Crear
- **Nav.jsx**: Navegación fluida
- **Hero.jsx**: Video defondo + título
- **SobreMi.jsx**: Imagen + biografía
- **Proyectos.jsx**: Cards con lógica de girar (hover desktop / click mobile)
- **Habilidades.jsx**: Por categoría desde JSON
- **Contacto.jsx**: Formulario + redes sociales

### 4. Estilo Visual
- Fondo: #0a0a0a
- Acento: #22d3ee (cyan/neon)
- Font: Poppins
- Diseño limpiar, moderno, tech

### 5. Datos a Migrar
- **proyectos.json**: Migrar desde script.js actual
- **habilidades.json**: Crear por categoría (Frontend, Backend, Herramientas)

### 6. Proyectos - Lógica de Cards
- Desktop: Hover gira 180° → muestra tecnologías + botón
- Mobile: Click/tap gira → misma lógica

---

## Estado Actual
- ⏳ Por convertir a React
- ⏳ Build pendiente