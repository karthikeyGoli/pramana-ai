import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import * as Sentry from '@sentry/react'
import App from './App'
import { initObservability } from './lib/observability'
import './index.css'

initObservability()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={<div>Pramana AI could not load this view.</div>}>
        <App />
      </Sentry.ErrorBoundary>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>,
)
