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

const floripaTechSummit: Evento = {
  id: '1',
  nome: 'Floripa Tech Summit',
  inicio: '2026-10-29T20:00:00-03:00',
  local: { nome: 'Arena Floripa', cidade: 'Florianópolis', estado: 'SC' },
  categoria: 'Tecnologia',
  precoInicial: 50,
  capa: {
    src: '/eventos/floripa-tech-summit.svg',
    alt: 'Cartaz do Floripa Tech Summit com linhas verdes formando uma onda digital',
  },
  descricao: 'Um encontro para quem desenvolve tecnologia na Grande Florianópolis, com palestras sobre software e espaço para trocar experiências com a comunidade local.',
};

const regiao = { nome: 'Grande Florianópolis' };

const destaque: Evento = {
  id: '2',
  nome: 'Noite na Ilha',
  inicio: '2026-11-21T19:30:00-03:00',
  local: { nome: 'Trapiche da Beira-Mar', cidade: 'Florianópolis', estado: 'SC' },
  categoria: 'Música',
  precoInicial: 65,
  capa: { src: '/eventos/noite-na-ilha.svg', alt: 'Pôster roxo com círculos que lembram um disco de vinil' },
  descricao: 'Uma noite de shows ao ar livre com artistas da cena independente catarinense.',
};

const eventos: readonly Evento[] = [
  floripaTechSummit,
  destaque,
  {
    id: '3',
    nome: 'Sabores da Baía',
    inicio: '2026-12-05T12:00:00-03:00',
    local: { nome: 'Mercado de São José', cidade: 'São José', estado: 'SC' },
    categoria: 'Gastronomia',
    precoInicial: 35,
    capa: { src: '/eventos/sabores-da-baia.svg', alt: 'Pôster laranja com um prato e fatias de cítricos' },
    descricao: 'Feira gastronômica com cozinhas locais, produtores artesanais e pratos inspirados na baía.',
  },
  {
    id: '4',
    nome: 'Circuito da Pedra Branca',
    inicio: '2026-12-06T07:00:00-03:00',
    local: { nome: 'Passeio Pedra Branca', cidade: 'Palhoça', estado: 'SC' },
    categoria: 'Esportes',
    precoInicial: 55,
    capa: { src: '/eventos/circuito-pedra-branca.svg', alt: 'Pôster azul com faixas curvas de pista de corrida' },
    descricao: 'Corrida de rua na Pedra Branca com percursos para diferentes ritmos.',
  },
  {
    id: '5',
    nome: 'Mostra Luz do Sul',
    inicio: '2026-12-12T17:00:00-03:00',
    local: { nome: 'Casa da Cultura', cidade: 'Biguaçu', estado: 'SC' },
    categoria: 'Cultura',
    precoInicial: 25,
    capa: { src: '/eventos/mostra-luz-do-sul.svg', alt: 'Pôster vinho com formas geométricas inspiradas em projeções de cinema' },
    descricao: 'Mostra de curtas produzidos em Santa Catarina, com uma conversa com realizadores após a sessão.',
  },
];

export async function getCatalogo() {
  return { regiao, destaque, eventos };
}

export async function getEvento(id: string): Promise<Evento | undefined> {
  return eventos.find(evento => evento.id === id);
}
