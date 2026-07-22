# Portfolio · Wilman Hernández

Portfolio profesional construido con Next.js 16, React 19, Bulma y `react-ui-vegetas-wife`.

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Acceso editorial con Google

El panel usa Google OAuth mediante Auth.js. Crea un cliente OAuth de tipo **Aplicación web** en Google Cloud y configura:

```env
ADMIN_EMAIL=correo-de-google-autorizado@gmail.com
AUTH_GOOGLE_ID=client-id-de-google
AUTH_GOOGLE_SECRET=client-secret-de-google
AUTH_SECRET=secreto-largo-y-aleatorio
```

Agrega estos URI de redirección autorizados en Google Cloud:

- Desarrollo: `http://localhost:3000/api/auth/callback/google`
- Producción: `https://tu-dominio.com/api/auth/callback/google`

Solo la cuenta cuyo correo coincide con `ADMIN_EMAIL` puede completar el acceso al editor. Define siempre un `AUTH_SECRET` seguro antes de desplegar.

## Blog

La capa de dominio depende de la interfaz `BlogRepository` en `lib/blog/types.ts`. En desarrollo se usa SQLite (`SqliteBlogRepository`) y, cuando existe `DATABASE_URL`, se usa Neon Postgres (`NeonBlogRepository`). Esto mantiene intercambiable la infraestructura de persistencia.

La base local se crea en `data/blog.db` y no se versiona. Puede cambiarse con `BLOG_DATABASE_PATH`.

## Producción con Neon

Vercel no permite una base SQLite persistente en el sistema de archivos. Crea un proyecto en [Neon](https://neon.tech), copia la cadena de conexión desde **Connect** y registra `DATABASE_URL` en las variables de entorno de Vercel. El formato es:

```env
DATABASE_URL=postgresql://usuario:contrasena@host.neon.tech/neondb?sslmode=require
```

En el siguiente despliegue las tablas `posts`, `social_connections` y `social_publications` se crean automáticamente. No definas `BLOG_DATABASE_PATH` en Vercel.

Para subir imágenes en Vercel, crea un Blob Store y registra también su variable `BLOB_READ_WRITE_TOKEN` en el proyecto. En desarrollo, si esa variable no existe, las imágenes se guardan en `public/uploads`.

El editor editorial usa Tiptap y guarda HTML sanitizado. Permite formato, listas, citas, código, enlaces, imágenes por URL y subida de imágenes PNG, JPG, WebP o GIF de hasta 5 MB. En producción las imágenes se guardan en Vercel Blob.

## Publicación nativa en LinkedIn

Desde `Blog → Área privada → Configurar LinkedIn` puedes vincular el perfil que publicará las entradas. Registra una aplicación de LinkedIn con el producto **Share on LinkedIn**, solicita el permiso `w_member_social` y configura este callback:

```text
http://localhost:3000/api/social/linkedin/callback
```

En producción sustituye `localhost:3000` por el dominio público HTTPS. Añade `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` y `SOCIAL_TOKEN_ENCRYPTION_KEY` a `.env.local`. La conexión y cada resultado de publicación se guardan en la base configurada; el token se cifra con AES-256-GCM antes de persistirse.

## Comandos

```bash
npm run lint
npm run build
npm run start
```
