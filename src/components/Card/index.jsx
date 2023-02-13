import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profil.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useTheme } from '../../utils/hooks'
import { useState } from 'react'

// CSS in JS : Style Componens
const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`

function Card({ label, title, picture }) {
  const { theme } = useTheme()
  const [isFavorite, setIsFavorite] = useState(false)
  const star = isFavorite ? '⭐️' : ''

  return (
    <CardWrapper theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle theme={theme}>
        {star} {title} {star}
      </CardTitle>
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
