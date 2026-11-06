import { useState } from 'react';
import type { GeographicMapProps } from './GeographicMap';
import { getComoChegar, getLocalizacao, getPercurso } from './event-geography';
import type { Evento } from './event-service';

function MapOnDemand(props: GeographicMapProps) {
  const [Mapa, setMapa] = useState<typeof import('./GeographicMap').GeographicMap>();
  const [estado, setEstado] = useState<'inicial' | 'carregando' | 'erro'>('inicial');

  async function carregar() {
    setEstado('carregando');
    try {
      const modulo = await import('./GeographicMap');
      setMapa(() => modulo.GeographicMap);
    } catch {
      setEstado('erro');
    }
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-surface">
      {Mapa ? <Mapa {...props} /> : (
        <div className="flex min-h-32 flex-wrap items-center gap-x-4 gap-y-2 p-4">
          <button
            type="button"
            aria-disabled={estado === 'carregando'}
            onClick={() => { if (estado !== 'carregando') void carregar(); }}
            className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold text-primary hover:underline"
          >
            {estado === 'erro' ? 'Tentar carregar novamente' : 'Carregar mapa'}
          </button>
          <p role="status" className="text-sm text-muted">
            {estado === 'erro' ? 'Mapa indisponível no momento.' : estado === 'carregando' ? 'Carregando mapa…' : 'Abre o mapa interativo nesta página.'}
          </p>
        </div>
      )}
    </div>
  );
}

const km = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

export function EventGeography({ evento }: { evento: Evento }) {
  const local = getLocalizacao(evento.id);
  const percurso = getPercurso(evento.id);
  const cidade = evento.local.cidade + ' - ' + evento.local.estado;
  const rota = getComoChegar(local, evento.local.nome, cidade);

  return (
    <>
      <section aria-labelledby="venue-title" className="mt-8 border-t border-line pt-6">
        <h2 id="venue-title" className="section-title text-2xl font-bold">Onde acontece</h2>
        <div className="mt-4 grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="font-bold">{local ? evento.local.nome : 'Local a confirmar'}</p>
            <address className="mt-1 text-sm leading-relaxed text-muted not-italic">
              {local?.endereco && <span className="block">{local.endereco}</span>}
              {cidade}
            </address>
            {local?.ilustrativa && <p className="mt-2 text-sm font-semibold">Localização ilustrativa</p>}
            {rota && <a href={rota} target="_blank" rel="noopener noreferrer" className="action mt-4 inline-flex px-4">
              Como chegar <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span>
            </a>}
          </div>
          {local?.coordenadas && <MapOnDemand nome={'Mapa do local: ' + evento.local.nome} local={local.coordenadas} />}
        </div>
      </section>

      {percurso && (
        <section aria-labelledby="course-title" className="mt-8 border-t border-line pt-6">
          <h2 id="course-title" className="section-title text-2xl font-bold">Percurso da corrida</h2>
          <div className="mt-4 grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="rounded-xl border border-line bg-surface p-4">
              {percurso.properties.ilustrativo && <p className="text-sm font-semibold text-muted">Percurso ilustrativo</p>}
              <p className="mt-1 text-2xl font-bold tabular-nums">{km.format(percurso.properties.distanciaKm)} km</p>
              {percurso.properties.ilustrativo && <p className="mt-1 text-sm text-muted">Distância e pontos de apoio simulados.</p>}
              <ul className="mt-4 grid gap-2 text-sm" aria-label="Pontos do percurso">
                {percurso.properties.pontos.map((ponto, indice) => (
                  <li key={ponto.nome} className="flex items-center gap-2">
                    <span aria-hidden="true" className={'grid size-6 place-items-center text-xs font-bold ' +
                      (ponto.tipo === 'hidratacao' ? 'rounded-md bg-sky-200 text-sky-950' : 'rounded-full bg-violet-300 text-violet-950')}>
                      {indice + 1}
                    </span>
                    {ponto.nome}
                  </li>
                ))}
              </ul>
            </div>
            <MapOnDemand nome="Mapa do percurso da corrida" percurso={percurso} />
          </div>
        </section>
      )}
    </>
  );
}
