import { ProductPreview } from "@/interfaces/Product.interfaces";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./product";

const ProductsSlider = ({ products }: { products: Array<ProductPreview> }) => {

    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 15
                },
            }}
            speed={400}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                enabled: true,
            }}
            className="w-full   !py-1 h-full"
            modules={[Navigation]}
        >
            {
                products.map(i =>
                    <SwiperSlide key={i.id}>
                        <ProductCard {...i} />
                    </SwiperSlide>
                )
            }
            <div className="swiper-button-prev !pointer-events-auto text-black p-4  "></div>
            <div className="swiper-button-next !pointer-events-auto text-black p-4"></div>
        </Swiper>
    );
};


export default ProductsSlider


