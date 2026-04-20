# CC Group Argentina — Sistema de Operaciones Logísticas

Aplicación web de carga de operaciones logísticas para CC Group Argentina.

## Stack

- React 18 + Vite 5
- TailwindCSS 3
- Lucide React (iconos)

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Estructura del proyecto

```
src/
  components/
    Header.jsx          # Header con logo y navegación
    CCGroupLogo.jsx     # Logo SVG de CC Group
    OperationForm.jsx   # Formulario principal de operación
    AdicionalesTable.jsx # Tabla dinámica de servicios adicionales
    FormField.jsx       # Componentes reutilizables (Input, Select, etc.)
    Toast.jsx           # Notificaciones
  App.jsx               # Componente raíz con estado y validación
  main.jsx
  index.css             # Estilos globales + Tailwind
```

## Funcionalidades

- ✅ Formulario de operación logística completo
- ✅ Tabla dinámica de adicionales con cálculo automático
- ✅ Validaciones en tiempo real
- ✅ Branding CC Group Argentina
- ✅ Diseño responsive
- ✅ Notificaciones toast
- ✅ Animaciones suaves
