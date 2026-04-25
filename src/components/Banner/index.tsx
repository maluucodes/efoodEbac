import { Categoria, Imagem, TituloBanner } from './styles'

type BannerPerfilProps = {
    nome: string
    categoria: string
    capa: string
}

const BannerPerfil = ({ nome, categoria, capa }: BannerPerfilProps) => {
    return (
        <Imagem foto={capa}>
        <div className="container">
            <Categoria>{categoria}</Categoria>
            <TituloBanner>{nome}</TituloBanner>
        </div>
        </Imagem>
    )
}

export default BannerPerfil