import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Link, Outlet, ScrollRestoration, useLocation } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { EventDetailsPage, eventDetailsLoader } from '../features/eventos/EventDetailsPage';
import { HomePage, homeLoader } from '../features/eventos/HomePage';
import { NotFound } from '../shared/ui/NotFound';
import './styles.css';

function Layout() {
  const { search } = useLocation();
  const inicio = { pathname: '/' };
  const catalogo = { ...inicio, search, hash: '#catalogo' };

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#conteudo" className="action sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-5 focus:z-10">
        Ir para o conteúdo
      </a>
      <header className="site-header border-b border-line bg-paper">
        <div className="site-shell flex items-center justify-between gap-3 py-2">
          <Link to={inicio} className="inline-flex min-h-11 items-center gap-2.5 text-xl font-black tracking-tight">
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-md bg-accent text-on-accent">V</span>
            Ventry
          </Link>
          <nav aria-label="Navegação principal">
            <Link to={catalogo} className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold hover:underline sm:px-3">
              Explorar
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18 18 6M8 6h10v10" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-line bg-surface">
        <div className="site-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-sm">
          <p><strong className="mr-2 text-ink">Ventry</strong><span className="text-muted">Agenda de eventos</span></p>
          <Link to={catalogo} className="inline-flex min-h-11 items-center font-semibold hover:underline">Explorar eventos</Link>
        </div>
      </footer>
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <HomePage />,
        hydrateFallbackElement: null,
        shouldRevalidate: ({ currentUrl, nextUrl, defaultShouldRevalidate }) =>
          currentUrl.pathname === nextUrl.pathname && currentUrl.search !== nextUrl.search
            ? false
            : defaultShouldRevalidate,
      },
      { path: 'eventos/:id', loader: eventDetailsLoader, element: <EventDetailsPage />, hydrateFallbackElement: null },
      { path: '*', element: <NotFound /> },
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
