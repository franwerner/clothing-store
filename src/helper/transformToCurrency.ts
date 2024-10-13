function transformToCurrency(amount:number,currency:string) {
    return amount.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS', // Cambia 'ARS' por la moneda que necesites (USD, EUR, etc.)
        minimumFractionDigits: 2, // Número mínimo de decimales
        maximumFractionDigits: 2  // Número máximo de decimales
    });
}

export default transformToCurrency