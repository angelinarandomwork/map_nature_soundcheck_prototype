import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router'
import { AppRouter } from './app/AppRouter'
import './styles/styles.css'
import './app/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </React.StrictMode>,
)