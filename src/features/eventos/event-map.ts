export type Setor = {
  id: string;
  nome: string;
  descricao: string;
  area: string;
  rotulo: [number, number];
  ingresso?: { tipo: string; acao: string };
};

export const mapasDosEventos: Partial<Record<string, readonly Setor[]>> = {
  '2': [
    {
      id: 'palco', nome: 'Palco',
      descricao: 'Área das apresentações, em frente aos setores do público.',
      area: 'M107 34h206v26l-19 19H126l-19-19Z', rotulo: [210, 55],
    },
    {
      id: 'vip', nome: 'VIP',
      descricao: 'Setor em frente ao palco, entre a área das apresentações e a pista.',
      area: 'M84 91h252l10 10v29H74v-29Z', rotulo: [210, 112],
      ingresso: { tipo: 'VIP', acao: 'Ver ingressos VIP' },
    },
    {
      id: 'pista', nome: 'Pista',
      descricao: 'Área central em pé, entre a entrada e o setor VIP.',
      area: 'M74 143h272v63l-35 31H109l-35-31Z', rotulo: [210, 188],
      ingresso: { tipo: 'Pista', acao: 'Ver ingressos da Pista' },
    },
    {
      id: 'entrada', nome: 'Entrada',
      descricao: 'Acesso do público pelo saguão, com passagem para os setores.',
      area: 'M142 249h136v27H142Z', rotulo: [210, 263],
    },
  ],
};
