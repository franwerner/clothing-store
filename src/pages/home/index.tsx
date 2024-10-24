import img2 from "@assets/slider-2.jpg";
import HomeCatalog from "./Catalog.home";
import { ScrollRestoration } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import SliderPromotion from "./SliderPromotion";

const HomePage = () => {
  return (
    <div className="w-full flex-1  ">
      <SliderPromotion image={img2} />
      <PageWrapper>
        <HomeCatalog />
        <ScrollRestoration />
      </PageWrapper>
    </div>

  );
};

export default HomePage