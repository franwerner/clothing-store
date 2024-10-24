import useForm from "@/hooks/useForm.hook";
import { useQueryMd } from "@/hooks/useQuery.hook";
import router from "@/router";
import { Button, NavbarContent, NavbarItem } from "@nextui-org/react";
import { memo, useCallback, useEffect, useState } from "react";
import ProductSearchModal from "./Modal.product-search";
import ProductSearchStatic from "./Static.product-search";
import useDebouncedSearch from "./hooks/useDecouncedSearch.hooks";
import getUrlQueryParams from "@/helper/getUrlQueryParams.helper";

const ButtonSearch = memo(({ onShow }: { onShow: () => void }) => (
    <NavbarItem className="md:hidden">
        <Button
            onClick={onShow}
            aria-label="magnify"
            isIconOnly
            variant="flat"
            color="secondary"
            className="material-symbols-outlined text-secondary-400 text-3xl shadow ">
            search
        </Button>
    </NavbarItem>
))


const TopNavbarProductSearch = () => {
    const match = useQueryMd().matches
    const { form, onChange, resetValue } = useForm({ search: getUrlQueryParams("q", "busqueda") })
    const [show, setShow] = useState(false)
    const onShow = useCallback(() => {
        setShow(prev => !prev)
    }, [])

    useEffect(() => {
        const unsuscribe = router.subscribe((r) => {
            const { pathname } = r.location
            const { state } = r.navigation
            if (pathname !== "/busqueda" && state === "idle" && form.search) {
                resetValue("search")
            }
        })
        return () => {
            unsuscribe()
        }
    }, [form.search])

    useDebouncedSearch(form.search)

    return (
        <NavbarContent className="data-[justify=start]:justify-center h-auto" >
            <ButtonSearch onShow={onShow} />
            <ProductSearchStatic
                value={form.search}
                onChange={onChange} />
            <ProductSearchModal
                onChange={onChange}
                value={form.search}
                onShow={onShow}
                show={show && !match} />
        </NavbarContent >
    );
};

export default TopNavbarProductSearch;