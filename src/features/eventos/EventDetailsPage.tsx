import { useState } from 'react';
import { Link, useLoaderData, useLocation, type LoaderFunctionArgs } from 'react-router';
import { dateFormat, priceFormat, timeFormat } from './event-formatters';
import { getEvento } from './event-service';
import { EventMap } from './EventMap';
import { EventGeography } from './EventGeography';
import { mapasDosEventos } from './event-map';
import { TicketSelection } from './TicketSelection';
import { getLotes } from './ticket-selection';
import { NotFound } from '../../shared/ui/NotFound';
import './event-detail.css';

export function eventDetailsLoader({ params }: LoaderFunctionArgs) {
  return getEvento(params.id ?? '');
}

export function EventDetailsPage() {
  const evento = useLoaderData<typeof eventDetailsLoader>();
  const { search } = useLocation();
  const [agora] = useState(Date.now);

  if (!evento) return <NotFound event />;

  const mapa = mapasDosEventos[evento.id];
  const inicio = new Date(evento.inicio);
  const preco = priceFormat.format(evento.precoInicial);

  return (
    <main id="conteudo" tabIndex={-1} className="grow">
      <article key={evento.id} className="site-shell pt-3 pb-14 sm:pt-5">
        <Link to={{ pathname: "/", search, hash: "#catalogo" }} className="text-muted mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline">
          <span aria-hidden="true">←</span> Voltar aos eventos
        </Link>

        <div className="event-layout">
          <div className="event-cover">
            <img
              src={evento.capa.src}
              alt={evento.capa.alt}
              width="1200"
              height="640"
              className="block h-auto w-full"
            />
            <div className="event-ticket-stage" aria-hidden="true">
              <div className="event-ticket">
                <div className="event-ticket-face">
                  <span className="event-ticket-brand">Ventry</span>
                  <span className="event-ticket-label">ACESSO</span>
                  <span className="event-ticket-barcode" />
                  <span className="event-ticket-stub" />
                </div>
              </div>
            </div>
          </div>

          <section className="event-summary" aria-labelledby="event-title">
            <p className="eyebrow">{evento.categoria} · Presencial</p>
            <h1 id="event-title" className="editorial-title mt-2">
              {evento.nome}
            </h1>

            <dl className="border-line mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm lg:gap-6 lg:text-base">
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted sm:text-sm">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M8 3v4m8-4v4M3 10h18" />
                  </svg>
                  Data e horário
                </dt>
                <dd className="mt-1 font-semibold">
                  <time dateTime={evento.inicio}>
                    <span className="block">{dateFormat.format(inicio)}</span>
                    <span className="text-muted">{timeFormat.format(inicio)}</span>
                  </time>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted sm:text-sm">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Local
                </dt>
                <dd className="mt-1 font-semibold">{evento.local.nome}</dd>
                <dd className="text-muted">{evento.local.cidade} - {evento.local.estado}</dd>
              </div>
            </dl>
          </section>

          <aside aria-labelledby="event-price-title" className="event-price grid gap-4 border border-line bg-surface p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-5">
            <div>
              <h2 id="event-price-title" className="text-sm font-semibold text-muted">Ingressos</h2>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm">
                <span>A partir de</span>
                <strong className="text-2xl font-extrabold tracking-tight tabular-nums">{preco}</strong>
              </p>
            </div>
            <a href="#ingressos" className="action w-full motion-safe:transition-colors lg:w-auto lg:px-4">
              Ver ingressos <span aria-hidden="true">↓</span>
            </a>
          </aside>

          <div className="event-description border-line grid gap-6 border-t pt-5">
            <section aria-labelledby="about-title">
              <h2 id="about-title" className="text-xl font-bold">Sobre o evento</h2>
              <p className="text-muted mt-2 max-w-prose leading-relaxed">{evento.descricao}</p>
            </section>
          </div>
        </div>
        <EventGeography evento={evento} />
        {mapa && <EventMap nomeEvento={evento.nome} mapa={mapa} />}
        <TicketSelection lotes={getLotes(evento.id)} encerrado={Date.parse(evento.inicio) <= agora} />
      </article>
    </main>
  );
}
