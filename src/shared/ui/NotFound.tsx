import { Link } from 'react-router';

export function NotFound({ event = false }: { event?: boolean }) {
  return (
    <main id="conteudo" tabIndex={-1} className="site-shell grow py-12 sm:py-20">
      <div className="max-w-xl border-l-4 border-accent pl-5 sm:pl-8">
        <p className="eyebrow">{event ? 'Evento indisponível' : 'Erro 404'}</p>
        <h1 className="editorial-title mt-3">{event ? 'Evento não encontrado' : 'Página não encontrada'}</h1>
        <p className="mt-4 leading-relaxed text-muted">
          {event ? 'O evento solicitado não está no catálogo.' : 'O endereço que você abriu não está disponível.'}
        </p>
        <Link to="/#catalogo" className="action mt-6">Explorar eventos <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
