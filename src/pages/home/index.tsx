import PageWrapper from "@/components/PageWrapper";
import Categories from "./Categories.home";
import HomeInfo from "./Info.home";
import Carrusel from "@/components/carrusel";
import { Image } from "@nextui-org/react";
import img1 from "@assets/slider-1.png";
import img2 from "@assets/slider-2.jpg";

const models = [img1, img2]

const HomeCarrusel = () => {

  return (
    <Carrusel
    data={models}
    swiper="point"
    classNames={{}}
    >
      {models.map((src, index) =>
        <Image
          key={index}
          classNames={{
            wrapper: "flex w-full flex-shrink-0 ",
            img: "rounded-none w-full  "
          }}
          draggable={false}
          src={src} />

      )}
    </Carrusel>
  )
}

const HomePage = () => {
  return (
    <PageWrapper >
      <HomeCarrusel />
      <HomeInfo />
      <Categories />
    </PageWrapper>
  );
};

export default HomePage