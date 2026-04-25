import { TagContainer } from './styles'

type TagProps = {
    children: string
}

const Tag = ({ children }: TagProps) => <TagContainer>{children}</TagContainer>

export default Tag