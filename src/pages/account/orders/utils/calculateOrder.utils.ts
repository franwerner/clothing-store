const calculateOrder = (productsOrder: Array<ProductOrder>) => {

    return productsOrder.reduce((acc, { discount, price, quantity }) => {
        const calc = (price * (1 - discount / 100)) * quantity
        return {
            total_payment: calc + acc.total_payment,
            total_quantity: quantity + acc.total_quantity
        }
    }, {
        total_quantity: 0,
        total_payment: 0
    })
}

export default calculateOrder