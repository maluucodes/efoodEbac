import styled from 'styled-components'
import { colors } from '../../styles'

interface BannerProps {
    foto: string
}

export const Image = styled.div<BannerProps>`
    width: 100%;
    height: 280px;
    display: block;
    position: relative;
    padding: 32px 0;

    background-image: url(${(props) => props.foto});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: ${colors.white};

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .container {
        position: relative;
        z-index: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`

export const Categoria = styled.span`
    font-size: 32px;
    font-weight: 100;
    text-transform: capitalize;
`

export const TituloBanner = styled.h2`
    font-size: 32px;
    font-weight: 900;
`