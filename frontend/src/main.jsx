import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import Vercel Analytics
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics /> {/* Add this for Vercel Analytics */}
    <SpeedInsights />
  </StrictMode>,
)
