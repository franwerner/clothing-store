import AnimatedTitle from "@/components/AnimatedTitle";
import PageWrapper from "@/components/PageWrapper";
import ProductsPreview from "@/containers/product-preview/index.product-preview";
import { useLocation } from "react-router";
import ProductsPreviewModalFilter from "./ModalFilter.products-preview";
import ProductsPreviewOrder from "./Order.products-preview";
import ProductsFilterColor from "./products-filter/Color.filter-products-filter";
import ProductsFilterDelete from "./products-filter/Delete.products-filter";
import ProductsFilterPrice from "./products-filter/Price.filter-products-filter";
import ProductsFilterSections from "./products-filter/Sections.products-filter";
import ProductsFilterSizes from "./products-filter/Size.filter-products-filter";


const ProductsPreviewPage = () => {
    const location = useLocation()
    const pathname = location.pathname.split("/").filter(Boolean)
    const title = pathname.length == 1 ? "productos" : decodeURIComponent(pathname[pathname.length - 1])

    return (
        <PageWrapper className="flex flex-col">
            <AnimatedTitle title={title} />
            <section id="products-page-head">
                <div className="flex justify-center p-2 gap-3 items-center">
                    <ProductsPreviewOrder />
                    <ProductsPreviewModalFilter />
                </div>
            </section>
            <section
                id="products-page-body"
                className="flex flex-1 h-full gap-2">
                <aside
                        className="gap-4 border-default-300 w-full pr-1 flex-col hidden md:flex max-w-[180px]">
                        <ProductsFilterDelete />
                        <ProductsFilterSections />
                        <ProductsFilterSizes />
                        <ProductsFilterColor />
                        <ProductsFilterPrice />
                    </aside>
                <ProductsPreview />
            </section>
        </PageWrapper>
    )
}


export default ProductsPreviewPage