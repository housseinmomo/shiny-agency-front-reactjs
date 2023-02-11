import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './Pages/Home'
import Survey from './Pages/Survey'
import Error from './components/Error'
import Results from './Pages/Results'
import Freelances from './Pages/Freelances'
import { ThemeProvider } from './utils/context'
import Footer from './components/Footer'
import GlobalStyle from './utils/style/GlobalStyle'
import { SurveyProvider } from './utils/context'

// const GlobalStyle = createGlobalStyle`
//     div {
//         font-family: 'Trebuchet MS', Helvetica, sans-serif;
//     }
// `

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/*Il doit être placé à la racine de notre arborescence de composants, et va permettre d'englober toutes les routes
        que nous allons définir. */}
    <Router>
      {/** Ce composant est notre composant Provider qui aura pour objectif d'englober l'ensemble de notre app */}
      {/** Et il nous permet egalement d'acceder au datas depuis n'importe quel composant se trouvant a l'interieur de ce dernier (children) */}
      <ThemeProvider>
        <SurveyProvider>
          {/* Ce style va s'appliquer a l'ensemble de nos composant ci-dessous. On créer un style global avec  createGlobalStyle */}
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
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)
