import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import TableTopics from '../table-topics'
import { initGoogleAnalytics } from './analytics'

initGoogleAnalytics()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <TableTopics />
      <Analytics />
    </>
  </React.StrictMode>,
)
