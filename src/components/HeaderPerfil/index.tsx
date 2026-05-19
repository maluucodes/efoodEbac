import { HeaderContainer } from './styles'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import type { RootReducer } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { open } from '../../store/reducers/cart'

const HeaderPerfil = () => {
    const { items } = useSelector((state: RootReducer) => state.cart)
    const dispatch = useDispatch()
    const openCart = () => {
        dispatch(open())
    }
    return (
        <HeaderContainer>
            <div className="container">
                <Link to="/" title="voltar para os restaurantes">
                    Restaurantes
                </Link>
                <Link to="/">
                    <img src={Logo} alt="logo" style={{ cursor: 'pointer' }} />
                </Link>
                <span onClick={openCart} style={{ cursor: 'pointer' }}>
                    {items.length} produto(s) no carrinho
                </span>
            </div>
        </HeaderContainer>
    )
}

export default HeaderPerfil