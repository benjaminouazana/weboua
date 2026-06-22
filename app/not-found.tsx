import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-bold text-mint">404</span>
      <h1 className="mt-4 text-3xl">Cette page n'existe pas</h1>
      <p className="mt-3 max-w-md text-muted">
        Le lien est peut-être cassé ou la page a été déplacée. Revenons sur le bon chemin.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Retour à l'accueil
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </section>
  );
}
