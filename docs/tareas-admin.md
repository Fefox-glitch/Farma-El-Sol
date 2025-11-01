# Tareas de administración del sitio

Estas son las tareas recomendadas para mantener y operar el sitio de Farmacias El Sol LTDA.

## Identidad y contenidos
- Reemplazar la foto del Hero por imágenes reales del local.
- Actualizar textos de servicios y promociones según campañas vigentes.
- Verificar que los datos de contacto (teléfonos y correo) estén correctos.

## Formularios
- Conectar el formulario de contacto a un backend o servicio de email (por ejemplo, Formspree, Resend, Supabase Functions).
- Conectar el formulario "Enviar receta" para almacenar archivos de forma segura (por ejemplo, Supabase Storage) y notificar al equipo.

## SEO y presencia local
- Mantener actualizado Google Business Profile (direcciones, horarios, fotos).
- Confirmar que `index.html` tenga título y metadatos correctos (ya actualizados).
- Verificar enlaces a reseñas de Google y redes sociales.

## Catálogo y promociones
- Mantener productos, precios y stock en el backend.
- Usar "Descuento" para destacar ofertas; el sitio usa `brand-danger` para visibilidad.
- Revisar banners promocionales (componentes en `src/views`).

## Redes sociales y enlaces
- Completar enlaces reales de Facebook, Instagram, Twitter y YouTube en el Footer.
- Añadir políticas y términos (enlaces o páginas internas) si corresponde.

## Mantenimiento
- Ejecutar `npm run dev` para revisar cambios visualmente.
- Probar el sitio en móvil y desktop (responsive).
- Mantener consistencia de colores y tipografías según `tailwind.config.js`.