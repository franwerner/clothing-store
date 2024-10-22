import ToggleContent from "@/components/ToggleContent";
import transformToUppercase from "@/helper/transformToUppercase.helper";
import router from "@/router";
import { Link } from "@nextui-org/react";

interface Categories {
    id: number,
    brand: string,
}

const categories: Categories[] = [
    { id: 1, brand: "nike" },
    { id: 2, brand: "adidas" },
    { id: 3, brand: "puma" },
    { id: 4, brand: "reebok" },
    { id: 5, brand: "under armour" },
    { id: 6, brand: "new balance" },
    { id: 7, brand: "asics" },
    { id: 8, brand: "fila" },
    { id: 9, brand: "converse" },
    { id: 10, brand: "vans" },
];

const CatetegoriesItem = ({ brand }: Categories) => {
    return <li
        className="text-md"
    >
        <Link
            color="foreground"
            className="cursor-pointer  bg-default-200 rounded-md min-w-[70px] mb-1 mx-1  text-center md:text-start  p-[5px] font-medium  text-[15px] text-nowrap md:p-0 md:font-normal md:bg-inherit hover:underline "
            onClick={() => router.navigate(`/productos/${brand}`)}
        >
            <span className="text-ellipsis overflow-hidden w-full max-w-[180px]">{transformToUppercase(brand)}</span>
        </Link>
    </li>
}

const ProductsFilterCategories = () => {

    const classname = "inline-flex flex-wrap md:block"

    const maxLength = 6
    return (
        <ToggleContent
            hiddenToggleButton={categories.length <= maxLength}
            id="aside-filter-categories"
            as="section">
            <h3 className="font-oswald text-default-700 tracking-wider uppercase pb-1 font-bold text-[18px]">Categorias</h3>
            <ToggleContent.visible className={classname}>
                {categories.slice(0, maxLength).map(i => <CatetegoriesItem key={i.id} {...i} />)}
            </ToggleContent.visible>
            {
                <ToggleContent.hidden className={`${classname} overflow-hidden`}>
                    {categories.slice(maxLength).map(i => <CatetegoriesItem key={i.id} {...i} />)}
                </ToggleContent.hidden>
            }
        </ToggleContent>
    );
};

export default ProductsFilterCategories