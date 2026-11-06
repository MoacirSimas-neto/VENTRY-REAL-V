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
