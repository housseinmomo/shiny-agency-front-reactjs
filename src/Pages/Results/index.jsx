import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useFetch } from '../../utils/hooks'
import { StyledLink, Loader } from '../../utils/style/atoms'
import { ThemeContext } from '../../utils/context'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

// tant qu'on est pas arriver au dernier titre, on met ',' a chaque fois
export function formatJobList(title, listLength, index) {
  if (index === listLength - 1) {
    return title
  }
  return `${title},`
}
// 'item2', 3, 1
// item2,

// mise en forme du body de notre fetch (answers users) que l'on souhaite envoyer
export function formatQueryParams(answers) {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0
    const separator = isFirstParam ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

/**
 * {1:true, 2:false....}
 * ['',&]a1:[1,0]
 * previousParams va concatener les anciens return a chaque iteration
 */

function Results() {
  const { theme } = useContext(ThemeContext)
  const { answers } = useContext(SurveyContext)
  const fetchParams = formatQueryParams(answers)

  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/results?${fetchParams}`
  )

  console.log('=== DATA ===', answers)

  if (error) {
    return (
      <h3 style={{ textAlign: 'center', margin: '25px' }}>
        Oups il y a eu un problème
      </h3>
    )
  }

  const resultsData = data?.resultsData

  return isLoading ? (
    <LoaderWrapper>
      <Loader theme={theme} data-testid="loader" />
    </LoaderWrapper>
  ) : (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        Les compétences dont vous avez besoin :
        {resultsData &&
          resultsData.map((result, index) => (
            <JobTitle
              key={`result-title-${index}-${result.title}`}
              theme={theme}
            >
              {formatJobList(result.title, resultsData.length, index)}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink $isFullLink to="/freelances">
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result, index) => (
            <JobDescription
              theme={theme}
              key={`result-detail-${index}-${result.title}`}
            >
              <JobTitle theme={theme} data-testid="job-title">
                {result.title}
              </JobTitle>
              <p data-testid="job-description">{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  )
}

export default Results
