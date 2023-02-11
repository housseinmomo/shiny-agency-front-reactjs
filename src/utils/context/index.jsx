import { createContext, useState } from 'react'

// on initialise le contexte pour le theme
export const ThemeContext = createContext()

// c'est notre composant parent qui va englober l'ensemble de nos sous-composant
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    //L'ensemble des composant de notre app seront a l'interieur de ce dernier (Provider)
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/** Represente l'ensemble des elements ou composants se trouvant a l'interie */}
      {children}
    </ThemeContext.Provider>
  )
}

// on initialise le contexte
export const SurveyContext = createContext()

// c'est notre composant parent qui va englober l'ensemble de nos sous-composant
export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({})
  const saveAnswers = (newAnswers) => {
    // ajout de la nouvelle reponse dans notre tableau qui est un etat local
    setAnswers({ ...answers, ...newAnswers })
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}
