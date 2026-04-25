import { ButtonContainer } from './styles'

type ButtonProps = {
    title: string
    onClick?: () => void
    children: string
}

const Button = ({ title, onClick, children }: ButtonProps) => {
    return (
        <ButtonContainer title={title} onClick={onClick}>
            {children}
        </ButtonContainer>
    )
}

export default Button