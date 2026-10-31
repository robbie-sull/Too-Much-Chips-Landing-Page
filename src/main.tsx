import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const Flyer = lazy(() => import('./pages/Flyer'));
const isFlyer = window.location.pathname.replace(/\/+$/, '') === (import.meta.env.BASE_URL + 'flyer').replace(/\/+$/, '');

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    {isFlyer ? <Suspense fallback={<p role="status">Loading flyer…</p>}><Flyer /></Suspense> : <App />}
  </ErrorBoundary>,
);
