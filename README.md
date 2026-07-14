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

La capa de dominio depende de la interfaz `BlogRepository` en `lib/blog/types.ts`. SQLite es solo el adaptador actual (`SqliteBlogRepository`), de modo que puede sustituirse por PostgreSQL, una API o un CMS implementando la misma interfaz y cambiando la factoría de `lib/blog/repository.ts`.

La base local se crea en `data/blog.db` y no se versiona. Puede cambiarse con `BLOG_DATABASE_PATH`.

El editor editorial usa Tiptap y guarda HTML sanitizado. Permite formato, listas, citas, código, enlaces, imágenes por URL y subida local de imágenes PNG, JPG, WebP o GIF de hasta 5 MB. Las imágenes subidas se guardan en `public/uploads`.

## Publicación nativa en LinkedIn

Desde `Blog → Área privada → Configurar LinkedIn` puedes vincular el perfil que publicará las entradas. Registra una aplicación de LinkedIn con el producto **Share on LinkedIn**, solicita el permiso `w_member_social` y configura este callback:

```text
http://localhost:3000/api/social/linkedin/callback
```

En producción sustituye `localhost:3000` por el dominio público HTTPS. Añade `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` y `SOCIAL_TOKEN_ENCRYPTION_KEY` a `.env.local`. La conexión y cada resultado de publicación se guardan en SQLite; el token se cifra con AES-256-GCM antes de persistirse.

## Comandos

```bash
npm run lint
npm run build
npm run start
```
