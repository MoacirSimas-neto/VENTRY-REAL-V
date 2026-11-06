import eventosMock from './eventos.mock.json' with { type: 'json' };

type Local = {
  nome: string;
  cidade: string;
  estado: string;
};

export type Evento = {
  id: string;
  nome: string;
  inicio: string;
  local: Local;
  categoria: string;
  precoInicial: number;
  interesse: number;
  capa: { src: string; alt: string };
  descricao: string;
};

const regioes = [
  { id: 'grande-florianopolis', nome: 'Grande Florianópolis', cidades: [] },
  { id: 'florianopolis', nome: 'Florianópolis', cidades: ['Florianópolis'] },
  { id: 'entorno', nome: 'São José, Palhoça e Biguaçu', cidades: ['São José', 'Palhoça', 'Biguaçu'] },
];
const eventos: readonly Evento[] = eventosMock;
const destaque = eventos.find(evento => evento.id === '2') ?? eventos[0];

const categorias = [...new Set(eventos.map(evento => evento.categoria))]
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

export function getEventosDaRegiao(regiaoId: string) {
  const regiao = regioes.find(item => item.id === regiaoId) ?? regioes[0];
  return regioes[0] === regiao
    ? eventos
    : eventos.filter(evento => regiao.cidades.includes(evento.local.cidade));
}

function normalizarBusca(valor: string) {
  return valor.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/\p{M}/gu, '');
}

export function filtrarEventos(eventosDaRegiao: readonly Evento[], busca: string, categoria: string) {
  const termo = normalizarBusca(busca);
  return eventosDaRegiao.filter(evento =>
    (!categoria || evento.categoria === categoria) &&
    (!termo || [evento.nome, evento.local.nome, evento.local.cidade]
      .some(valor => normalizarBusca(valor).includes(termo))),
  );
}


export function getEventosEmAlta(eventosDaRegiao: readonly Evento[], agora: number) {
  return eventosDaRegiao
    .filter(evento => Date.parse(evento.inicio) > agora)
    .sort((a, b) => b.interesse - a.interesse || Date.parse(a.inicio) - Date.parse(b.inicio))
    .slice(0, 3);
}

export async function getCatalogo() {
  return { regiao: regioes[0], regioes, destaque, eventos, categorias };
}

export async function getEvento(id: string): Promise<Evento | undefined> {
  return eventos.find(evento => evento.id === id);
}
