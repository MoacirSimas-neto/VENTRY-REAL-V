import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router';
import { dateFormat, priceFormat, timeFormat } from './event-formatters';
import { getCatalogo, getEventosDaRegiao, getEventosEmAlta, type Evento } from './event-service';

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
          <h3 id={'evento-' + evento.id} className="mt-2 font-editorial text-2xl leading-tight font-bold wrap-anywhere group-hover:underline">
            {evento.nome}
          </h3>
          <time dateTime={evento.inicio} className="mt-3 text-sm font-semibold">
            {dateFormat.format(new Date(evento.inicio))}
          </time>
          <p className="mt-1 text-sm text-muted">{evento.local.cidade} · {evento.local.nome}</p>
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
  const { regiao, regioes, destaque, eventos, categorias } = useLoaderData<typeof homeLoader>();
  const [regiaoId, setRegiaoId] = useState(regiao.id);
  const [categoria, setCategoria] = useState('');
  const [agora] = useState(Date.now);
  const eventosDaRegiao = getEventosDaRegiao(regiaoId);
  const emAlta = getEventosEmAlta(eventosDaRegiao, agora);
  const filtrados = categoria
    ? eventosDaRegiao.filter(evento => evento.categoria === categoria)
    : eventosDaRegiao;
  const capasDeFundo = eventos.filter(evento => evento.id !== destaque.id).slice(0, 2);
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

          <div className="hero-panel mt-6 grid gap-6 rounded-panel border border-line p-5 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] md:items-center md:gap-8 md:p-8">
            <div className="featured-art">
              {capasDeFundo.map((evento, index) => (
                <img
                  key={evento.id}
                  className={'featured-poster featured-poster--' + (index === 0 ? 'back' : 'middle')}
                  src={evento.capa.src}
                  alt=""
                  width="1200"
                  height="640"
                  aria-hidden="true"
                />
              ))}
              <img
                className="featured-poster featured-poster--front"
                src={destaque.capa.src}
                alt={destaque.capa.alt}
                width="1200"
                height="640"
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

        <section aria-labelledby="em-alta" className="mt-10 rounded-panel border border-line bg-surface p-5 sm:mt-14 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Radar Ventry</p>
              <h2 id="em-alta" className="mt-2 font-editorial text-3xl leading-tight font-bold sm:text-4xl">Em alta na sua região</h2>
            </div>
            <label className="grid w-full gap-1.5 text-sm font-semibold sm:w-auto">
              Região
              <select
                value={regiaoId}
                onChange={event => setRegiaoId(event.target.value)}
                className="min-h-11 w-full cursor-pointer rounded-lg border border-muted bg-paper px-3 py-2 text-ink"
              >
                {regioes.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </label>
          </div>
          <p className="mt-3 text-sm text-muted">Eventos futuros ordenados por interesse simulado. A região também recorta o catálogo.</p>
          <p className="sr-only" role="status">{emAlta.length} {emAlta.length === 1 ? 'evento em alta' : 'eventos em alta'}</p>
          {emAlta.length > 0 ? (
            <ol className="mt-5 grid gap-3 lg:grid-cols-3">
              {emAlta.map((evento, index) => (
                <li key={evento.id} className="min-w-0">
                  <Link
                    to={'/eventos/' + evento.id}
                    className="trend-link flex min-h-16 items-center gap-3 rounded-lg border border-line bg-paper px-3 py-2 hover:border-muted"
                  >
                    <span aria-hidden="true" className="font-editorial text-2xl font-bold tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <img src={evento.capa.src} alt="" width="96" height="64" loading="lazy" className="h-11 w-16 shrink-0 rounded-sm object-cover" />
                    <span className="min-w-0">
                      <strong className="block text-sm wrap-anywhere">{evento.nome}</strong>
                      <span className="block text-sm text-muted">{evento.local.cidade}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-5 border-t border-line pt-4 text-muted">Ainda não há eventos futuros em alta nesta região.</p>
          )}
        </section>

        <section aria-labelledby="catalogo" className="mt-10 border-t border-line pt-7 sm:mt-14">
          <p className="eyebrow">Agenda da região</p>
          <h2 id="catalogo" ref={catalogHeading} tabIndex={-1} className="mt-2 scroll-mt-6 font-editorial text-3xl leading-tight font-bold sm:text-4xl">Explore os eventos</h2>
          <div role="group" aria-label="Categorias de eventos" className="mt-5 flex flex-wrap gap-2">
            {['', ...categorias].map(item => (
              <button
                key={item}
                type="button"
                aria-pressed={categoria === item}
                onClick={() => setCategoria(item)}
                className="category-filter inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-muted bg-surface px-3.5 text-sm font-semibold hover:bg-paper aria-pressed:bg-ink aria-pressed:text-paper aria-pressed:hover:bg-ink"
              >
                {categoria === item && (
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="m3 8 3 3 7-7" />
                  </svg>
                )}
                {item || 'Todos'}
              </button>
            ))}
          </div>
          <p role="status" className="mt-4 text-sm text-muted">{filtrados.length} {filtrados.length === 1 ? 'evento' : 'eventos'}</p>
          {filtrados.length > 0 ? (
            <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map(evento => (
                <li key={evento.id} className="min-w-0">
                  <EventCard evento={evento} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-panel border border-line bg-surface p-5">
              <h3 className="font-editorial text-2xl font-bold">Nenhum evento nesta categoria</h3>
              <p className="mt-2 text-sm text-muted">Veja as outras categorias disponíveis para a região escolhida.</p>
              <button type="button" className="action mt-4 cursor-pointer" onClick={() => {
                setCategoria('');
                catalogHeading.current?.focus();
              }}>Limpar filtro</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
