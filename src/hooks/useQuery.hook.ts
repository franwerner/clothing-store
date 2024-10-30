import { useMediaQuery } from "responsive-component";
const useQuerySm = () => useMediaQuery({ sm: { minWidth: 640 } }).sm
const useQueryMd = () => useMediaQuery({ md: { minWidth: 768 } }).md
const useQueryLg = () => useMediaQuery({ lg: { minWidth: 1024 } }).lg

export {
    useQueryMd,
    useQuerySm,
    useQueryLg
}