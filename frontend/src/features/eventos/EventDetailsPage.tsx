import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { getEvento } from './event-service';

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
});

const timeFormat = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Sao_Paulo',
});

const priceFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function eventDetailsLoader({ params }: LoaderFunctionArgs) {
  return getEvento(params.id ?? '');
}

export function EventDetailsPage() {
  const evento = useLoaderData<typeof eventDetailsLoader>();

  if (!evento) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h1 className="text-3xl font-black">Evento não encontrado</h1>
        <Link to="/" className="mt-4 inline-block underline">Voltar ao início</Link>
      </main>
    );
  }

  const inicio = new Date(evento.inicio);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-5 pb-12 sm:px-8 sm:pt-8">
      <Link to="/" className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:underline">
        <span aria-hidden="true">←</span> Voltar ao início
      </Link>

      <img
        src={evento.capa.src}
        alt={evento.capa.alt}
        width="1200"
        height="640"
        className="w-full rounded-2xl bg-[#11241d] sm:max-h-96 sm:object-contain"
      />

      <div className="mt-7 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,1fr)_19rem] md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby="event-title">
          <p className="text-xs font-bold tracking-widest text-muted uppercase">Tecnologia · Presencial</p>
          <h1 id="event-title" className="mt-2 text-4xl leading-none font-black tracking-tight sm:text-6xl">
            {evento.nome}
          </h1>

          <dl className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-muted">Data e horário</dt>
              <dd className="mt-1 font-semibold">
                <time dateTime={evento.inicio}>{dateFormat.format(inicio)} · {timeFormat.format(inicio)}</time>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Local</dt>
              <dd className="mt-1 font-semibold">{evento.local.nome}</dd>
              <dd className="text-sm text-muted">{evento.local.cidade} - {evento.local.estado}</dd>
            </div>
          </dl>
        </section>

        <div className="rounded-2xl border border-line bg-white p-5 md:row-span-2 md:self-start md:p-6">
          <p className="text-sm font-semibold text-muted">Ingressos a partir de</p>
          <p className="mt-1 text-3xl font-black tracking-tight">{priceFormat.format(evento.precoInicial)}</p>
          <a href="#ingressos" className="action mt-5 w-full">
            Ver ingressos <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="grid gap-7 border-t border-line pt-6">
          <section aria-labelledby="about-title">
            <h2 id="about-title" className="text-xl font-bold">Sobre o evento</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-muted">{evento.descricao}</p>
          </section>
          <section id="ingressos" tabIndex={-1} aria-labelledby="tickets-title" className="scroll-mt-5 rounded-lg">
            <h2 id="tickets-title" className="text-xl font-bold">Ingressos</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-muted">
              Entrada presencial a partir de {priceFormat.format(evento.precoInicial)}. A seleção de ingressos ainda não está disponível.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
