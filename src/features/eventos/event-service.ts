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
  capa: { src: string; alt: string };
  descricao: string;
};

const regiao = { nome: 'Grande Florianópolis' };
const eventos: readonly Evento[] = eventosMock;
const destaque = eventos.find(evento => evento.id === '2') ?? eventos[0];

export async function getCatalogo() {
  return { regiao, destaque, eventos };
}

export async function getEvento(id: string): Promise<Evento | undefined> {
  return eventos.find(evento => evento.id === id);
}
