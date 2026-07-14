import { Mail } from "react-feather";
import { Button, Container, Notification } from "react-ui-vegetas-wife";

import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";

import { loginWithGoogle } from "../actions";

const errorMessages: Record<string, string> = {
  AccessDenied: "Esta cuenta de Google no está autorizada para administrar el blog.",
  Configuration: "Google OAuth aún no está configurado correctamente.",
  OAuthSignin: "No fue posible iniciar el proceso con Google. Inténtalo nuevamente.",
  OAuthCallback: "Google no pudo completar la autenticación. Inténtalo nuevamente.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAuthenticated()) redirect("/blog/admin");
  const { error } = await searchParams;
  const errorMessage = error ? (errorMessages[error] ?? "No fue posible iniciar sesión con Google.") : null;

  return (
    <section className="page-hero">
      <Container>
        <div className="admin-form glass google-login-card">
          <p className="eyebrow">Acceso privado</p>
          <h1 className="section-heading">Panel editorial</h1>
          <p className="muted login-description">
            Inicia sesión con la cuenta de Google autorizada para crear y publicar entradas.
          </p>
          {errorMessage && <Notification color="danger">{errorMessage}</Notification>}
          <form action={loginWithGoogle}>
            <Button className="google-auth-button" type="submit" fullwidth size="large">
              <span className="is-danger" aria-hidden="true">
                <Mail />
              </span>
              Continuar con Google
            </Button>
          </form>
          <p className="login-security-note">Autenticación segura mediante OAuth 2.0</p>
        </div>
      </Container>
    </section>
  );
}
