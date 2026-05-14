import styled from 'styled-components'
import { breakpoints } from '../../styles'

export const ListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
    padding: 56px 0;

    @media (max-width: ${breakpoints.tablet}) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: ${breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`