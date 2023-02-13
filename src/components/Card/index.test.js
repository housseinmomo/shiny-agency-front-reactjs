import { fireEvent, render, screen } from '@testing-library/react'
import Card from '.'
import { ThemeProvider } from '../../utils/context'

//screen permet accéder aux sélecteurs afin de tester nos composants.

describe('Test Card Compenent', () => {
  it('Should render title and image', async () => {
    // permet de générer notre élément en simulant le comportement du navigateur.
    render(
      <ThemeProvider>
        <Card
          title="Harry Potter"
          label="Magicien frontend"
          picture="/myPicture.png"
        />
      </ThemeProvider>
    )

    //screen nous permet d'accéder aux sélecteurs afin de tester nos composants
    const cardPicture = screen.getByRole('img')
    const cardTitle = screen.getByText(/Harry/i)

    expect(cardPicture.src).toBe('http://localhost/myPicture.png')
    expect(cardTitle.textContent).toBe(' Harry Potter ')
  })
  test('Should add ⭐️ around title', async () => {
    render(
      <ThemeProvider>
        <Card
          title="Harry Potter"
          label="Magicien frontend"
          picture="/myPicture.png"
        />
      </ThemeProvider>
    )

    const cardTitle = screen.getByText(/Harry/i)
    // permettra d'accéder à la div  parente la plus proche
    const parentNode = cardTitle.closest('div')
    // fireEvent : permet de declencher des evenement
    fireEvent.click(parentNode)
    expect(cardTitle.textContent).toBe('⭐️ Harry Potter ⭐️')
  })
})
