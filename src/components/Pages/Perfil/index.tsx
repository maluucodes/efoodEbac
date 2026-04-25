import HeaderPerfil from '../../HeaderPerfil'
import Banner from '../../Banner'
import ProductList from '../../ProductList'
import CapaRestaurante from '../../../assets/images/restaurants/fundo-massa.png'

const Perfil = () => {
    return (
        <>
        <HeaderPerfil />
        <Banner
            capa={CapaRestaurante}
            categoria="italiana"
            nome="La Dolce Vita Trattoria"
        />
        <ProductList />
        </>
    )
}

export default Perfil