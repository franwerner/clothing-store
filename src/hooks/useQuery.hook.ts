import { useMediaQuery } from "responsive-component";
const useQuerySm = () => {

    return useMediaQuery({ sm: { minWidth: 640 } }).sm

};

const useQueryMd = () => {

    return useMediaQuery({ md: { minWidth: 768 } }).md

};

export {
    useQueryMd,
    useQuerySm
}