import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Link, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { EventDetailsPage, eventDetailsLoader } from '../features/eventos/EventDetailsPage';
import './styles.css';

function Layout() {
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-black tracking-tight">
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-md bg-accent text-ink">V</span>
            Ventry
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <p className="text-sm font-bold tracking-widest text-muted uppercase">Evento em destaque</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Floripa Tech Summit</h1>
      <Link to="/eventos/1" className="action mt-6">Ver detalhes do evento <span aria-hidden="true">→</span></Link>
    </main>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'eventos/:id', loader: eventDetailsLoader, element: <EventDetailsPage />, hydrateFallbackElement: null },
      {
        path: '*',
        element: (
          <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <h1 className="text-3xl font-black">Página não encontrada</h1>
            <Link to="/" className="mt-4 inline-block underline">Voltar ao início</Link>
          </main>
        ),
      },
    ],
  },
]);

const root = document.getElementById('root');
if (!root) throw new Error('Missing root element');

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
