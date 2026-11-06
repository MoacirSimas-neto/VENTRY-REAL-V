import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { getPercurso, Localizacao } from './event-geography';
import 'leaflet/dist/leaflet.css';
import './geographic-map.css';

export type GeographicMapProps = {
  local?: Localizacao['coordenadas'];
  nome: string;
  percurso?: ReturnType<typeof getPercurso>;
};

const tileUrl = import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const atribuicao = import.meta.env.VITE_MAP_TILE_ATTRIBUTION;
const osm = new URL(tileUrl.replace('{s}', 'a'), 'https://tile.openstreetmap.org').hostname
  === 'tile.openstreetmap.org';

export function GeographicMap({ local, nome, percurso }: GeographicMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Carregando mapa…');

  useEffect(() => {
    if (!container.current || (!local && !percurso)) return;
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mapa = L.map(container.current, {
      zoomAnimation: !movimentoReduzido,
      fadeAnimation: !movimentoReduzido,
      markerZoomAnimation: !movimentoReduzido,
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      tapHold: false,
      dragging: !window.matchMedia('(pointer: coarse)').matches,
    });
    L.control.zoom({ zoomInTitle: 'Ampliar mapa', zoomOutTitle: 'Reduzir mapa' }).addTo(mapa);

    function marcador(posicao: L.LatLngExpression, rotulo: string, simbolo: string, cor: string) {
      const etiqueta = document.createElement('span');
      etiqueta.textContent = rotulo;
      L.marker(posicao, {
        alt: rotulo,
        title: rotulo,
        icon: L.divIcon({
          className: 'geographic-pin geographic-pin-' + cor,
          html: simbolo,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        }),
      }).addTo(mapa).bindTooltip(etiqueta);
    }

    if (percurso) {
      const pontos = percurso.geometry.coordinates.map(([lng, lat]) => L.latLng(lat, lng));
      L.polyline(pontos, { color: '#241642', weight: 8, interactive: false }).addTo(mapa);
      L.polyline(pontos, { color: '#a78bfa', weight: 4, interactive: false }).addTo(mapa);
      for (const [indice, ponto] of percurso.properties.pontos.entries()) {
        const [lng, lat] = ponto.coordenadas;
        marcador([lat, lng], ponto.nome, String(indice + 1), ponto.tipo === 'hidratacao' ? 'agua' : 'corrida');
      }
      mapa.fitBounds(L.latLngBounds(pontos), { padding: [24, 24], animate: false, maxZoom: 17 });
    } else if (local) {
      mapa.setView(local, 16);
      marcador(local, nome, '●', 'corrida');
    }

    const indisponivel = 'Mapa de ruas indisponível no momento.';
    const timeout = window.setTimeout(() => setStatus(indisponivel), 10000);
    let tilesCarregados = false;
    L.tileLayer(tileUrl)
      .on('tileload', () => {
        tilesCarregados = true;
        window.clearTimeout(timeout);
        setStatus('');
      })
      .on('load', () => {
        window.clearTimeout(timeout);
        if (!tilesCarregados) setStatus(indisponivel);
      })
      .addTo(mapa);
    const resize = new ResizeObserver(() => mapa.invalidateSize({ pan: false }));
    resize.observe(container.current);
    container.current.focus({ preventScroll: true });

    return () => {
      resize.disconnect();
      window.clearTimeout(timeout);
      mapa.remove();
    };
  }, [local, nome, percurso]);

  return (
    <div>
      <div ref={container} role="region" tabIndex={-1} aria-label={nome} className="geographic-map isolate h-72 w-full sm:h-88" />
      <div className="border-line flex flex-wrap justify-between gap-x-4 gap-y-1 border-t px-3 py-2 text-xs text-muted">
        <span role="status">{status}</span>
        {osm && <a className="underline" href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>}
        {atribuicao && <span>{atribuicao}</span>}
      </div>
    </div>
  );
}
