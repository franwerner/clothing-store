function transformToCurrency(amount:number,currency:string) {
    return amount.toLocaleString('es-AR', {
        style: 'currency',
        currency: currency, 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2  
    });
}

export default transformToCurrency