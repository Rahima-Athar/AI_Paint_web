'use client';

import { useEffect, useRef } from 'react';
import { WALLORA_BODY_HTML } from './walloraMarkup';

const CDN_SCRIPTS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
];

const APP_SCRIPTS = [
  '/supabase-config.local.js',
  '/legacy/supabase-client.js',
  '/legacy/script.js',
];

function loadScript(src) {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[data-legacy-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.legacySrc = src;
    script.onload = () => resolve();
    // Optional scripts (e.g. local Supabase config) may be absent.
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

export default function WalloraLegacyApp() {
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    // Bridge Next.js public env vars to the legacy global config.
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      window.__WALLORA_SUPABASE_URL__ = process.env.NEXT_PUBLIC_SUPABASE_URL;
    }
    if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      window.__WALLORA_SUPABASE_ANON__ = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    }

    (async () => {
      // CDN libraries must exist before the legacy engine boots.
      for (const src of CDN_SCRIPTS) {
        await loadScript(src);
      }
      for (const src of APP_SCRIPTS) {
        await loadScript(src);
      }
    })();
  }, []);

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: WALLORA_BODY_HTML }}
    />
  );
}
