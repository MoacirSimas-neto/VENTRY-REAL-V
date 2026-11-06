import ingressosMock from './ingressos.mock.json' with { type: 'json' };

export type Lote = {
  id: string;
  tipo: string;
  nome: string;
  precoCentavos: number;
  estoque: number;
};

type Quantidades = Partial<Record<string, number>>;
const lotesPorEvento: Record<string, readonly Lote[]> = ingressosMock;

export function getLotes(eventoId: string): readonly Lote[] {
  return Object.hasOwn(lotesPorEvento, eventoId) ? lotesPorEvento[eventoId] : [];
}

export function ajustarQuantidade(lote: Lote, atual: number, delta: -1 | 1) {
  return Math.max(0, Math.min(lote.estoque, atual + delta));
}

export function resumirIngressos(lotes: readonly Lote[], quantidades: Quantidades) {
  const itens = lotes.flatMap(lote => {
    const quantidade = Math.min(lote.estoque, quantidades[lote.id] ?? 0);
    return quantidade > 0 ? [{ lote, quantidade, subtotal: quantidade * lote.precoCentavos }] : [];
  });

  return {
    itens,
    total: itens.reduce((total, item) => total + item.subtotal, 0),
    quantidade: itens.reduce((total, item) => total + item.quantidade, 0),
  };
}
