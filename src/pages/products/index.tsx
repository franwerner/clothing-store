import TitlePage from "@/components/TitlePage";
import PageWrapper from "@/components/PageWrapper";
import ProductsOrder from "./Order.products";
import ProductsModalFilter from "./ModalFilter.products";
import ProductsContainer from "./Container.products";
import ProductsFilterCategories from "./products-filter/Categories.products-filter";
import ProductsFilterWaits from "./products-filter/Waist.filter-products-filter";
import ProductsFilterColor from "./products-filter/Color.filter-products-filter";
import ProductsFilterPrice from "./products-filter/Price.filter-products-filter";

const ProductsPage = () => {
    return (
        <PageWrapper  >
            <section id="products-page-head">
                <TitlePage pageName="Productos" />
                <div className="flex justify-center p-2 gap-3 items-center">
                    <ProductsOrder />
                    <ProductsModalFilter />
                </div>
            </section>
            <section
                id="products-page-body"
                className="flex gap-2 " >
                <aside
                    className=" gap-4 border-default-300  pr-1 flex-col hidden md:flex max-w-[180px]">
                    <ProductsFilterCategories />
                    <ProductsFilterWaits />
                    <ProductsFilterColor />
                    <ProductsFilterPrice />
                </aside>
                <ProductsContainer />
            </section>
        </PageWrapper>
    );
};

export default ProductsPage;