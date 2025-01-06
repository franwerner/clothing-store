import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { ProductPreview } from "clothing-store-shared/types"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const UseGetProductsPreview = () => {

     const [searchParams] = useSearchParams()
     const params = useParams()

     const querysParams = {
          color: searchParams.get("color") || undefined,
          size: searchParams.get("size") || undefined,
          price: searchParams.get("price") || undefined,
          sortDirection: searchParams.get("sortDirection") || undefined,
          sortField: searchParams.get("sortField") || undefined,
          search: searchParams.get("search") || undefined,
          brand: params.brand,
          category: params.category
     }

     /**
      * Nos ayuda a mantener el estado de los productos para la carga de nuevos,
      * siempre y cuando ningun parametro/query cambie.
      */

     const [products, setProducts] = useState<Array<ProductPreview.Product>>([])
     const [hasMoreProducts, setHastMoreData] = useState(true)

     const res = useFetchCustom<Array<ProductPreview.Product>>({
          target: "products/view/preview",
          method: "GET",
          onSuccess: (res) => {
               const { result } = res
               const products = result.data
               setProducts(prev => [...prev, ...products])

          },
          onFailed: ({ result }) => {
               const { code } = result
               if (code === "product_not_found") {
                    setHastMoreData(false)
               }
          }
     })

     const [{ isLoading }, { setRequest }] = res

     const loadMoreProducts = (offset: number = products.length) => {
          const { brand, category, color, price, size, sortDirection, sortField, search } = querysParams
          setRequest({
               params: {
                    brand,
                    category
               },
               query: {
                    color,
                    price,
                    size,
                    sortDirection,
                    sortField,
                    offset,
                    search
               }
          })
     }

     useEffect(() => {
          loadMoreProducts(0)
          setProducts([])
          setHastMoreData(true)
     }, [JSON.stringify(querysParams)])


     return {
          isLoading,
          products,
          loadMoreProducts,
          hasMoreProducts: products.length % 15 === 0 && hasMoreProducts
     }
}

export default UseGetProductsPreview