import GalleryCarousel from "@/containers/GalerryCarousel.containers";
import img1 from "@assets/slider-1.png";
import img2 from "@assets/slider-2.jpg";
import HomeCatalog from "./Catalog.home";
import { ScrollRestoration } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
const models = [img1, img2]

const HomePage = () => {
  return (
    <PageWrapper>
      <GalleryCarousel images={models} />
      <HomeCatalog />
      <ScrollRestoration />
    </PageWrapper>
  );
};

export default HomePage