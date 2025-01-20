import { ProductFullview } from "clothing-store-shared/types"

const findColorByName = (colors: ProductFullview.Base["colors"]) => {
    const searchParams = new URLSearchParams(window.location.search)
    const findIndex = colors.findIndex(({ color }) => color.color == searchParams.get("color"))
    return findIndex < 0 ? 0 : findIndex
}

export default findColorByName