import React from 'react'
import ReactDOM from 'react-dom/client'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import './styles/index.css'
import App from './App'

if (typeof window !== 'undefined') {
  document.documentElement.classList.add('dark')
  window.Prism = Prism
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />,
)
