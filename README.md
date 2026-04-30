# Efecto Estrategia - Plataforma Digital

Plataforma digital multisite de Efecto Estrategia Comunicaciones. Construida con React, Vite, Tailwind CSS y shadcn/ui.

## Tecnologías

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **shadcn/ui** (componentes UI)
- **React Router** (navegación)
- **Vitest** (testing)

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar build |
| `npm run test` | Ejecutar tests |
| `npm run lint` | Ejecutar ESLint |

## Estructura del proyecto

```
src/
  components/     # Componentes reutilizables (UI + negocio)
  hooks/          # Custom hooks
  lib/            # Utilidades (cn, etc.)
  pages/          # Páginas/rutas
  test/           # Tests
```

## Despliegue

El proyecto se despliega automáticamente en GitHub Pages mediante GitHub Actions al hacer push a la rama `main`.
