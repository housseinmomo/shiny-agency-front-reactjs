import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import Freelances from './'
import { ThemeProvider } from '../../utils/context'
import { render } from '../../utils/test'

// Les donnees simulees
const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]

// c'est notre serveur de test
const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

test('Should render without crash', async () => {
  render(<Freelances />)

  // on verifie si le loader apparait bien
  // expect(screen.getByTestId('loader')).toBeTruthy()
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

  // waitFor : Cette méthode permet de gérer du code asynchrone, comme pour un call API, par exemple.
  // Ici, on verifie  si les datas mockées renvoyer par le serveur se sont bien afficher
  await waitFor(() => {
    expect(screen.getByText('Harry Potter')).toBeTruthy()
    expect(screen.getByText('Hermione Granger')).toBeTruthy()
  })
})
