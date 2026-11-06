import { Link, useLoaderData } from 'react-router';
import { dateFormat, priceFormat, timeFormat } from './event-formatters';
import { getCatalogo, type Evento } from './event-service';

export const homeLoader = getCatalogo;

function EventCard({ evento }: { evento: Evento }) {
  return (
    <article className="h-full">
      <Link
        to={'/eventos/' + evento.id}
        aria-labelledby={'evento-' + evento.id}
        className="group flex h-full flex-col rounded-2xl border border-line bg-white hover:border-muted"
      >
        <img
          src={evento.capa.src}
          alt={evento.capa.alt}
          width="1200"
          height="640"
          loading="lazy"
          className="aspect-[15/8] w-full rounded-t-2xl object-cover"
        />
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-xs font-bold tracking-widest text-muted uppercase">{evento.categoria}</p>
          <h3 id={'evento-' + evento.id} className="mt-1 text-xl font-extrabold tracking-tight group-hover:underline">
            {evento.nome}
          </h3>
          <time dateTime={evento.inicio} className="mt-3 text-sm font-semibold">
            {dateFormat.format(new Date(evento.inicio))}
          </time>
          <p className="mt-1 text-sm text-muted">{evento.local.nome} · {evento.local.cidade}</p>
          <p className="mt-auto pt-4 text-sm text-muted">
            A partir de <strong className="text-base text-ink">{priceFormat.format(evento.precoInicial)}</strong>
          </p>
        </div>
      </Link>
    </article>
  );
}

export function HomePage() {
  const { regiao, destaque, eventos } = useLoaderData<typeof homeLoader>();
  const inicio = new Date(destaque.inicio);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-7 pb-14 sm:px-8 sm:pt-12">
      <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-muted">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {regiao.nome}
      </p>
      <h1 id="destaques" className="mt-3 text-4xl leading-none font-black tracking-tight sm:text-6xl">
        Eventos em destaque
      </h1>

      <section aria-labelledby="destaques" className="mt-6 grid overflow-hidden rounded-2xl bg-ink text-paper md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <img
          src={destaque.capa.src}
          alt={destaque.capa.alt}
          width="1200"
          height="640"
          className="aspect-[15/8] h-full w-full object-cover"
        />
        <div className="flex flex-col items-start justify-center p-5 sm:p-8">
          <p className="text-xs font-bold tracking-widest text-accent uppercase">{destaque.categoria}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{destaque.nome}</h2>
          <time dateTime={destaque.inicio} className="mt-3 text-sm">
            {dateFormat.format(inicio)} · {timeFormat.format(inicio)}
          </time>
          <p className="mt-1 text-sm">{destaque.local.nome} · {destaque.local.cidade}</p>
          <p className="mt-4 font-semibold">A partir de {priceFormat.format(destaque.precoInicial)}</p>
          <Link
            to={'/eventos/' + destaque.id}
            className="action mt-5 focus-visible:outline-accent"
            aria-label={'Ver detalhes de ' + destaque.nome}
          >
            Ver evento <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="catalogo" className="mt-10 border-t border-line pt-7 sm:mt-14 sm:pt-9">
        <h2 id="catalogo" className="text-3xl font-black tracking-tight">Explore os eventos</h2>
        <p className="mt-1 text-sm text-muted">Programação em {regiao.nome}.</p>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map(evento => (
            <li key={evento.id}>
              <EventCard evento={evento} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
