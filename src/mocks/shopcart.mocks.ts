import Shipping from "@/interfaces/Shipping.interfaces";

const shopCartalTest1: Shipping & { subtotal: number } = {
    subtotal: 60000,
    freeShipping: 590000,
    shipping: 15000
}
const shopCartalTest2: Shipping & { subtotal: number } = {
    subtotal: 2500000,
    freeShipping: 100000,
    shipping: 15000
}

export {
    shopCartalTest1,
    shopCartalTest2
}