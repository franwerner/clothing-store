import ToggleContent from "@/components/ToggleContent";
import transformToUppercase from "@/helper/transformToUppercase.helper";

interface Color {
    id: number,
    count: number,
    color: string,
    name: string
}

const colors: Color[] = [
    { id: 1, count: 5, color: "red", name: "red" },
    { id: 2, count: 3, color: "blue", name: "blue" },
    { id: 3, count: 8, color: "green", name: "green" },
    { id: 4, count: 2, color: "yellow", name: "yellow" },
    { id: 5, count: 7, color: "orange", name: "orange" },
    { id: 6, count: 4, color: "purple", name: "purple" },
    { id: 7, count: 6, color: "pink", name: "pink" },
    { id: 8, count: 1, color: "brown", name: "brown" },
    { id: 9, count: 9, color: "cyan", name: "cyan" },
    { id: 10, count: 10, color: "magenta", name: "magenta" },
];

const ColorItem = ({ color, count, name }: Color) => {
    return <li className="border-1 border-b-3 border-default-200 rounded-md mb-1 mx-1 hover:border-default-700 gap-1 cursor-pointer py-[6px] text-[14px] flex items-center justify-between p-1 w-min max-w-[180px]">
        <div
            className="rounded-full overflow-hidden flex  h-[16px]"
            style={{
                border: `1px solid ${color}`
            }}>
            <span style={{ backgroundColor: color, opacity: 0.5 }} className="h-full px-[7px] w-full">
            </span>
        </div>
        <span className="text-ellipsis flex-1 overflow-hidden">{transformToUppercase(name)}</span>
        <span className="text-[10px]">{`(${count})`}</span>
    </li >
}

const ProductsFilterColor = () => {

    const maxLength = 6

    const classname = `inline-flex flex-wrap md:block`

    return (
        <ToggleContent
            hiddenToggleButton={colors.length <= maxLength}
            
            as="section"
            id="aside-filter-color">
            <h3 className="font-oswald  text-default-700 tracking-wider uppercase pb-1 font-bold text-[18px]">Color</h3>
            <ToggleContent.visible className={classname}>
                {colors.slice(0, maxLength).map(i => <ColorItem key={i.id} {...i} />)}
            </ToggleContent.visible>
            <ToggleContent.hidden className={`overflow-hidden ${classname} `}>
                {colors.slice(maxLength).map(i => <ColorItem key={i.id} {...i} />)}
            </ToggleContent.hidden>
        </ToggleContent>
    );
};

export default ProductsFilterColor