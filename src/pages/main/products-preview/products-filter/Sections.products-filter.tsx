import router from "@/router";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import { Link } from "@nextui-org/react";
import classNames from "classnames";
import { memo } from "react";
import ToggleContent from "./components/ToggleContent";
import useGetProductBrands from "./api/useGetProductBrands.api";
import useGetProductCategories from "./api/useGetProductCategories.api";

interface ProductsFilterSectionsProps {
    title: string
    elements?: Array<{ id: number | string, name: string }>,
    isLoading: boolean
}

const SectionsItems = ({ name }: { name: string }) => {

    return <li
        className="text-md"
    >
        <Link
            color="foreground"
            className="cursor-pointer  bg-default-200 rounded-md min-w-[70px] mb-1 mx-1  text-center md:text-start  p-[5px] font-medium  text-[15px] text-nowrap md:p-0 md:font-normal md:bg-inherit hover:underline "
            onPress={() => router.navigate(`${name}`)}
        >
            <span className="text-ellipsis overflow-hidden w-full max-w-[180px]">{transformToUppercase(name)}</span>
        </Link>
    </li>
}

const Elements = memo(({
    elements = [],
    title,
    isLoading
}: ProductsFilterSectionsProps) => {

    const classname = "inline-flex flex-wrap md:block"

    const maxLength = 6

    return <ToggleContent
        hiddenToggleButton={elements.length <= maxLength}
        id="aside-filter-categories"
        >
        <h3 className={classNames(
            "font-oswald text-default-700  uppercase pb-1 font-bold text-[18px]",
            {
                "animate-pulse": isLoading
            }
        )}>
            {title}
        </h3>
        <ToggleContent.visible className={classname}>
            {elements.slice(0, maxLength).map(i => <SectionsItems key={i.id} {...i} />)}
        </ToggleContent.visible>
        {
            <ToggleContent.hidden className={`${classname} overflow-hidden`}>
                {elements.slice(maxLength).map(i => <SectionsItems key={i.id} {...i} />)}
            </ToggleContent.hidden>
        }
    </ToggleContent>
})

const ProductsFilterSections = memo(() => {

    const { brands, isLoading: bIsLoading, isBrandMode } = useGetProductBrands()

    const { categories, isLoading: cIsLoading, isCategoryMode } = useGetProductCategories()

    const elements = !isBrandMode ? brands : categories

    const elementsAdapted = elements.map((i: any) => {
        return {
            id: (i.brand_id || i.category_id)!,
            name: (i.brand || i.category)!
        };
    });

    const isLoading = !isBrandMode ? bIsLoading : cIsLoading
    const title = !isBrandMode ? "Marcas" : "Categorias"

    return !isCategoryMode &&
        <Elements elements={elementsAdapted}
            isLoading={isLoading}
            title={title} />
})

export default ProductsFilterSections