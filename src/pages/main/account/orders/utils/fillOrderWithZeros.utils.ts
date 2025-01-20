const fillOrderWithZeros = (order:string | number) => {
    const orderToString = order.toString()
    const initialFill = 5
    const currentFill = orderToString.length > initialFill ? orderToString.length + 1 : initialFill
   return orderToString.toString().padStart(currentFill,"0") 
}

export default fillOrderWithZeros