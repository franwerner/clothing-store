import { AdaptedBreakpoints, AnimationVariants, HTMLResponsiveComponent, ResponsiveComponent, ResponsiveComponentProps, createBreakpoints } from "responsive-component"

const breakpoints = createBreakpoints({
  "2xl": 1536,
  lg: 1024,
  md: 768,
  sm: 640,
  xl: 1280,
  xs: 440
})

type ResponsiveProps<
  T extends HTMLResponsiveComponent,
  K extends AnimationVariants<any, C>,
  C = undefined,
> = Omit<ResponsiveComponentProps<T, AdaptedBreakpoints<typeof breakpoints>, K, C>, "breakpoints">


const Responsive = <
  T extends HTMLResponsiveComponent,
  K extends AnimationVariants<any, C>,
  C = undefined
>(props: ResponsiveProps<T, K, C>) => {


  return (
    <ResponsiveComponent breakpoints={breakpoints} {...props as any} />
  );
};

export default Responsive;