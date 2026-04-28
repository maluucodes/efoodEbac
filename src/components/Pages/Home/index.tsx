import RestaurantList from '../../RestaurantList'
import Hero from '../../Hero'
import type { Restaurante } from '../../Models/Restaurant'
import { useEffect, useState } from 'react'

const Home = () => {
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])

    useEffect(() => {
        fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
        .then((res) => res.json())
        .then((data: Restaurante[]) => setRestaurantes(data))
    }, [])

    if (restaurantes.length === 0) {
        return <h3>Carregando...</h3>
    }

    return (
        <>
            <Hero />
            <RestaurantList restaurants={restaurantes} />
        </>
    )
}

export default Home