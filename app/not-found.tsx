import Link from "next/link";
import { Button, Container } from "react-ui-vegetas-wife";
export default function NotFound(){return <section className="page-hero"><Container><p className="eyebrow">Error 404</p><h1 className="display-title gradient-text">Fuera de órbita.</h1><p className="muted">La página que buscas no existe o cambió de coordenadas.</p><br/><Link href="/"><Button color="primary">Volver al inicio</Button></Link></Container></section>}
