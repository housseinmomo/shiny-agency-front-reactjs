import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './Pages/Home'
import Survey from './Pages/Survey'
import Error from './components/Error'
import Results from './Pages/Results'
import Freelances from './Pages/Freelances'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/*Il doit être placé à la racine de notre arborescence de composants, et va permettre d'englober toutes les routes
        que nous allons définir. */}
    <Router>
      {/* Ce style va s'appliquer a l'ensemble de nos composant ci-dessous
          On créer un style global avec  createGlobalStyle */}
      <GlobalStyle />
      {/*On considère ici que notre  Header  fait partie du  Layout  (agencement) de notre application*/}
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/survey/:questionNumber" element={<Survey />} />
        <Route path="/results/" element={<Results />} />
        <Route path="/freelances" element={<Freelances />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
