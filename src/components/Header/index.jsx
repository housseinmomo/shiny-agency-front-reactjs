import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DarkLogo from '../../assets/dark-logo.png'
import { StyledLink } from '../../utils/style/atoms'

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const HomeLogo = styled.img`
  height: 70px;
`

function Header() {
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={DarkLogo} />
      </Link>
      <StyledLink to="/">Accueil</StyledLink>
      <StyledLink to="/freelances">Freelances</StyledLink>
      <StyledLink to="/survey/1" $isFullLink>
        Faire le test
      </StyledLink>
    </NavContainer>
  )
}

export default Header
