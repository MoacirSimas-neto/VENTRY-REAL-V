# Ventry

[English](#english) · [Português](#portugues)

<a id="english"></a>

## English

Ventry is an event ticketing platform in development. It started as a project to learn relational database design, transactions, and concurrency. The next step is to build the customer-facing web experience.

### Current status

- **Database:** MySQL schema, seed data, and stored procedures for transactional purchases, stock control, and individual ticket generation. The SQL test script includes manual checks for purchase errors and stock contention.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, and React Router app running on mock data: event catalog with search and filters, event detail page with venue and sector maps, and ticket selection by batch.

### Roadmap

| Phase | Milestone | Status |
| --- | --- | --- |
| 1 | V1 analysis | ██████████ 100% |
| 2 | Database refactoring | ██████████ 100% |
| 3 | Stock control and transactions | ██████████ 100% |
| 4 | Ticketing model | In progress. Individual ticket generation is implemented. Payments and check-in are planned. |
| 5 | REST API | Planned |
| 6 | Authentication | Planned |
| 7 | Application testing and documentation | Planned |
| 8 | Frontend | In progress. The first milestone, the mock flow below, is complete. |
| 9 | Deployment | Planned |

The frontend starts with mock data while the database work continues.

### First frontend milestone

- [x] Build the event detail page first and use it to set the visual direction on mobile and desktop.
- [x] Build the event catalog and link each event to its detail page.
- [x] Let the customer select a ticket type, batch, and quantity, see the total, and recognize a sold-out batch.

The milestone is complete when the full flow works with mock data. Screens will call simple data functions so the mocks can later be replaced by API requests. Checkout, sign-in, and the organizer dashboard come after this milestone.

### Development workflow

- **Frontend:** developed and tested with mock data. The catalog and ticket selection flow run without MySQL.
- **Database:** SQL written and tested manually in MySQL Workbench.
- **Next step:** connect one read-only flow first, such as the event detail page. The planned backend is a REST API using Node.js, TypeScript, Express, and MySQL.

---

<a id="portugues"></a>

## Português

O Ventry é uma plataforma de eventos e venda de ingressos em desenvolvimento. O projeto começou como um exercício de modelagem de banco de dados, transações e concorrência. O próximo passo é construir a experiência web do cliente.

### Estado atual

- **Banco de dados:** schema MySQL, dados de exemplo e procedures para compras com transação, controle de estoque e geração de ingressos individuais. O roteiro SQL inclui verificações manuais de erros de compra e disputa por estoque.
- **Frontend:** aplicação em React, TypeScript, Vite, Tailwind CSS e React Router com dados fictícios: catálogo com busca e filtros, página de detalhe com mapa do local e dos setores, e seleção de ingressos por lote.

### Roadmap do projeto

| Fase | Etapa | Status |
| --- | --- | --- |
| 1 | Análise da V1 | ██████████ 100% |
| 2 | Refatoração do banco de dados | ██████████ 100% |
| 3 | Controle de estoque e transações | ██████████ 100% |
| 4 | Modelo de ingressos | Em andamento. A geração de ingressos individuais já existe. Pagamentos e check-in estão previstos. |
| 5 | API REST | Planejada |
| 6 | Autenticação | Planejada |
| 7 | Testes e documentação da aplicação | Planejados |
| 8 | Frontend | Em andamento. A primeira entrega, o fluxo com mocks descrito abaixo, está concluída. |
| 9 | Deploy | Planejado |

O frontend começa com dados fictícios enquanto o trabalho no banco continua.

### Primeira entrega do frontend

- [x] Montar primeiro a página de detalhe do evento e usá-la para definir a identidade visual no celular e no desktop.
- [x] Montar o catálogo e ligar cada evento à sua página de detalhe.
- [x] Permitir escolher tipo de ingresso, lote e quantidade, mostrar o total e sinalizar lote esgotado.

A entrega fica pronta quando o fluxo completo funciona com dados fictícios. As telas vão chamar funções simples de acesso a dados para que os mocks possam ser substituídos por chamadas à API. Checkout, login e painel do organizador ficam para depois dessa entrega.

### Fluxo de desenvolvimento

- **Frontend:** desenvolvido e testado com dados fictícios. O catálogo e a seleção de ingresso rodam sem MySQL.
- **Banco de dados:** SQL escrito e testado manualmente no MySQL Workbench.
- **Próximo passo:** integrar primeiro uma consulta de leitura, como o detalhe de um evento. A direção planejada para o backend é uma API REST com Node.js, TypeScript, Express e MySQL.

---

## Local frontend / Frontend local

Run from the repository root with Node.js 24 / Execute na raiz com Node.js 24.

```sh
npm ci
npm run dev
npm test
npm run build
```

- [Lovable editor / Editor Lovable](https://lovable.dev/projects/ec099c70-8fd5-45ce-a4b7-bfb1c6690c5d)
- [Original history / Histórico original](https://github.com/MoacirSimas-neto/Ventry-pre-lovable)


## Repository structure / Estrutura do repositório

```text
Ventry/
├── database/
│   ├── schema.sql
│   ├── procedure.sql
│   ├── seed.sql
│   └── tests.sql
├── src/
│   ├── app/
│   ├── features/
│   │   ├── checkout/
│   │   └── eventos/
│   └── shared/ui/
└── README.md
```
