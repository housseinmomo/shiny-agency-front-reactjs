import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import Results, { formatJobList } from '.'
import { formatQueryParams } from '.'
import { render } from '../../utils/test'

describe('The formatJobList function', () => {
  it('should add a comma to a word', () => {
    const expectedValue = 'item2,'
    expect(formatJobList('item2', 3, 1)).toEqual(expectedValue)
    // toEqual est un match
  })

  it('should not add a comma to the last element of the list', () => {
    const expectedValue = 'item3'
    expect(formatJobList('item3', 3, 2)).toEqual(expectedValue)
  })
})

describe('The formatQueryParams function', () => {
  it('should concatenate params with an &', () => {
    const expectedValue = 'a1=true&a2=false&a3=true'
    expect(formatQueryParams({ 1: true, 2: false, 3: true })).toEqual(
      expectedValue
    )
  })

  it('should use the right format for param', () => {
    const expectedValue = 'a1=true'
    expect(formatQueryParams({ 1: true })).toEqual(expectedValue)
  })
})

// par defaut, JEST est en mode watch, pour quitter : q * Ctr C

const resultsMockedData = [
  {
    title: 'seo',
    description: `Le SEO est en charge du référencement web d'une page`,
  },
  {
    title: 'frontend',
    description: `Le développeur ou la développeuse frontend se charge de l'interface : interactions avec l'utilisateur, style, etc.`,
  },
]

// c'est notre serveur de test
const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/results', (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ resultsData: resultsMockedData }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('The Results component', () => {
  test('should display the results after the data is loaded', async () => {
    render(<Results />)

    // on verifie si le loader apparait bien
    // expect(screen.getByTestId('loader')).toBeTruthy()
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    //On recupere l'element avec l'id : job-title
    const jobTitleElements = screen.getAllByTestId('job-title')

    // on verifie que le premier titre est : seo
    expect(jobTitleElements[0].textContent).toBe('seo')
    // on verifie si la taille des result = 2
    expect(jobTitleElements.length).toBe(2)

    // on recupere les descritptions qui on l'id : job-description
    const jobDescriptionElements = screen.getAllByTestId('job-description')

    // on verifie la correspondance des resultats entre ce qui est afficher et le tableau des datas mockees
    expect(jobDescriptionElements[1].textContent).toBe(
      resultsMockedData[1].description
    )
    // on verifie egalement le nombre de description afficher
    expect(jobDescriptionElements.length).toBe(2)
  })
})
