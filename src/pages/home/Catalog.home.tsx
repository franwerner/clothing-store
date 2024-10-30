import ActionButton from "@/components/ActionButton";
import AnimatedTitle from "@/components/AnimatedTitle";
import ProductSuggestions from "@/containers/ProductSuggestions.containers";
import { suggestionsTest1 } from "@/mocks/suggestions.mocks";
import router from "@/router";

const HomeCatalog = () => {
    return (
        <main className=" flex flex-col justify-center gap-10" >
            <AnimatedTitle title="Recomendaciones" className="py-8" />
            {
                suggestionsTest1.map(({ id, products, suggetion }) =>
                    <ProductSuggestions
                        key={id}
                        products={products}
                        suggetion={suggetion} />)
            }
            <ActionButton onClick={() => router.navigate("/productos")}>
                Ver todo el catalogo
            </ActionButton>
        </main>
    )
};

export default HomeCatalog