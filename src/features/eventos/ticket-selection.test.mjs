import assert from 'node:assert/strict';
import test from 'node:test';
import { ajustarQuantidade, getLotes, resumirIngressos } from './ticket-selection.ts';

test('bounds each lot by zero and stock, including sold-out lots', () => {
  const [esgotado, pista] = getLotes('2');
  assert.equal(ajustarQuantidade(esgotado, 0, 1), 0);
  assert.equal(ajustarQuantidade(pista, 0, -1), 0);
  assert.equal(ajustarQuantidade(pista, 0, 1), 1);
  assert.equal(ajustarQuantidade(pista, 2, 1), 2);
  assert.equal(ajustarQuantidade(pista, 1, -1), 0);
});

test('sums each selected lot in cents and drops zero quantities', () => {
  const lotes = getLotes('2');
  const resumo = resumirIngressos(lotes, { 'pista-1': 1, 'pista-2': 2, 'pista-3': 1, 'vip-1': 1 });
  assert.deepEqual(resumo.itens.map(({ lote, subtotal }) => [lote.id, subtotal]), [
    ['pista-2', 13000], ['pista-3', 7500], ['vip-1', 12990],
  ]);
  assert.equal(resumo.total, 33490);
  assert.equal(resumo.quantidade, 4);
  assert.deepEqual(resumirIngressos(lotes, { 'pista-2': 0 }), { itens: [], total: 0, quantidade: 0 });
  assert.deepEqual(getLotes('999'), []);
});
