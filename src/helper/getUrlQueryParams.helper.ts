import router from "@/router";
/**
 * Sirve para la busqueda de una query params en base a una URL en especifico.
 */
const getUrlQueryParams = (query: string, path: string) => {
   const { search, pathname } = router.state.location

   const splitCurrentPathname = pathname.split("/").filter(Boolean)
   const splitExpectedPathname = path.split("/").filter(Boolean)
   if(splitCurrentPathname.length !== splitExpectedPathname.length) return ""
   else if (!splitCurrentPathname.every((e, index) => e === splitExpectedPathname[index])) return ""
   return new URLSearchParams(search).get(query) || ""
}

export default getUrlQueryParams