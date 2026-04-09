import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import TableTopics from '../table-topics'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <TableTopics />
      <Analytics />
    </>
  </React.StrictMode>,
)
