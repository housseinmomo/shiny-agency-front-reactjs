import { useContext } from 'react'
import { createGlobalStyle } from 'styled-components'
import { ThemeContext } from '../context/'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
 
    body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? 'black' : 'white'};
        margin: 0;  
        color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
    }
`

function GlobalStyle() {
  // on recupere le theme depuis de le contexte
  // car GlobalStyle se trouve a l'interieur du composant Provider (ThemeProvider)
  const { theme } = useContext(ThemeContext)
  console.log(theme)
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
