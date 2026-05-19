import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: none;

    &.visivel {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
`

export const ModalContainer = styled.div`
    position: relative;
    z-index: 3;
    width: 90%;
    max-width: 1024px;

    > img {
        width: 16px !important;
        height: 16px !important;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
        z-index: 3;
    }
`

export const ModalContent = styled.div`
    background-color: ${colors.pink};
    padding: 32px;
    color: ${colors.lightBeige};
    display: flex;
    width: 1024px;

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
        padding: 16px;
        max-height: 80vh;
        overflow-y: auto;
        width: 90%;
    }

    img {
        width: 280px;
        height: 280px;
        object-fit: cover;
        margin-right: 24px;

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
        height: 200px;
        margin-right: 0;
        margin-bottom: 16px;
        }
    }

    h4 {
        font-size: 18px;
        font-weight: 900;
        margin-bottom: 16px;
    }

    p {
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 16px;
    }
`

export const BotaoModal = styled.button`
    background-color: ${colors.lightBeige};
    color: ${colors.pink};
    border: none;
    padding: 4px 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    width: fit-content;

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
        padding: 12px;
    }
`