import { createGlobalStyle } from 'styled-components'

export const colors = {
    white: '#fff',
    pink: '#E66767',
    beige: '#FFEBD9',
    lightBeige: '#FFF8F2'
}

export const GlobalCss = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    }

    body {
        background-color: ${colors.lightBeige};
        color: ${colors.pink};
    }
    
    .container{
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    }
`

export const breakpoints = {
    desktop: '1024px',
    tablet: '768px',
    mobile: '480px'
}
