import ToggleContent from "@/components/ToggleContent";
import router from "@/router";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import { Link } from "@nextui-org/react";
import { memo } from "react";

interface ProductsFilterCategoriesProps {
    isBrandMode?: boolean
    elements?: Array<{ id: number, name: string }>,

}

const CatetegoriesItem = ({ name }: { name: string }) => {
    return <li
        className="text-md"
    >
        <Link
            color="foreground"
            className="cursor-pointer  bg-default-200 rounded-md min-w-[70px] mb-1 mx-1  text-center md:text-start  p-[5px] font-medium  text-[15px] text-nowrap md:p-0 md:font-normal md:bg-inherit hover:underline "
            onPress={() => router.navigate(`/productos/test/${name}`)}
        >
            <span className="text-ellipsis overflow-hidden w-full max-w-[180px]">{transformToUppercase(name)}</span>
        </Link>
    </li>
}

const ProductsFilterSections = memo(({
    elements = [],
    isBrandMode = false
}: ProductsFilterCategoriesProps) => {

    const classname = "inline-flex flex-wrap md:block"

    const maxLength = 6

    return elements.length > 0 && <ToggleContent
        hiddenToggleButton={elements.length <= maxLength}
        id="aside-filter-categories"
        as="section">
        <h3 className="font-oswald text-default-700  uppercase pb-1 font-bold text-[18px]">{isBrandMode ? "Marcas" : "Categorias"}</h3>
        <ToggleContent.visible className={classname}>
            {elements.slice(0, maxLength).map(i => <CatetegoriesItem key={i.id} {...i} />)}
        </ToggleContent.visible>
        {
            <ToggleContent.hidden className={`${classname} overflow-hidden`}>
                {elements.slice(maxLength).map(i => <CatetegoriesItem key={i.id} {...i} />)}
            </ToggleContent.hidden>
        }
    </ToggleContent>
})

export default ProductsFilterSections