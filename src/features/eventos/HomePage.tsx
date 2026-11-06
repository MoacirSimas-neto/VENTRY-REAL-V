import { useEffect, useRef } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router';
import { dateFormat, priceFormat, timeFormat } from './event-formatters';
import { getCatalogo, type Evento } from './event-service';

export const homeLoader = getCatalogo;

function EventCard({ evento }: { evento: Evento }) {
  return (
    <article className="h-full">
      <Link
        to={'/eventos/' + evento.id}
        aria-labelledby={'evento-' + evento.id}
        className="event-card group flex h-full flex-col rounded-panel border border-line bg-surface hover:border-muted"
      >
        <img
          src={evento.capa.src}
          alt={evento.capa.alt}
          width="1200"
          height="640"
          loading="lazy"
          className="aspect-[15/8] w-full rounded-t-panel object-cover"
        />
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="eyebrow">{evento.categoria}</p>
          <h3 id={'evento-' + evento.id} className="mt-2 font-editorial text-[1.55rem] leading-tight font-bold wrap-anywhere group-hover:underline">
            {evento.nome}
          </h3>
          <time dateTime={evento.inicio} className="mt-3 text-sm font-semibold">
            {dateFormat.format(new Date(evento.inicio))}
          </time>
          <p className="mt-1 text-sm text-muted">{evento.local.nome} · {evento.local.cidade}</p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
              <p className="text-sm text-muted">A partir de <strong className="text-base text-ink tabular-nums">{priceFormat.format(evento.precoInicial)}</strong></p>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18 18 6M8 6h10v10" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function HomePage() {
  const { regiao, destaque, eventos } = useLoaderData<typeof homeLoader>();
  const inicio = new Date(destaque.inicio);
  const catalogHeading = useRef<HTMLHeadingElement>(null);
  const { hash, key } = useLocation();

  useEffect(() => {
    if (hash === '#catalogo') catalogHeading.current?.focus({ preventScroll: true });
  }, [hash, key]);

  return (
    <main id="conteudo" tabIndex={-1} className="grow">
      <div className="site-shell pt-8 pb-12 sm:pt-12 sm:pb-16">
        <section aria-labelledby="destaques">
          <p className="eyebrow flex items-center gap-2">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {regiao.nome}
          </p>
          <h1 id="destaques" className="editorial-title mt-3 max-w-3xl">Encontre seu próximo evento</h1>

          <div className="mt-6 grid gap-6 rounded-panel border border-line bg-surface p-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center md:gap-8 md:p-6 lg:p-8">
            <div className="featured-art relative isolate mr-1.5 mb-1.5">
              <img
                src={destaque.capa.src}
                alt={destaque.capa.alt}
                width="1200"
                height="640"
                className="block h-auto w-full rounded-panel"
              />
            </div>
            <div>
              <p className="eyebrow">Em destaque · {destaque.categoria}</p>
              <h2 className="mt-2 font-editorial text-3xl leading-tight font-bold wrap-anywhere lg:text-4xl">{destaque.nome}</h2>
              <time dateTime={destaque.inicio} className="mt-3 block text-sm font-semibold">
                {dateFormat.format(inicio)} · {timeFormat.format(inicio)}
              </time>
              <p className="mt-1 text-sm text-muted">{destaque.local.nome} · {destaque.local.cidade}</p>
              <p className="mt-4 text-sm text-muted">A partir de <strong className="text-base text-ink tabular-nums">{priceFormat.format(destaque.precoInicial)}</strong></p>
              <Link to={'/eventos/' + destaque.id} className="action mt-4 w-full sm:w-auto" aria-label={'Ver detalhes de ' + destaque.nome}>
                Ver evento <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="catalogo" className="mt-10 border-t border-line pt-7 sm:mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Agenda da região</p>
              <h2 id="catalogo" ref={catalogHeading} tabIndex={-1} className="mt-2 scroll-mt-6 font-editorial text-3xl leading-tight font-bold sm:text-4xl">Explore os eventos</h2>
            </div>
            <p className="text-sm text-muted">{eventos.length} {eventos.length === 1 ? 'evento' : 'eventos'}</p>
          </div>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.map(evento => (
              <li key={evento.id} className="min-w-0">
                <EventCard evento={evento} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
