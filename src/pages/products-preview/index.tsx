import AnimatedTitle from "@/components/AnimatedTitle";
import PageWrapper from "@/components/PageWrapper";
import { ProductColorPreview, ProductPreview, ProductSizePreview } from "clothing-store-shared/types";
import { createContext, useContext } from "react";
import { useLocation } from "react-router";
import UseProductsPreview from "./api/useProducts.products-preview";
import ProductsPreviewContainer from "./Container.products-preview";
import ProductsPreviewModalFilter from "./ModalFilter.products-preview";
import ProductsPreviewOrder from "./Order.products-preview";
import ProductsFilterColor from "./products-filter/Color.filter-products-filter";
import ProductsFilterDelete from "./products-filter/Delete.products-filter";
import ProductsFilterPrice from "./products-filter/Price.filter-products-filter";
import ProductsFilterCategories from "./products-filter/Sections.products-filter";
import ProductsFilterSizes from "./products-filter/Size.filter-products-filter";

const ProductPreviewContext = createContext<{
    isLoading: boolean,
    products: Array<ProductPreview>,
    colors: Array<ProductColorPreview>,
    sizes: Array<ProductSizePreview>
}>({
    isLoading: false,
    products: [],
    colors: [],
    sizes: []
})

const useProductPreviewContext = () => {
    return useContext(ProductPreviewContext)
}

const ProductsPreviewPage = () => {
    const location = useLocation()
    const pathname = location.pathname.split("/").filter(Boolean)
    const title = pathname.length == 1 ? "productos" : decodeURIComponent(pathname[pathname.length - 1])

    const res = UseProductsPreview()

    return (
        <PageWrapper>
            <ProductPreviewContext.Provider value={res}>
                <AnimatedTitle title={title} />
                <section id="products-page-head">
                    <div className="flex justify-center p-2 gap-3 items-center">
                        <ProductsPreviewOrder />
                        <ProductsPreviewModalFilter />
                    </div>
                </section>
                <section
                    id="products-page-body"
                    className="flex gap-2">
                    <aside
                        className="gap-4 border-default-300 w-full pr-1 flex-col hidden md:flex max-w-[180px]">
                        <ProductsFilterDelete />
                        <ProductsFilterCategories />
                        <ProductsFilterSizes />
                        <ProductsFilterColor />
                        <ProductsFilterPrice />
                    </aside>
                    <ProductsPreviewContainer />
                </section>
            </ProductPreviewContext.Provider>
        </PageWrapper>
    )
}

export {
    useProductPreviewContext
};
export default ProductsPreviewPage