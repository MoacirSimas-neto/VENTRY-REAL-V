import test from 'node:test';
import assert from 'node:assert/strict';
import { getComoChegar, getLocalizacao, getPercurso } from './event-geography.ts';

test('Como chegar usa coordenadas confirmadas e deixa a origem em branco', () => {
  const url = new URL(getComoChegar(getLocalizacao('4'), 'Passeio Pedra Branca', 'Palhoça - SC'));
  assert.equal(url.origin + url.pathname, 'https://www.google.com/maps/dir/');
  assert.equal(url.searchParams.get('api'), '1');
  assert.equal(url.searchParams.get('destination'), '-27.6223774,-48.6778376');
  assert.equal(url.searchParams.has('origin'), false);
});

test('Como chegar aceita endereço completo e omite destinos incertos', () => {
  const local = { endereco: 'Rua da Universidade, s/n' };
  const url = new URL(getComoChegar(local, 'Passeio Pedra Branca', 'Palhoça - SC'));
  assert.equal(url.searchParams.get('destination'), 'Passeio Pedra Branca, Rua da Universidade, s/n, Palhoça - SC, Brasil');
  assert.equal(getComoChegar({ ...local, ilustrativa: true }, 'Passeio', 'Palhoça'), undefined);
  assert.equal(getComoChegar(getLocalizacao('1'), 'Arena Floripa', 'Florianópolis'), undefined);
});

test('A corrida tem um circuito ilustrativo fechado com pontos sobre o traçado', () => {
  const { geometry, properties } = getPercurso('4');
  assert.equal(properties.ilustrativo, true);
  assert.ok(properties.distanciaKm > 0);
  assert.deepEqual(geometry.coordinates[0], geometry.coordinates.at(-1));
  assert.deepEqual(properties.pontos[0].coordenadas, geometry.coordinates[0]);
  assert.equal(properties.pontos[0].tipo, 'inicio-fim');
  assert.ok(properties.pontos.some(ponto => ponto.tipo === 'hidratacao'));
  for (const { coordenadas } of properties.pontos) {
    assert.ok(geometry.coordinates.some(([lng, lat]) => lng === coordenadas[0] && lat === coordenadas[1]));
  }
  assert.equal(getPercurso('2'), undefined);
});
