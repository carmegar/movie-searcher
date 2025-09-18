# 🚀 Deployment Guide - Movie Search App

## Pasos para subir a Vercel

### 1. Preparación Local
- ✅ El proyecto ya está configurado para Vercel
- ✅ Build funciona correctamente (`npm run build`)
- ✅ Variables de entorno configuradas

### 2. Subir a Vercel

#### Opción A: Vercel CLI (Recomendado)
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# En la carpeta del proyecto
cd 01-movie-search

# Deployar
vercel

# Seguir las instrucciones:
# - Seleccionar cuenta/team
# - Confirmar configuración del proyecto
```

#### Opción B: Vercel Dashboard
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio GitHub
3. Selecciona la carpeta `01-movie-search`
4. Vercel detectará automáticamente que es un proyecto Vite

### 3. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a:
**Project Settings → Environment Variables**

Agregar estas variables:

| Variable | Valor |
|----------|-------|
| `VITE_TMDB_API_KEY` | `f77f3d0ee83312becd417704d4a86960` |
| `VITE_TMDB_BASE_URL` | `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p` |
| `VITE_APP_NAME` | `Movie Search App` |
| `VITE_APP_VERSION` | `1.0.0` |

### 4. Configuración Automática
- ✅ `vercel.json` configurado
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ SPA routing configurado

### 5. Verificación
Después del deployment:
1. Verifica que la app carga correctamente
2. Prueba la búsqueda de películas
3. Verifica que las imágenes se cargan

## Notas Importantes
- El archivo `.env` NO se sube a Git (está en .gitignore)
- Las variables se configuran directamente en Vercel
- El build es estático, no requiere servidor Node.js