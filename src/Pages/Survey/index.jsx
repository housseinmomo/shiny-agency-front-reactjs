import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/atoms'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

// Style Compoenent : CSS in JS
const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [surveyData, setSurveyData] = useState({})
  const [isDataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)

  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  // Comme la fonction passée à useEffect ne peut pas être asynchrone,
  // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
  // Essayez de commenter le code créé dans le chapitre et de décommenter fetchData pour voir.

  // async function fetchData() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/survey`)
  //     const { surveyData } = await response.json()
  //     setSurveyData(surveyData)
  //   } catch (error) {
  // console.log('===== error =====', error)
  // setError(true)
  //   }
  // }

  //   useEffect(() => {
  //     // fetchData()
  //     setDataLoading(true)
  //     fetch(`http://localhost:8000/survey`).then((response) =>
  //       response
  //         .json()
  //         .then(({ surveyData }) => {
  //           setSurveyData(surveyData)
  //           setDataLoading(false)
  //         })
  //         .catch((error) => console(error))
  //     )
  //   }, [])

  // on ne peux pas utiliser une fonction async dans un useEffect
  useEffect(() => {
    async function fecthSurvey() {
      setDataLoading(true)
      try {
        // on utilise await quand le type de retour est une promesse
        const response = await fetch(`http://localhost:8000/surveys`)
        const { surveyData } = await response.json()
        setSurveyData(surveyData)
      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }

    fecthSurvey()
  }, [])

  if (error) {
    return (
      <h3 style={{ textAlign: 'center', margin: '25px' }}>
        Oups il y a eu un problème
      </h3>
    )
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey
