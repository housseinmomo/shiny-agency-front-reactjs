import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'

function Results() {
  const { answers } = useContext(SurveyContext)
  console.log('Depuis la page Result : ', answers)

  return (
    <div>
      <h1>Resultat</h1>
    </div>
  )
}

export default Results
