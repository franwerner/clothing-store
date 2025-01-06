import getUrlQueryParams from "@/helper/getUrlQueryParams.helper";
import useForm from "@/hooks/useForm.hook";
import router from "@/router";
import { Button } from "@nextui-org/react";
import { memo, useCallback, useEffect, useState } from "react";
import ProductSearchModal from "./Modal.product-search";
import useDebouncedSearch from "./hooks/useDecouncedSearch.hooks";

const Icon = memo(({ onShow }: { onShow: () => void }) => (
    <Button
        onPress={onShow}
        aria-label="magnify"
        isIconOnly
        size="lg"
        color="default"

        className="material-symbols-outlined bg-white text-black    text-[28px]  ">
        search
    </Button>
))

const NavbarProductSearch = memo(() => {
    const { form, onChange, setValue } = useForm({ search: getUrlQueryParams("search", "productos/busqueda") })
    const [show, setShow] = useState(false)
    const onShow = useCallback(() => {
        setShow(prev => !prev)
    }, [])

    useEffect(() => {
        const unsuscribe = router.subscribe((r) => {
            const { pathname } = r.location
            const { state } = r.navigation
            /**
             * Los loaders de react-router hace un pre-carga de las ruta en la que se encuentra.
             * Entonces para mitigar el reseteo erroneo de form, tiene que ser una ruta en estado "idle"
             */
            if (pathname !== "/productos/busqueda" && state === "idle" && form.search) {
                setValue("search", "")
            }
        })
        return () => {
            unsuscribe()
        }
    }, [form.search])

    useDebouncedSearch(form.search, () => setShow(false))

    return (
        <>
            <Icon onShow={onShow} />
            <ProductSearchModal
                onChange={onChange}
                value={form.search}
                onShow={onShow}
                show={show} />
        </>
    );
});

export default NavbarProductSearch;