import type { Restaurante } from '../Models/Restaurant'
import RestaurantCard from '../RestaurantCard'
import { ListContainer } from './styles'

type Props = {
    restaurants: Restaurante[]
}

const RestaurantList = ({ restaurants }: Props) => {
    return (
        <div className="container">
            <ListContainer>
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        id={restaurant.id}
                        title={restaurant.titulo}
                        category={restaurant.tipo}
                        image={restaurant.capa}
                        description={restaurant.descricao}
                        rating={restaurant.avaliacao}
                        infos={
                            restaurant.destacado
                                ? ['Destaque da semana', restaurant.tipo]
                                : [restaurant.tipo]
                        }
                    />
                ))}
            </ListContainer>
        </div>
    )
}

export default RestaurantList