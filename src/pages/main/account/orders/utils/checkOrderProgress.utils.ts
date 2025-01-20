const checkOrderProgress = (index: number,order:Array<any>) => {
    return order.slice(0, index).every(i => i.status === "completed")
}

export default checkOrderProgress