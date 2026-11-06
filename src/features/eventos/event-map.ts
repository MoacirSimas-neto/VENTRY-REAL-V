type DadosSetor = {
  id: string;
  nome: string;
  descricao: string;
  ingresso?: { tipo: string; acao: string };
};

type Geometria = {
  area: string;
  rotulo: [number, number];
  detalhes?: string;
};

export type Setor = DadosSetor & Geometria & { posicao: string };

export type Planta = {
  fundo: string;
  circulacao: string;
  setores: readonly Setor[];
  marcadoresLaterais?: boolean;
};

const posicoes = ['fundo', 'frente', 'centro', 'acesso'];

function planta(fundo: string, circulacao: string, setores: (DadosSetor & Geometria)[], marcadoresLaterais = false): Planta {
  return {
    fundo,
    circulacao,
    marcadoresLaterais,
    setores: setores.map((setor, index) => ({ ...setor, posicao: posicoes[index] })),
  };
}

const entrada: DadosSetor = {
  id: 'entrada', nome: 'Entrada',
  descricao: 'Ponto de acesso do público e início da circulação.',
};

const ingressoVip = { tipo: 'VIP', acao: 'Ver ingressos VIP' };
const ingressoPista = { tipo: 'Pista', acao: 'Ver ingressos da Pista' };

export const mapasDosEventos: Partial<Record<string, Planta>> = {
  '1': planta(
    'M28 26h364v198h-95v60H123v-60H28Z',
    'M40 98h340M249 105v110M40 224h340M210 226v22',
    [
      { id: 'palco', nome: 'Palco', descricao: 'Área das palestras e apresentações do encontro.', area: 'M87 37h246v49H87Z', rotulo: [210, 66] },
      { id: 'vip', nome: 'VIP', descricao: 'Área reservada ao lado da plateia principal.', ingresso: ingressoVip, area: 'M258 109h119v100H258Z', rotulo: [317, 154] },
      {
        id: 'plateia', nome: 'Plateia',
        descricao: 'Área principal para acompanhar as palestras, acessível com ingresso Pista.',
        ingresso: ingressoPista, area: 'M43 109h196v100H43Z', rotulo: [141, 154],
        detalhes: 'M58 171h166m-166 10h166m-166 10h166',
      },
      { ...entrada, area: 'M141 235h138v38H141Z', rotulo: [210, 259] },
    ],
  ),
  '2': planta(
    'M75 21h270l37 30v172l-63 30v33H101v-33l-63-30V51Z',
    'M75 27h270M45 60v155l67 32v32h196v-32l67-32V60M60 61h23m254 0h23M101 254h41m136 0h41m-136 32v-9m54 9v-9',
    [
      { id: 'palco', nome: 'Palco', descricao: 'Área das apresentações, em frente aos setores do público.', area: 'M107 34h206v26l-19 19H126l-19-19Z', rotulo: [210, 55] },
      { id: 'vip', nome: 'VIP', descricao: 'Setor em frente ao palco, entre a área das apresentações e a pista.', ingresso: ingressoVip, area: 'M84 91h252l10 10v29H74v-29Z', rotulo: [210, 112] },
      { id: 'pista', nome: 'Pista', descricao: 'Área central em pé, entre a entrada e o setor VIP.', ingresso: ingressoPista, area: 'M74 143h272v63l-35 31H109l-35-31Z', rotulo: [210, 188] },
      { ...entrada, area: 'M142 249h136v27H142Z', rotulo: [210, 263] },
    ],
    true,
  ),
  '3': planta(
    'M27 35h366v193H255v55h-90v-55H27Z',
    'M145 44v169M286 44v169M35 207h350M210 209v27',
    [
      { id: 'oficinas', nome: 'Oficinas', descricao: 'Espaço demonstrativo para atividades com as cozinhas locais.', area: 'M39 52h94v140H39Z', rotulo: [86, 112], detalhes: 'M52 144h68m-68 14h68m-68 14h68' },
      { id: 'mesas', nome: 'Mesas', descricao: 'Área para sentar e experimentar os pratos.', area: 'M298 52h83v140H298Z', rotulo: [339, 112], detalhes: 'M315 144h48m-48 14h48m-48 14h48' },
      {
        id: 'feira', nome: 'Feira', descricao: 'Área de circulação entre as bancas de comida e os produtores artesanais.',
        area: 'M158 52h115v140H158Z', rotulo: [215, 125],
        detalhes: 'M171 65h30v22h-30ZM230 65h30v22h-30ZM171 151h30v22h-30ZM230 151h30v22h-30Z',
      },
      { ...entrada, area: 'M171 231h78v42h-78Z', rotulo: [210, 257] },
    ],
  ),
  '4': planta(
    'M83 27h243q64 0 64 64v125q0 61-61 61H95q-65 0-65-65V94q0-67 53-67Z',
    'M130 82h185q38 0 38 38v78q0 35-35 35H100q-33 0-33-33v-63q0-21 21-21h32',
    [
      { id: 'chegada', nome: 'Chegada', descricao: 'Área de encerramento da corrida e dispersão dos participantes.', area: 'M55 49h112v53H55Z', rotulo: [111, 80] },
      { id: 'largada', nome: 'Largada', descricao: 'Ponto de reunião e saída dos corredores.', area: 'M297 191h78v56h-78Z', rotulo: [336, 222] },
      { id: 'concentracao', nome: 'Concentração', descricao: 'Área de encontro e aquecimento antes da largada.', area: 'M126 120h160v84H126Z', rotulo: [206, 170] },
      { ...entrada, area: 'M42 191h78v56H42Z', rotulo: [81, 222] },
    ],
  ),
  '5': planta(
    'M98 24h224l49 43-24 166-62 30H135l-62-30L49 67Z',
    'M79 99l24 117 43 35m195-152-24 117-43 35M210 93v128',
    [
      { id: 'tela', nome: 'Tela', descricao: 'Área da projeção e da conversa com os realizadores.', area: 'M115 39q95 18 190 0v34q-95 18-190 0Z', rotulo: [210, 66] },
      { id: 'frente', nome: 'Fileiras da frente', descricao: 'Assentos mais próximos da tela.', area: 'M100 94q110 15 220 0l-13 48q-97 17-194 0Z', rotulo: [210, 126] },
      {
        id: 'plateia', nome: 'Plateia', descricao: 'Área principal de assentos da mostra de curtas.',
        area: 'M112 153q98 18 196 0l-12 61q-86 27-172 0Z', rotulo: [210, 185],
        detalhes: 'M131 197q79 21 158 0m-156 10q77 22 154 0',
      },
      { ...entrada, area: 'M147 235h126v37H147Z', rotulo: [210, 258] },
    ],
  ),
};
