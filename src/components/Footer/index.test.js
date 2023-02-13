import Footer from '.'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Footer', () => {
  it('should render without crash', async () => {
    render(
      // Il faut savoir que notre Footer a besoin d'un context {theme}, c'est pour cela qu'on a utiliser  ThemeProvider
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
  })
  it('Change theme', async () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )

    // screen : est en quelque sorte le body  qui contient notre composant, à partir duquel on va pouvoir utiliser nos sélecteurs.
    // getByRole: Ce sélecteur peut dans beaucoup de cas vous permettre d'accéder à votre élément
    const nightModeButton = screen.getByRole('button')

    // step 1 :Vérifier la présence de "☀️".
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')

    // step 2: cliquer sur le button
    fireEvent.click(nightModeButton) // fireEvent  qui va nous permettre de déclencher des événements du DOM

    // step 3: Vérifier s'il y a bien "🌙".
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
  })
})
