import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/atoms'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

// Style Compoenent : CSS in JS
const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? 'black' : 'darkblue')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1

  // On recupere les reponse saisie par l'utilisateur depuis le contexte
  const { answers, saveAnswers } = useContext(SurveyContext)
  console.log(answers)

  // On recupere l'ensemble des questions du formulaire
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data

  const { theme } = useTheme()

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
  //   useEffect(() => {
  //     async function fecthSurvey() {
  //       setDataLoading(true)
  //       try {
  //         // on utilise await quand le type de retour est une promesse
  //         const response = await fetch(`http://localhost:8000/survey`)
  //         const { surveyData } = await response.json()
  //         setSurveyData(surveyData)
  //       } catch (error) {
  //         console.log(error)
  //         setError(true)
  //       } finally {
  //         setDataLoading(false)
  //       }
  //     }

  //     fecthSurvey()
  //   }, [])

  if (error) {
    return (
      <h3 style={{ textAlign: 'center', margin: '25px' }}>
        Oups il y a eu un problème
      </h3>
    )
  }

  // cette fonction a pour objectif d'enregistrer les reponses de l'utilisateur
  // answer : true - false [1: true]
  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }
  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>
          {surveyData[questionNumber]}
        </QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey
