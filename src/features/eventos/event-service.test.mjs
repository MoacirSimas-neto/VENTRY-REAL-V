import assert from 'node:assert/strict';
import test from 'node:test';
import * as service from './event-service.ts';

test('preserves the original event and returns undefined for an unknown ID', async () => {
  const evento = await service.getEvento('1');

  assert.equal(evento?.nome, 'Floripa Tech Summit');
  assert.equal(evento?.inicio, '2026-10-29T20:00:00-03:00');
  assert.equal(evento?.precoInicial, 50);
  assert.equal(await service.getEvento('999'), undefined);
});

test('serves a regional catalog whose cards all resolve to event details', async () => {
  const { regiao, destaque, eventos } = await service.getCatalogo();

  assert.equal(regiao.nome, 'Grande Florianópolis');
  assert.ok(eventos.includes(destaque));
  assert.deepEqual(new Set(eventos.map(evento => evento.categoria)), new Set([
    'Tecnologia', 'Música', 'Gastronomia', 'Esportes', 'Cultura',
  ]));
  assert.equal(new Set(eventos.map(evento => evento.id)).size, eventos.length);

  for (const evento of eventos) {
    assert.deepEqual(await service.getEvento(evento.id), evento);
  }
});

test('ranks only future regional events by mock interest without changing the catalog', async () => {
  const { eventos } = await service.getCatalogo();
  const agora = Date.parse('2026-11-06T12:00:00-03:00');

  assert.deepEqual(service.getEventosDaRegiao('florianopolis').map(evento => evento.id), ['1', '2']);
  assert.deepEqual(service.getEventosEmAlta(service.getEventosDaRegiao('florianopolis'), agora).map(evento => evento.id), ['2']);
  assert.deepEqual(service.getEventosEmAlta(service.getEventosDaRegiao('entorno'), agora).map(evento => evento.id), ['3', '4', '5']);
  assert.deepEqual(service.getEventosEmAlta(eventos, agora).map(evento => evento.id), ['2', '3', '4']);
  assert.deepEqual(service.getEventosEmAlta(eventos, Date.parse('2027-01-01')), []);
  assert.deepEqual(eventos.map(evento => evento.id), ['1', '2', '3', '4', '5']);
});

test('searches event, venue and city without accents, case or surrounding spaces', async () => {
  const { eventos } = await service.getCatalogo();
  const buscar = (termo, categoria = '') => service.filtrarEventos(eventos, termo, categoria).map(evento => evento.id);

  assert.deepEqual(buscar('  SABORES '), ['3']);
  assert.deepEqual(buscar('Mercado de Sao'), ['3']);
  assert.deepEqual(buscar('Palhoca'), ['4']);
  assert.deepEqual(buscar('  Florianópolis  '), ['1', '2']);
  assert.deepEqual(buscar('florianopolis', 'Música'), ['2']);
  assert.deepEqual(buscar('florianopolis', 'Cultura'), []);
  assert.deepEqual(buscar('sem resultado'), []);
  assert.deepEqual(buscar('   '), ['1', '2', '3', '4', '5']);
});
