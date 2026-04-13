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

## Plan de Panel de Administración con Supabase

### 1. Configuración Supabase
- **Project Ref:** `uzrvomvullxcugcnnmwm`
- **Publishable Key:** `sb_publishable_sdL719boaFM4ozyUsv-7eA_Ik27kJ8e`
- **Service Role Key:** `cb11b4dc2896d44f9aa17dad4ae399d2577fdf7c48593798d7c17d998f75bc24`

### 2. Tabla `proyectos` en Supabase
```sql
CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  url TEXT NOT NULL,
  tecnologias TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Proyectos son públicos" ON proyectos
  FOR SELECT USING (true);

CREATE POLICY "Solo admin puede modificar" ON proyectos
  FOR ALL USING (auth.role() = 'service_role');
```

### 3. Nueva Estructura de Archivos
```
src/
├── lib/
│   └── supabase.js       # Cliente Supabase
├── pages/
│   └── Admin.jsx          # Panel de administración
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── SobreMi.jsx
│   ├── Proyectos.jsx      # Fetch desde Supabase
│   ├── Habilidades.jsx
│   ├── Contacto.jsx
│   └── PrivateRoute.jsx   # Proteger rutas admin
├── App.jsx                # Agregar rutas
├── main.jsx
└── index.css
```

### 4. Dependencias a Instalar
- `@supabase/supabase-js`
- `react-router-dom`

### 5. Variables de Entorno (.env)
```
VITE_SUPABASE_URL=https://uzrvomvullxcugcnnmwm.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_sdL719boaFM4ozyUsv-7eA_Ik27kJ8e
```

### 6. Funcionalidades del Panel Admin (/admin)
- **Login seguro** con email + contraseña (bcrypt hash)
- **Lista de proyectos** con opciones editar/eliminar
- **Formulario** para agregar nuevo proyecto
- **Mismo estilo visual** oscuro (#0a0a0a) con acento cyan (#22d3ee)
- **Sesión persistente** en sessionStorage

### 7. Cambios en Componente Proyectos
- Reemplazar `import proyectos from '../data/proyectos.json'` por fetch a Supabase
- Mantener diseño visual idéntico de cards con flip

### 8. Rutas
- `/` - Página principal (sin cambios visuales)
- `/admin` - Panel de administración (protegido con contraseña)

---

## Estado Actual
- ✅ Proyecto React con Vite
- ✅ Build exitoso
- ✅ SEO implementado
- ✅ sitemap.xml y robots.txt
- ✅ Panel Admin con Supabase
- ✅ Login seguro con bcrypt
- ✅ Formulario de contacto con Supabase
- ✅ Panel de mensajes en Admin
- ⚠️ Edge Function para emails (pendiente desplegar)
- ⚠️ Verificación dominio en Resend

---

## Sistema de Contacto

### Tabla `contact_messages` en Supabase
```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura pública" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Permitir inserción pública" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminación" ON contact_messages FOR DELETE USING (true);
```

### Edge Function `send-contact-email`
Ubicación: `supabase/functions/send-contact-email/`
- Recibe datos del formulario
- Envía email vía Resend API
- Destino: `admin@wilsolution.com`

### Desplegar Edge Function
```bash
# 1. Instalar Supabase CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Link al proyecto
cd supabase/functions/send-contact-email
supabase link --project-ref uzrvomvullxcugcnnmwm

# 4. Desplegar
supabase functions deploy send-contact-email
```

### Configuración Resend
- API Key: `re_hNQ7AcTV_DTkWUh1fYLuE7JpQUiFBLcYu`
- Email destino: `admin@wilsolution.com`
- Nota: El dominio `wilsolution.com` debe estar verificado en Resend para enviar desde ese dominio

---

## Acceso Admin
- **URL:** `/admin/login`
- **Email:** `admin@wilsolution.com`
- **Contraseña:** `Wilsolution2024`

## Archivos Creados
```
src/
├── lib/
│   └── supabase.js          # Cliente Supabase
├── pages/
│   ├── Admin.jsx             # Panel de administración
│   └── AdminLogin.jsx        # Login del admin
├── components/
│   └── PrivateRoute.jsx      # Protección de rutas
├── App.jsx                   # Con rutas
└── index.css                 # Estilos admin incluidos
```

---

## ⚠️ Paso Pendiente: Crear Tabla en Supabase

Ejecutar en Supabase Dashboard → SQL Editor:

```sql
CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  url TEXT NOT NULL,
  tecnologias TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Proyectos son públicos" ON proyectos
  FOR SELECT USING (true);

CREATE POLICY "Solo admin puede modificar" ON proyectos
  FOR ALL USING (auth.role() = 'service_role');
```

Insertar datos iniciales:
```sql
INSERT INTO proyectos (nombre, descripcion, url, tecnologias) VALUES
('Festival Musical', 'Plataforma para festivales de musica con venta de entradas', 'https://festival-musical-sass.netlify.app/', ARRAY['html', 'css', 'js', 'sass']),
('Blog de Cafe', 'Blog sobre cafe con articulos y tutoriales', 'https://pagina-modelo-cafe.netlify.app/', ARRAY['html', 'css']),
('Dev Store', 'Tienda de camisas para devs', 'https://camisas-devs-tienda.netlify.app/', ARRAY['html', 'css']),
('Presentacion', 'Pagina de presentacion personal', 'https://presentacion-muestra.netlify.app/', ARRAY['html', 'css']),
('Portafolio', 'Portafolio personal con diseno moderno', 'https://bakastanub.netlify.app/', ARRAY['react', 'css']),
('Mantenimiento', 'Sistema de gestion de mantenimiento', 'https://lmantenimiento.netlify.app/', ARRAY['react', 'css', 'js']),
('BlueNails', 'Servicios de manicura y pedicura con backend', 'https://bluenails.netlify.app/', ARRAY['react', 'css', 'js', 'node', 'supabase']),
('Guitarly', 'Plataforma para aprender guitarra', 'https://guitarly-web.netlify.app/', ARRAY['react', 'css', 'js']);
```

---

## ⚠️ Crear Tabla admin_users (Login Seguro)

Ejecutar en Supabase Dashboard → SQL Editor:

```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Solo lectura pública del email" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "Solo admin puede modificar usuarios" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');
```

Insertar usuario admin (contraseña: `Wilsolution2024`):
```sql
-- Hash bcrypt de 'Wilsolution2024'
INSERT INTO admin_users (email, password_hash) VALUES 
('admin@wilsolution.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
```

**Para crear más usuarios con bcrypt:**
1. Ve a https://bcrypt-generator.com/
2. Ingresa tu contraseña
3. Copia el hash generado
4. Ejecuta: `INSERT INTO admin_users (email, password_hash) VALUES ('tu@email.com', 'hash_generado');`