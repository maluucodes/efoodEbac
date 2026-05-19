import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'

import Button from '../Button'
import Checkout from '../Checkout'
import { parseToBrl } from '../utils/formatters'

import {
    CartContainer,
    Overlay,
    SideBar,
    CartItem,
    Price,
    CartCloseButton,
    EmptyCart
} from './styles'

const Cart = () => {
    const dispatch = useDispatch()
    const { items, isOpen } = useSelector((state: RootReducer) => state.cart)

    const [etapaAtual, setEtapaAtual] = useState<'carrinho' | 'checkout'>(
        'carrinho'
    )

    const fecharCarrinho = () => {
        dispatch(close())
        setEtapaAtual('carrinho')
    }

    const removerItem = (id: number) => {
        dispatch(remove(id))
    }

    const getValorTotal = () => {
        return items.reduce((acumulador, item) => acumulador + item.preco, 0)
    }

    return (
        <CartContainer className={isOpen ? 'is-open' : ''}>
            <Overlay onClick={fecharCarrinho} />
            <SideBar>
                <div className="close-button">
                    <CartCloseButton onClick={fecharCarrinho} />
                </div>
                {etapaAtual === 'carrinho' && (
                    <>
                        {items.length === 0 ? (
                            <EmptyCart>
                                <h3>Seu carrinho está vazio</h3>
                                <p>
                                    Adicione pelo menos um produto para continuar
                                    com o pedido.
                                </p>
                            </EmptyCart>
                        ) : (
                            <>
                                <ul>
                                    {items.map((item) => (
                                        <CartItem key={item.id}>
                                            <button
                                                onClick={() =>
                                                    removerItem(item.id)
                                                }
                                                type="button"
                                            ></button>
                                            <img
                                                src={item.foto}
                                                alt={item.nome}
                                            />
                                            <div>
                                                <h3>{item.nome}</h3>
                                                <p>
                                                    {parseToBrl(item.preco)}
                                                </p>
                                            </div>
                                        </CartItem>
                                    ))}
                                </ul>
                                <Price>
                                    <p>Valor total</p>
                                    <p>{parseToBrl(getValorTotal())}</p>
                                </Price>
                                <Button
                                    type="button"
                                    title="Continuar com a entrega"
                                    variant="secondary"
                                    onClick={() => setEtapaAtual('checkout')}
                                >
                                    Continuar com a entrega
                                </Button>
                            </>
                        )}
                    </>
                )}
                {etapaAtual === 'checkout' && (
                    <Checkout
                        voltarParaCarrinho={() => setEtapaAtual('carrinho')}
                        fecharCarrinho={fecharCarrinho}
                    />
                )}
            </SideBar>
        </CartContainer>
    )
}

export default Cart