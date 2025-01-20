import { ProductFullview } from "clothing-store-shared/types"

const pickOnlyColors = (colors: ProductFullview.Base["colors"]) => {
    return colors.reduce((acc, current) => {
        acc.push(current.color)
        return acc
    }, [] as Array<ProductFullview.Color>)
}

export default pickOnlyColors