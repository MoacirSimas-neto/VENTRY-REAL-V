import { useState } from 'react';
import { priceFormat } from './event-formatters';
import { ajustarQuantidade, resumirIngressos, type Lote } from './ticket-selection';
import './ticket-selection.css';

function dinheiro(centavos: number) {
  return priceFormat.format(centavos / 100);
}

export function TicketSelection({ lotes }: { lotes: readonly Lote[] }) {
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});
  const { itens, quantidade, total } = resumirIngressos(lotes, quantidades);
  const contagem = quantidade === 1 ? '1 ingresso' : quantidade + ' ingressos';

  function ajustar(lote: Lote, delta: -1 | 1) {
    setQuantidades(atuais => {
      const atual = atuais[lote.id] ?? 0;
      const proxima = ajustarQuantidade(lote, atual, delta);
      return proxima === atual ? atuais : { ...atuais, [lote.id]: proxima };
    });
  }

  return (
    <section aria-labelledby="ingressos" className="mt-8 border-t border-line pt-6 sm:mt-10">
      <p className="eyebrow">Ingressos</p>
      <h2 id="ingressos" tabIndex={-1} className="mt-2 scroll-mt-5 font-editorial text-3xl font-bold">Escolha seus ingressos</h2>
      {lotes.length === 0 ? (
        <p className="mt-3 text-muted">Este evento ainda não tem lotes disponíveis.</p>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted">Selecione a quantidade por lote. Disponibilidade demonstrativa.</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <ul className="grid gap-4">
              {lotes.map(lote => {
                const selecionados = quantidades[lote.id] ?? 0;
                const restantes = lote.estoque - selecionados;
                const esgotado = lote.estoque === 0;
                const rotulo = lote.tipo + ', ' + lote.nome;
                return (
                  <li key={lote.id} className="ticket-lot rounded-panel border border-line bg-surface motion-safe:transition-colors" data-selected={selecionados > 0}>
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-5">
                      <div>
                        <h3 className="font-editorial text-2xl leading-tight font-bold">{lote.tipo}</h3>
                        <p className="eyebrow mt-1">{lote.nome}</p>
                      </div>
                      <p className="text-right">
                        <strong className="block text-lg tabular-nums">{dinheiro(lote.precoCentavos)}</strong>
                        <span className="text-xs text-muted">por ingresso</span>
                      </p>
                    </div>
                    <div className="ticket-lot-stub flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
                      {esgotado ? (
                        <p className="text-sm font-bold text-muted">Esgotado</p>
                      ) : (
                        <>
                          <p className="text-sm text-muted">
                            {selecionados > 0 && <strong className="block text-ink">Selecionados: {selecionados}</strong>}
                            {restantes === 0 ? 'Limite do lote atingido' : restantes + (restantes === 1 ? ' disponível' : ' disponíveis')}
                          </p>
                          <div role="group" aria-label={'Quantidade de ' + rotulo} className="flex items-center gap-2">
                            <button type="button" className="ticket-stepper" aria-label={'Diminuir quantidade de ' + rotulo} aria-disabled={selecionados === 0} onClick={() => ajustar(lote, -1)}>−</button>
                            <span className="min-w-4 text-center font-bold tabular-nums">{selecionados}</span>
                            <button type="button" className="ticket-stepper" aria-label={'Aumentar quantidade de ' + rotulo} aria-disabled={restantes === 0} onClick={() => ajustar(lote, 1)}>+</button>
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside aria-labelledby="resumo-ingressos" className="self-start rounded-panel border border-line bg-surface p-5">
              <h3 id="resumo-ingressos" tabIndex={-1} className="scroll-mt-5 font-editorial text-2xl font-bold">Resumo dos ingressos</h3>
              {itens.length > 0 ? (
                <ul className="mt-4 divide-y divide-line">
                  {itens.map(({ lote, quantidade: qtd, subtotal }) => (
                    <li key={lote.id} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                      <div>
                        <p className="font-semibold">{lote.tipo} · {lote.nome}</p>
                        <p className="text-muted">Quantidade: {qtd}</p>
                      </div>
                      <strong className="shrink-0 tabular-nums">{dinheiro(subtotal)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted">Nenhum ingresso selecionado.</p>
              )}
              <p className="mt-4 flex justify-between gap-3 border-t border-line pt-4 font-bold">
                <span>Total</span>
                <strong className="text-xl tabular-nums">{dinheiro(total)}</strong>
              </p>
              <p role="status" aria-atomic="true" className="sr-only">{contagem} selecionados. Total: {dinheiro(total)}.</p>
            </aside>
          </div>
          {quantidade > 0 && (
            <div className="ticket-mobile-bar sticky bottom-0 z-10 mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-line bg-surface px-3 pt-2 shadow-lg lg:hidden">
              <p className="text-sm font-semibold tabular-nums">{contagem} · {dinheiro(total)}</p>
              <a href="#resumo-ingressos" className="action min-h-11 px-3">Ver resumo</a>
            </div>
          )}
        </>
      )}
    </section>
  );
}
