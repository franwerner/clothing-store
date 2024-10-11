import { useMediaQuery, useTheme } from "my-components";

const useQueryMD = () => {
    const theme = useTheme()
    return useMediaQuery({ md: { minWidth: theme.breakpoints.md.minWidth } }).md.matches
};

export default useQueryMD