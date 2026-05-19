import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { RootReducer } from '../../store'
import { limpar } from '../../store/reducers/cart'
import { useFinalizarPedidoMutation } from '../../services/api'

import Button from '../Button'
import Loader from '../Loader'
import { parseToBrl } from '../utils/formatters'

import {
    ContainerFormulario,
    Row,
    MensagemErro
} from '../Cart/styles'

type Props = {
    voltarParaCarrinho: () => void
    fecharCarrinho: () => void
}

const Checkout = ({ voltarParaCarrinho, fecharCarrinho }: Props) => {
    const dispatch = useDispatch()
    const { items } = useSelector((state: RootReducer) => state.cart)

    const [finalizarPedido, { data, isLoading, isSuccess }] =
        useFinalizarPedidoMutation()

    const [etapaAtual, setEtapaAtual] = useState<
        'entrega' | 'pagamento' | 'confirmacao'
    >('entrega')

    const [carregando, setCarregando] = useState(false)

    const getValorTotal = () => {
        return items.reduce((acumulador, item) => acumulador + item.preco, 0)
    }

    const form = useFormik({
        initialValues: {
            destinatario: '',
            endereco: '',
            cidade: '',
            cep: '',
            numero: '',
            complemento: '',
            nomeCartao: '',
            numeroCartao: '',
            cvv: '',
            mesVencimento: '',
            anoVencimento: ''
        },
        validationSchema: Yup.object({
            destinatario: Yup.string()
                .min(3, 'O nome precisa ter pelo menos 3 caracteres')
                .required('Campo obrigatório'),
            endereco: Yup.string()
            .min(5, 'O endereço precisa ter pelo menos 5 caracteres')
            .matches(
                /^[A-Za-zÀ-ÿ0-9\s.,-]+$/,
                'Endereço inválido'
            )
            .required('Campo obrigatório'),
            cidade: Yup.string()
            .min(3, 'A cidade precisa ter pelo menos 3 caracteres')
            .required('Campo obrigatório'),
            cep: Yup.string()
                .matches(/^\d{5}-?\d{3}$/, 'CEP inválido')
                .required('Campo obrigatório'),
            numero: Yup.string()
                .matches(/^\d+$/, 'Digite apenas números')
                .required('Campo obrigatório'),
            complemento: Yup.string(),
            nomeCartao: Yup.string()
                .min(3, 'O nome precisa ter pelo menos 3 caracteres')
                .required('Campo obrigatório'),
            numeroCartao: Yup.string()
                .transform((value) => value.replace(/\s/g, ''))
                .matches(/^\d+$/, 'Digite apenas números')
                .min(16, 'O campo precisa ter pelo menos 16 Numeros')
                .max(16, 'O campo precisa ter no máximo 16 Numeros')
                .required('O campo é obrigatorio'),
            cvv: Yup.string()
                .matches(/^\d+$/, 'Digite apenas números')
                .min(3, 'O campo precisa ter pelo menos 3 números')
                .max(4, 'O campo precisa ter no máximo 4 números')
                .required('O campo é obrigatorio'),
            mesVencimento: Yup.string()
                .matches(/^(0[1-9]|1[0-2])$/, 'Mês inválido')
                .required('O campo é obrigatório'),
            anoVencimento: Yup.string()
                .matches(/^\d{2}$/, 'Ano inválido')
                .required('Campo obrigatório')
        }),
        onSubmit: (values) => {
            finalizarPedido({
                products: items.map((item) => ({
                    id: item.id,
                    price: item.preco
                })),
                delivery: {
                    receiver: values.destinatario,
                    address: {
                        description: values.endereco,
                        city: values.cidade,
                        zipCode: values.cep,
                        number: Number(values.numero),
                        complement: values.complemento
                    }
                },
                payment: {
                    card: {
                        name: values.nomeCartao,
                        number: values.numeroCartao.replace(/\s/g, ''),
                        code: Number(values.cvv),
                        expires: {
                            month: Number(values.mesVencimento),
                            year: Number(values.anoVencimento)
                        }
                    }
                }
            })
        }
    })

    const campoTemErro = (nomeCampo: string) => {
        const campoFoiTocado = nomeCampo in form.touched
        const campoEstaInvalido = nomeCampo in form.errors

        return campoFoiTocado && campoEstaInvalido
    }

    const irParaPagamento = async () => {
        setCarregando(true)

        const erros = await form.validateForm()

        const camposEntrega = [
            'destinatario',
            'endereco',
            'cidade',
            'cep',
            'numero'
        ]
        const temErroNaEntrega = camposEntrega.some(
            (campo) => campo in erros
        )
        if (temErroNaEntrega) {
            form.setTouched({
                destinatario: true,
                endereco: true,
                cidade: true,
                cep: true,
                numero: true
            })
            setCarregando(false)
            return
        }
        setTimeout(() => {
            setEtapaAtual('pagamento')
            setCarregando(false)
        }, 500)
    }

    const finalizarPagamento = async () => {
        setCarregando(true)

        const erros = await form.validateForm()
        if (Object.keys(erros).length > 0) {
            form.setTouched({
                destinatario: true,
                endereco: true,
                cidade: true,
                cep: true,
                numero: true,
                nomeCartao: true,
                numeroCartao: true,
                cvv: true,
                mesVencimento: true,
                anoVencimento: true
            })
            setCarregando(false)
            return
        }
        form.handleSubmit()
    }

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(limpar())
            setCarregando(false)
            setEtapaAtual('confirmacao')
        }
    }, [isSuccess, data, dispatch])

    return (
        <>
            {etapaAtual === 'entrega' && (
                <ContainerFormulario>
                    <h2>Entrega</h2>
                    <label htmlFor="destinatario">Quem irá receber</label>
                    <input
                        id="destinatario"
                        name="destinatario"
                        type="text"
                        value={form.values.destinatario}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={campoTemErro('destinatario') ? 'erro' : ''}
                    />
                    {campoTemErro('destinatario') && (
                        <MensagemErro>
                            {form.errors.destinatario}
                        </MensagemErro>
                    )}
                    <label htmlFor="endereco">Endereço</label>
                    <input
                        id="endereco"
                        name="endereco"
                        type="text"
                        value={form.values.endereco}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={campoTemErro('endereco') ? 'erro' : ''}
                    />
                    {campoTemErro('endereco') && (
                        <MensagemErro>{form.errors.endereco}</MensagemErro>
                    )}
                    <label htmlFor="cidade">Cidade</label>
                    <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        value={form.values.cidade}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={campoTemErro('cidade') ? 'erro' : ''}
                    />
                    {campoTemErro('cidade') && (
                        <MensagemErro>{form.errors.cidade}</MensagemErro>
                    )}
                    <Row>
                        <div>
                            <label htmlFor="cep">CEP</label>
                            <input
                                id="cep"
                                name="cep"
                                type="text"
                                inputMode="numeric"
                                maxLength={9}
                                placeholder="00000-000"
                                autoComplete="postal-code"
                                value={form.values.cep}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={campoTemErro('cep') ? 'erro' : ''}
                            />
                            {campoTemErro('cep') && (
                                <MensagemErro>{form.errors.cep}</MensagemErro>
                            )}
                        </div>
                        <div>
                            <label htmlFor="numero">Número</label>
                            <input
                                id="numero"
                                name="numero"
                                type="text"
                                inputMode="numeric"
                                value={form.values.numero}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={
                                    campoTemErro('numero') ? 'erro' : ''
                                }
                            />
                            {campoTemErro('numero') && (
                                <MensagemErro>
                                    {form.errors.numero}
                                </MensagemErro>
                            )}
                        </div>
                    </Row>
                    <label htmlFor="complemento">Complemento (opcional)</label>
                    <input
                        id="complemento"
                        name="complemento"
                        type="text"
                        value={form.values.complemento}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                    />
                    <Button
                        type="button"
                        title="Continuar com o pagamento"
                        variant="secondary"
                        onClick={irParaPagamento}
                    >
                        Continuar com o pagamento
                    </Button>
                    <Button
                        type="button"
                        title="Voltar para o carrinho"
                        variant="secondary"
                        onClick={voltarParaCarrinho}
                    >
                        Voltar para o carrinho
                    </Button>
                </ContainerFormulario>
            )}
            {etapaAtual === 'pagamento' && (
                <ContainerFormulario>
                    <h2>
                        Pagamento - Valor a pagar{' '}
                        {parseToBrl(getValorTotal())}
                    </h2> 
                    <label htmlFor="nomeCartao">Nome no cartão</label>
                    <input
                        id="nomeCartao"
                        name="nomeCartao"
                        type="text"
                        autoComplete="cc-name"
                        value={form.values.nomeCartao}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={campoTemErro('nomeCartao') ? 'erro' : ''}
                    />
                    {campoTemErro('nomeCartao') && (
                        <MensagemErro>{form.errors.nomeCartao}</MensagemErro>
                    )}
                    <Row>
                        <div>
                            <label htmlFor="numeroCartao">
                                Número do cartão
                            </label>
                            <input
                                id="numeroCartao"
                                name="numeroCartao"
                                type="text"
                                inputMode="numeric"
                                maxLength={19}
                                placeholder="0000 0000 0000 0000"
                                autoComplete="cc-number"
                                value={form.values.numeroCartao}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={
                                    campoTemErro('numeroCartao') ? 'erro' : ''
                                }
                            />
                            {campoTemErro('numeroCartao') && (
                                <MensagemErro>
                                    {form.errors.numeroCartao}
                                </MensagemErro>
                            )}
                        </div>
                        <div>
                            <label htmlFor="cvv">CVV</label>
                            <input
                                id="cvv"
                                name="cvv"
                                type="text"
                                inputMode="numeric"
                                maxLength={3}
                                placeholder="000"
                                autoComplete="cc-csc"
                                value={form.values.cvv}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={campoTemErro('cvv') ? 'erro' : ''}
                            />
                            {campoTemErro('cvv') && (
                                <MensagemErro>{form.errors.cvv}</MensagemErro>
                            )}
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <label htmlFor="mesVencimento">
                                Mês de vencimento
                            </label>
                            <input
                                id="mesVencimento"
                                name="mesVencimento"
                                type="text"
                                inputMode="numeric"
                                maxLength={2}
                                placeholder="MM"
                                autoComplete="cc-exp-month"
                                value={form.values.mesVencimento}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={
                                    campoTemErro('mesVencimento') ? 'erro' : ''
                                }
                            />
                            {campoTemErro('mesVencimento') && (
                                <MensagemErro>
                                    {form.errors.mesVencimento}
                                </MensagemErro>
                            )}
                        </div>
                        <div>
                            <label htmlFor="anoVencimento">
                                Ano de vencimento
                            </label>
                            <input
                                id="anoVencimento"
                                name="anoVencimento"
                                type="text"
                                inputMode="numeric"
                                maxLength={2}
                                placeholder="AA"
                                autoComplete="cc-exp-year"
                                value={form.values.anoVencimento}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={
                                    campoTemErro('anoVencimento') ? 'erro' : ''
                                }
                            />
                            {campoTemErro('anoVencimento') && (
                                <MensagemErro>
                                    {form.errors.anoVencimento}
                                </MensagemErro>
                            )}
                        </div>
                    </Row>
                    <Button
                        type="button"
                        title="Finalizar pagamento"
                        variant="secondary"
                        onClick={finalizarPagamento}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Finalizando pagamento...'
                            : 'Finalizar pagamento'}
                    </Button>
                    {(isLoading || carregando) && <Loader />}
                    <Button
                        type="button"
                        title="Voltar para a edição de endereço"
                        variant="secondary"
                        onClick={() => setEtapaAtual('entrega')}
                    >
                        Voltar para a edição de endereço
                    </Button>
                </ContainerFormulario>
            )}
            {etapaAtual === 'confirmacao' && data && (
                <ContainerFormulario>
                    <h2>Pedido realizado - {data.orderId}</h2>
                    <p>
                        Estamos felizes em informar que seu pedido já está em
                        processo de preparação e, em breve, será entregue no
                        endereço fornecido.
                    </p>
                    <p>
                        Gostaríamos de ressaltar que nossos entregadores não
                        estão autorizados a realizar cobranças extras.
                    </p>
                    <p>
                        Lembre-se da importância de higienizar as mãos após o
                        recebimento do pedido, garantindo assim sua segurança e
                        bem-estar durante a refeição.
                    </p>
                    <p>
                        Esperamos que desfrute de uma deliciosa e agradável
                        experiência gastronômica. Bom apetite!
                    </p>
                    <Button
                        type="button"
                        title="Concluir"
                        variant="secondary"
                        onClick={fecharCarrinho}
                    >
                        Concluir
                    </Button>
                </ContainerFormulario>
            )}
        </>
    )
}

export default Checkout