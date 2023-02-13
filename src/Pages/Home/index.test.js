import { sum } from '.'
import { Screen, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../../utils/context'
import Home from '.'

describe('Home component test', () => {
  it('Test de la fonction sum()', () => {
    const result = sum(4, 6)
    console.log(result)
    expect(result).toBe(10)
  })

  it('test 02', () => {
    expect(10).toBe(10)
  })

  it('should render title', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )

    // cela nous permet d'afficher l'ensemble du composant
    // screen.debug()
    const expectedValue = screen.getByText(
      'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents'
    )
    expect(expectedValue).toBeTruthy()
  })
})
