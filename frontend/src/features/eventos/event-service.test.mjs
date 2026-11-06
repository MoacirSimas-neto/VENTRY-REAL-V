import assert from 'node:assert/strict';
import test from 'node:test';
import { getEvento } from './event-service.ts';

test('returns only the requested mock event', async () => {
  const evento = await getEvento('1');

  assert.equal(evento?.nome, 'Floripa Tech Summit');
  assert.equal(evento?.inicio, '2026-10-29T20:00:00-03:00');
  assert.equal(evento?.precoInicial, 50);
  assert.equal(await getEvento('2'), undefined);
});
