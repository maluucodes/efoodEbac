type ProdutoCarrinho = {
    id: number
    preco: number
}

type CheckoutPayload = {
    products: {
        id: number
        price: number
    }[]
    delivery: {
        receiver: string
        address: {
            description: string
            city: string
            zipCode: string
            number: number
            complement: string
        }
    }
    payment: {
        card: {
            name: string
            number: string
            code: number
            expires: {
                month: number
                year: number
            }
        }
    }
}

type CheckoutResponse = {
    orderId: string
}