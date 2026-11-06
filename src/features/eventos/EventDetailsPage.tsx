import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { dateFormat, priceFormat, timeFormat } from './event-formatters';
import { getEvento } from './event-service';
import './event-detail.css';

export function eventDetailsLoader({ params }: LoaderFunctionArgs) {
  return getEvento(params.id ?? '');
}

export function EventDetailsPage() {
  const evento = useLoaderData<typeof eventDetailsLoader>();

  if (!evento) {
    return (
      <main>
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <h1 className="text-3xl font-black">Evento não encontrado</h1>
          <Link to="/" className="mt-4 inline-block underline">Voltar ao início</Link>
        </div>
      </main>
    );
  }

  const inicio = new Date(evento.inicio);
  const preco = priceFormat.format(evento.precoInicial);

  return (
    <main>
      <article className="mx-auto max-w-6xl px-5 pt-2 pb-12 sm:px-8 sm:pt-4">
        <Link to="/" className="text-muted mb-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline">
          <span aria-hidden="true">←</span> Voltar ao início
        </Link>

        <div className="event-cover">
          <img
            src={evento.capa.src}
            alt={evento.capa.alt}
            width="1200"
            height="640"
            className="block h-auto w-full object-cover object-center md:max-h-[24rem]"
          />
          <div className="event-ticket-stage" aria-hidden="true">
            <div className="event-ticket">
              <div className="event-ticket-face">
                <span className="event-ticket-brand">Ventry</span>
                <span className="event-ticket-label">ACESSO</span>
                <span className="event-ticket-barcode" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-x-10 gap-y-5 md:mt-8 md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section aria-labelledby="event-title">
            <p className="text-muted text-xs font-bold tracking-widest uppercase">{evento.categoria} · Presencial</p>
            <h1 id="event-title" className="mt-2 text-[2rem] leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">
              {evento.nome}
            </h1>

            <dl className="border-line mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm sm:gap-6 sm:text-base">
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

          <aside aria-labelledby="event-price-title" className="event-price rounded-2xl border border-line bg-white p-4 md:row-span-2 md:self-start md:p-6">
            <h2 id="event-price-title" className="text-sm font-semibold text-muted">Ingressos</h2>
            <p className="mt-1 text-sm font-semibold">
              A partir de <strong className="ml-1 text-2xl tracking-tight md:text-3xl">{preco}</strong>
            </p>
            <a href="#ingressos" className="action mt-4 w-full motion-safe:transition-colors">
              Ver ingressos <span aria-hidden="true">↓</span>
            </a>
          </aside>

          <div className="border-line grid gap-6 border-t pt-5">
            <section aria-labelledby="about-title">
              <h2 id="about-title" className="text-xl font-bold">Sobre o evento</h2>
              <p className="text-muted mt-2 max-w-prose leading-relaxed">{evento.descricao}</p>
            </section>
            <section id="ingressos" tabIndex={-1} aria-labelledby="tickets-title" className="scroll-mt-5 rounded-lg">
              <h2 id="tickets-title" className="text-xl font-bold">Ingressos</h2>
              <p className="text-muted mt-2 max-w-prose leading-relaxed">
                A seleção de ingressos ainda não está disponível.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
