import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profil.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

// CSS in JS : Style Componens
const CardLabel = styled.span`
  color: #5843e4;
  font-size: 22px;
  font-weight: bold;
`

const CardImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 350px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

function Card({ label, title, picture }) {
  return (
    <CardWrapper>
      <CardLabel>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <span>{title}</span>
    </CardWrapper>
  )
}

// On predefinie les types de proprietes de nos composant (Card)
// Sécuriser notre composant  Card  à l'aide des propTypes
// Cela va nous declencher des erreur en cas de non-respect des types des props
Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
}

// définir une prop par défaut.
Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
}

export default Card
