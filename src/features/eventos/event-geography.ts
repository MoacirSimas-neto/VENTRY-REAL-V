import circuito from './circuito-pedra-branca.geojson.json' with { type: 'json' };

export type Localizacao = {
  endereco: string;
  coordenadas?: [latitude: number, longitude: number];
  ilustrativa?: boolean;
};

const locais: Partial<Record<string, Localizacao>> = {
  // Ministério da Pesca e Aquicultura, ponto FLOR29.
  '2': {
    endereco: 'Av. Jornalista Rubens de Arruda Ramos, 6208 · Centro',
    coordenadas: [-27.5866927, -48.5571362],
  },
  // Destino publicado em https://www.passeiopedrabranca.com.br/contato/
  '4': {
    endereco: 'Rua da Universidade, s/n · Cidade Universitária Pedra Branca',
    coordenadas: [-27.6223774, -48.6778376],
  },
};

export function getLocalizacao(id: string) {
  return locais[id];
}

export function getPercurso(id: string) {
  return id === '4' ? circuito : undefined;
}

export function getComoChegar(localizacao: Localizacao | undefined, nome: string, cidade: string) {
  if (!localizacao || localizacao.ilustrativa) return;
  const destino = localizacao.coordenadas?.join(',') ??
    [nome, localizacao.endereco, cidade, 'Brasil'].join(', ');
  const url = new URL('https://www.google.com/maps/dir/');
  url.search = new URLSearchParams({ api: '1', destination: destino }).toString();
  return url.href;
}
