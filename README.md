# 🎬 Movie Search App

Una aplicación moderna de búsqueda de películas construida con React, Vite y TailwindCSS, conectada a la API de The Movie Database (TMDB).

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca principal
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework CSS
- **React Router** - Navegación
- **Axios** - Cliente HTTP

### Testing & Quality
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **ESLint** - Linting
- **Prettier** - Formateo de código

### Deploy & CI/CD
- **Vercel** - Hosting y deploy automático
- **GitHub Actions** - CI/CD pipeline

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18.x o superior
- npm o yarn

### Instalación

1. Clona el repositorio
```bash
git clone <repository-url>
cd 01-movie-search
```

2. Instala dependencias
```bash
npm install
```

3. Configura las variables de entorno
```bash
cp .env.example .env
```
Edita `.env` y agrega tu API key de TMDB.

4. Ejecuta en desarrollo
```bash
npm run dev
```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint
- `npm run lint:fix` - Corregir problemas de ESLint automáticamente
- `npm run format` - Formatear código con Prettier
- `npm run format:check` - Verificar formato de código
- `npm run test` - Ejecutar tests
- `npm run test:watch` - Ejecutar tests en modo watch
- `npm run test:coverage` - Ejecutar tests con coverage

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── common/         # Componentes reutilizables
│   ├── layout/         # Componentes de layout
│   └── movies/         # Componentes específicos de películas
├── hooks/              # Custom hooks
├── pages/              # Páginas/rutas
├── services/           # APIs y servicios externos
├── utils/              # Utilidades y helpers
└── __tests__/          # Tests
```

## 🔧 Configuración de API

Para usar la API de TMDB, necesitas:

1. Crear una cuenta en [The Movie Database](https://www.themoviedb.org/)
2. Generar una API key en [API Settings](https://www.themoviedb.org/settings/api)
3. Agregar la API key en tu archivo `.env`:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push a main

### Manual

```bash
npm run build
# Subir la carpeta dist/ a tu hosting preferido
```

## 🤝 Contribuir

1. Fork del proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Reconocimientos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) por proporcionar la API
- [React](https://reactjs.org/) por la librería base
- [Vite](https://vitejs.dev/) por la herramienta de build
- [TailwindCSS](https://tailwindcss.com/) por el framework CSS