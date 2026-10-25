import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
// Base styles first: component CSS (imported via App) must come after them,
// so a component's own rules can override shared ones like .btn.
import './styles/tokens.css'
import './styles/base.css'
import App from './App.jsx'

// HashRouter (URLs like /#/sos) because GitHub Pages can't redirect unknown paths
// to index.html — with normal URLs, refreshing on /sos would show a 404.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
