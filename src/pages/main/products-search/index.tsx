import AnimatedTitle from "@/components/AnimatedTitle"
import PageWrapper from "@/components/PageWrapper"
import ProductsPreviewContainer from "@/containers/product-preview/index.product-preview"
import { ScrollRestoration } from "react-router"

const ProductsSearchPage = () => {

  return (
    <PageWrapper>
      <AnimatedTitle
        title="Resultados"
        className="pb-8" />
      <ProductsPreviewContainer />
      <ScrollRestoration />
    </PageWrapper>
  )
}

export default ProductsSearchPage