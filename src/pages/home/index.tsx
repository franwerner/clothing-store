import GalleryCarousel from "@/components/GalerryCarousel";
import PageWrapper from "@/components/PageWrapper";
import img1 from "@assets/slider-1.png";
import img2 from "@assets/slider-2.jpg";
import Categories from "./Categories.home";
import HomeInfo from "./Info.home";
const models = [img1, img2]


const HomePage = () => {
  return (
    <PageWrapper >
      <GalleryCarousel images={models}/>
      <HomeInfo />
      <Categories />
    </PageWrapper>
  );
};

export default HomePage