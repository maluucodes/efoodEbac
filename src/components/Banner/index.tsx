import { Categoria, Image, TituloBanner } from './styles'

type Props = {
    nome: string
    categoria: string
    capa: string
}

const BannerPerfil = ({ nome, categoria, capa }: Props) => {
    return (
        <Image foto={capa}>
            <div className="container">
                <Categoria>{categoria}</Categoria>
                <TituloBanner>{nome}</TituloBanner>
            </div>
        </Image>
    )
}
export default BannerPerfil