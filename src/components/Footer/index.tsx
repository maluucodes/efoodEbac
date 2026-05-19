import logo from '../../assets/images/logo.png'
import instagram from '../../assets/images/icons/instagram.png'
import facebook from '../../assets/images/icons/facebook.png'
import twitter from '../../assets/images/icons/twitter.png'

import {
    Centralizador,
    Copyright,
    FooterContainer,
    Logo,
    SocialLinks
} from './styles'

const Footer = () => {
    return (
        <FooterContainer>
        <Centralizador className="container">
            <Logo src={logo} alt="logo" />
            <SocialLinks>
                <li>
                    <a href="#" title='clique aqui para conhecer nosso insta!'>
                        <img src={instagram} alt="instagram-logo" />
                    </a>
                </li>
                <li>
                    <a href="#" title='clique aqui para conhecer nosso facebook!'>
                        <img src={facebook} alt="facebook-logo" />
                    </a>
                </li>
                <li>
                    <a href="#" title='clique aqui para conhecer nosso twitter!'>
                        <img src={twitter} alt="twitter-logo" />
                    </a>
                </li>
            </SocialLinks>
            <Copyright>
                A efood é uma plataforma para divulgação de estabelecimentos, a
                responsabilidade pela entrega, qualidade dos produtos é toda do
                estabelecimento contratado.
            </Copyright>
        </Centralizador>
        </FooterContainer>
    )
}

export default Footer