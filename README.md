# Ventry

[English](#english) · [Português](#portugues)

<a id="english"></a>

## English

Ventry is an event ticketing platform in development. It started as a project to learn relational database design, transactions, and concurrency. The next step is to build the customer-facing web experience.

### Current status

- **Database:** MySQL schema, seed data, and stored procedures for transactional purchases, stock control, and individual ticket generation. The SQL test script includes manual checks for purchase errors and stock contention.
- **Frontend:** The initial directory structure is in place. The application is planned around React, TypeScript, Vite, Tailwind CSS, and React Router.

### First frontend milestone

- [ ] Build the event detail page first and use it to set the visual direction on mobile and desktop.
- [ ] Build the event catalog and link each event to its detail page.
- [ ] Let the customer select a ticket type, batch, and quantity, see the total, and recognize a sold-out batch.

The milestone is complete when the full flow works with mock data. Screens will call simple data functions so the mocks can later be replaced by API requests. Checkout, sign-in, and the organizer dashboard come after this milestone.

### Development workflow

- **At work:** develop and test the frontend with mocks. The catalog and ticket selection flow should run without MySQL.
- **At home:** write and test SQL manually in MySQL Workbench. Later, connect one read-only flow first, such as the event detail page. The planned backend is a REST API using Node.js, TypeScript, Express, and MySQL.

---

<a id="portugues"></a>

## Português

O Ventry é uma plataforma de eventos e venda de ingressos em desenvolvimento. O projeto começou como um exercício de modelagem de banco de dados, transações e concorrência. O próximo passo é construir a experiência web do cliente.

### Estado atual

- **Banco de dados:** schema MySQL, dados de exemplo e procedures para compras com transação, controle de estoque e geração de ingressos individuais. O roteiro SQL inclui verificações manuais de erros de compra e disputa por estoque.
- **Frontend:** a estrutura inicial de pastas já existe. A aplicação está planejada com React, TypeScript, Vite, Tailwind CSS e React Router.

### Primeira entrega do frontend

- [ ] Montar primeiro a página de detalhe do evento e usá-la para definir a identidade visual no celular e no desktop.
- [ ] Montar o catálogo e ligar cada evento à sua página de detalhe.
- [ ] Permitir escolher tipo de ingresso, lote e quantidade, mostrar o total e sinalizar lote esgotado.

A entrega fica pronta quando o fluxo completo funciona com dados fictícios. As telas vão chamar funções simples de acesso a dados para que os mocks possam ser substituídos por chamadas à API. Checkout, login e painel do organizador ficam para depois dessa entrega.

### Divisão do trabalho

- **No trabalho:** desenvolver e testar o frontend com mocks. O catálogo e a seleção de ingresso devem rodar sem MySQL.
- **Em casa:** escrever e testar o SQL manualmente no MySQL Workbench. Mais adiante, integrar primeiro uma consulta, como o detalhe de um evento. A direção planejada para o backend é uma API REST com Node.js, TypeScript, Express e MySQL.

---

## Repository structure / Estrutura do repositório

```text
Ventry/
├── database/
│   ├── schema.sql
│   ├── procedure.sql
│   ├── seed.sql
│   └── tests.sql
├── frontend/src/
│   ├── app/
│   ├── features/
│   │   ├── checkout/
│   │   └── eventos/
│   └── shared/ui/
└── README.md
```
