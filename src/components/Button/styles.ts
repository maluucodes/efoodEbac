import styled, { css } from 'styled-components'
import { colors } from '../../styles'
import { Link } from 'react-router-dom'

type Props = {
    variant?: 'primary' | 'secondary'
}

const BaseStyles = css<Props>`
    font-size: 14px;
    font-weight: 700;
    padding: 4px 6px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;

    /* Lógica de inversão de colors */
    background-color: ${(props) =>
        props.variant === 'primary' ? colors.pink : colors.beige};

    color: ${(props) =>
        props.variant === 'primary' ? colors.beige : colors.pink};

    border: 1px solid ${colors.pink};
    `

    export const ButtonContainer = styled.button<Props>`
    ${BaseStyles}
    `

    export const ButtonLink = styled(Link)<Props>`
    ${BaseStyles}
`