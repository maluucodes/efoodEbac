import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Restaurante } from '../components/Models/Restaurant'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-ebac.vercel.app/api/efood'
    }),
    endpoints: (builder) => ({
        getRestaurants: builder.query<Restaurante[], void>({
            query: () => 'restaurantes'
        }),
        getPratos: builder.query<Restaurante, string>({
            query: (id) => `restaurantes/${id}`
        }),
        finalizarPedido: builder.mutation<CheckoutResponse, CheckoutPayload>({
            query: (body) => ({
                url: 'checkout',
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useGetRestaurantsQuery,
    useGetPratosQuery,
    useFinalizarPedidoMutation
} = api

export default api