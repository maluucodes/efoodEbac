import { MoonLoader } from 'react-spinners'

import { Container } from './styles'
import { colors } from '../../styles'

const Loader = () => (
    <Container>
        <MoonLoader color={colors.pink} />
    </Container>
)

export default Loader