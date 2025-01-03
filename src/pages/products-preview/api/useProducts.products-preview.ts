import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { isSuccessResponse } from "@/utils/verifyResponsesData.utilts"
import { ProductColorPreview, ProductPreview, ProductSizePreview } from "clothing-store-shared/types"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const UseProductsPreview = () => {
     const [searchParams] = useSearchParams()
     const params = useParams()
     /**
      * Nos ayuda a mantener el estado de los productos para la carga de nuevos,
      * siempre y cuando ningun parametro/query cambie.
      */
     const [products, setProducts] = useState<Array<ProductPreview>>([])
     const props = {
          color: searchParams.get("color") || undefined,
          size: searchParams.get("size") || undefined,
          price: searchParams.get("price") || undefined,
          order: searchParams.get("order") || undefined,
          brand: params.brand,
          category: params.category
     }

     const res = useFetchCustom<{
          products: Array<ProductPreview>,
          colors: Array<ProductColorPreview>,
          sizes: Array<ProductSizePreview>
     }>({
          target: "products/view/preview",
          method: "GET",
          onSuccess: (res) => {
               const { result } = res
               const { products } = result.data
               setProducts(prev => [...prev, ...products])
          }
     })

     const [{ isLoading, response }, { setRequest }] = res

     useEffect(() => {
          const { brand, category, color, price, size, order } = props
          setProducts([])
          setRequest({
               params: {
                    brand,
                    category
               },
               query: {
                    color,
                    price,
                    size,
                    order
               }
          })
     }, [JSON.stringify(props)])

     const is = isSuccessResponse(response) ? response.result.data : {
          products: products,
          colors: [],
          sizes: []
     }

     return {
          isLoading,
          products: products,
          colors: is.colors,
          sizes: is.sizes
     }
}

export default UseProductsPreview