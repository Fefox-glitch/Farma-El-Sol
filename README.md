Farma-El-Sol

## Desarrollo local

- Abre el proyecto desde la carpeta correcta: `Farma-El-Sol-main` (la que contiene `package.json`, `src/`, `tailwind.config.js`).
- Instala dependencias: `npm install`.
- Arranca el servidor de desarrollo: `npm run dev` y navega a `http://localhost:5173/`.
- Extensiones recomendadas (editor):
  - Tailwind CSS IntelliSense.
  - ESLint.
- Configuración del editor incluida:
  - `.vscode/settings.json` desactiva `css.validate` para evitar falsos positivos con `@tailwind` y habilita sugerencias de Tailwind.
- Tips de diagnóstico:
  - Si ves “Cannot find module” en imports de `src/views`, asegúrate de que el editor abrió la carpeta raíz correcta y ejecuta “TypeScript: Restart TS server”.
  - Si ves “Unknown at rule @tailwind” en `src/index.css`, esto es del validador CSS del editor; el build compila correctamente con PostCSS/Tailwind.

## Ramas y PR

- Crea el Pull Request desde: `https://github.com/Fefox-glitch/Farma-El-Sol/compare/main`.
