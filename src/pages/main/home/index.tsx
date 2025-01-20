import PageWrapper from "@/components/PageWrapper";
import HomeCatalog from "./Catalog.home";
import SliderPromotion from "./SliderPromotion";

const HomePage = () => {
  return (
    <div className="w-full flex-1  ">
      <SliderPromotion />
      <PageWrapper isDisableBreadcrums >
        <HomeCatalog />
      </PageWrapper>
    </div>

  );
};

export default HomePage