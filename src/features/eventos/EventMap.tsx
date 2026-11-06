import { useState } from 'react';
import type { Setor } from './event-map';
import { ancoraTipoIngresso } from './ticket-selection';
import './event-map.css';

export function EventMap({ setores }: { setores: readonly Setor[] }) {
  const [setorId, setSetorId] = useState('pista');

  return (
    <section aria-labelledby="event-map-title" className="mt-8 border-t border-line pt-6 sm:mt-10">
      <p className="eyebrow">Mapa ilustrativo</p>
      <h2 id="event-map-title" className="mt-2 font-editorial text-3xl font-bold">Explore o evento</h2>

      <div className="mt-5 grid overflow-hidden rounded-panel border border-line bg-surface lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <figure className="event-map-art min-w-0 border-b border-line px-4 pt-4 pb-2 sm:px-6 lg:border-r lg:border-b-0">
          <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs font-semibold text-muted">
            <span className="text-ink">Planta de setores</span>
            <span>Vista superior · Sem escala</span>
          </figcaption>
          <svg viewBox="0 0 420 310" className="mx-auto mt-2 block w-full max-w-[31rem]" role="img" aria-label="Palco ao fundo, VIP à frente do palco, pista central e acesso pelo saguão">
            <path d="M75 21h270l37 30v172l-63 30v33H101v-33l-63-30V51Z" fill="#252733" stroke="#505363" strokeWidth="2" />
            <path d="M75 27h270M45 60v155l67 32v32h196v-32l67-32V60" fill="none" stroke="#393c4b" strokeWidth="3" />
            <path d="M52 53l41-22v52H52Zm316 0-41-22v52h41Z" fill="#303341" />
            <path d="M60 61h23m254 0h23" stroke="#777b8e" strokeWidth="2" />
            <path d="M101 254h41m136 0h41m-136 32v-9m54 9v-9" fill="none" stroke="#9da0b3" strokeWidth="1.5" strokeLinecap="round" />

            {setores.map((item, index) => (
              <g key={item.id} className="event-map-zone" data-setor={item.id} data-selected={setorId === item.id} onClick={() => setSetorId(item.id)}>
                <path className="event-map-sector" d={item.area} />
                <circle className="event-map-key" cx={item.rotulo[0] - 47} cy={item.rotulo[1]} r="10" />
                <text className="event-map-index" x={item.rotulo[0] - 47} y={item.rotulo[1]} textAnchor="middle" dominantBaseline="middle">{index + 1}</text>
                <text className="event-map-label" x={item.rotulo[0] + 12} y={item.rotulo[1]} textAnchor="middle" dominantBaseline="middle">{item.nome}</text>
                {setorId === item.id && (
                  <path className="event-map-check" d="m-4 0 3 3 6-6" transform={'translate(' + (item.rotulo[0] + 53) + ' ' + item.rotulo[1] + ')'} />
                )}
              </g>
            ))}
          </svg>
        </figure>

        <div className="min-w-0 p-4 sm:p-6">
          <p className="eyebrow">Setores do evento</p>
          <p className="mt-2 text-sm text-muted">Selecione no mapa ou na lista.</p>
          <div role="group" aria-label="Áreas do evento" className="mt-4 divide-y divide-line border-y border-line">
            {setores.map((item, index) => {
              const selecionado = setorId === item.id;
              return (
                <div key={item.id} className={selecionado ? 'bg-paper' : undefined}>
                  <button type="button" onClick={() => setSetorId(item.id)} aria-pressed={selecionado}
                    className="event-map-option flex min-h-12 w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-sm font-semibold hover:bg-paper aria-pressed:text-accent"
                    data-setor={item.id}>
                    <span aria-hidden="true" className="event-map-number">{index + 1}</span>
                    {item.nome}
                    {selecionado && <span aria-hidden="true" className="ml-auto">✓</span>}
                  </button>
                  {selecionado && (
                    <div className="px-3 pb-4">
                      <p className="text-sm leading-relaxed text-muted">{item.descricao}</p>
                      {item.ingresso && (
                        <a href={'#' + ancoraTipoIngresso(item.ingresso.tipo)} className="action mt-3 w-full sm:w-auto">{item.ingresso.acao}</a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
