type Local = {
  nome: string;
  cidade: string;
  estado: string;
};

type Evento = {
  id: string;
  nome: string;
  inicio: string;
  local: Local;
  precoInicial: number;
  capa: { src: string; alt: string };
  descricao: string;
};

const floripaTechSummit: Evento = {
  id: '1',
  nome: 'Floripa Tech Summit',
  inicio: '2026-10-29T20:00:00-03:00',
  local: { nome: 'Arena Floripa', cidade: 'Florianópolis', estado: 'SC' },
  precoInicial: 50,
  capa: {
    src: '/eventos/floripa-tech-summit.svg',
    alt: 'Cartaz do Floripa Tech Summit com linhas verdes formando uma onda digital',
  },
  descricao: 'Um encontro para quem desenvolve tecnologia na Grande Florianópolis, com palestras sobre software e espaço para trocar experiências com a comunidade local.',
};

export async function getEvento(id: string): Promise<Evento | undefined> {
  return id === floripaTechSummit.id ? floripaTechSummit : undefined;
}
