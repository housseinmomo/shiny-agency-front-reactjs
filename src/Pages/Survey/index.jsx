import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Results from '../Results'

function Survey() {
  // c'est un hook mis a disposition par react-router
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1

  return (
    <div className="sa-survey-header">
      <h1>Questionnaire 🧮</h1>
      <h2>Question {questionNumber}</h2>
      <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
      {questionNumberInt === 10 ? (
        <Results />
      ) : (
        <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
      )}
    </div>
  )
}

export default Survey
