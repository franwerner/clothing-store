import AnimatedTitle from "@/components/AnimatedTitle";
import PageWrapper from "@/components/PageWrapper";
import ProductsPreviewContainer from "./Container.products-preview";
import ProductsPreviewModalFilter from "./ModalFilter.products-preview";
import ProductsPreviewOrder from "./Order.products-preview";
import ProductsFilterCategories from "./products-filter/Categories.products-filter";
import ProductsFilterColor from "./products-filter/Color.filter-products-filter";
import ProductsFilterDelete from "./products-filter/Delete.products-filter";
import ProductsFilterPrice from "./products-filter/Price.filter-products-filter";
import ProductsFilterWaits from "./products-filter/Waist.filter-products-filter";
import { useLocation } from "react-router-dom";

const ProductsPreviewPage = () => {

    const location = useLocation()
    
    const pathname = location.pathname.split("/").filter(Boolean)

    const title = pathname.length == 1 ? "productos" : decodeURIComponent(pathname[pathname.length - 1])

    return (
        <PageWrapper>
        <AnimatedTitle title={title} />
            <section id="products-page-head">
                <div className="flex justify-center p-2 gap-3 items-center">
                    <ProductsPreviewOrder />
                    <ProductsPreviewModalFilter />
                </div>
            </section>
            <section
                id="products-page-body"
                className="flex gap-2 " >
                <aside
                    className="gap-4 border-default-300  pr-1 flex-col hidden md:flex max-w-[180px]">
                    <ProductsFilterDelete />
                    <ProductsFilterCategories />
                    <ProductsFilterWaits />
                    <ProductsFilterColor />
                    <ProductsFilterPrice />
                </aside>
                <ProductsPreviewContainer />
            </section>
        </PageWrapper>
    );
};

export default ProductsPreviewPage;