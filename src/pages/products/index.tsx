import TitlePage from "@/components/TitlePage";
import ProductOrder from "./ProductOrder";
import AsideFilter from "./aside-filter";
import PageWrapper from "@/components/PageWrapper";



const Products = () => {
    return (
        <PageWrapper id="products-page" >
            <section id="products-page-head">
                <TitlePage pageName="Productos" />
                <ProductOrder />
            </section>
            <section id="products-page-body" className="" >
                <AsideFilter />
            </section>
        </PageWrapper>
    );
};

export default Products;