import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    background-color: ${cores.rosa};
    color: ${cores.bege};
`

export const Foto = styled.img`
    width: 100%;
    height: 167px;
    display: block;
    padding-bottom: 8px;
`

export const Titulo = styled.h3`
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 900;
`

export const Descricao = styled.p`
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 22px;
`

export const BotaoAdicionar = styled.button`
    width: 100%;
    padding: 4px 0;
    border: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    background-color: ${cores.bege};
    color: ${cores.rosa};
`