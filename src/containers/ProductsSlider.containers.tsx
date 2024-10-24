import IProduct from "@/interfaces/Product.interfaces";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./product";
import { motion } from "framer-motion";

const classname = "material-symbols-outlined border-1 border-default-200 select-none  absolute top-1/2 z-10  -translate-y-1/2  cursor-pointer shadow-xl  pointer-events-auto  bg-white rounded-full text-default-700 p-[12px] text-[35px]"
const SliderButtonNext = ({ isActive }: { isActive: boolean }) => {
    return (
        < motion.span
            animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 20,
                y: -50
            }}
            transition={{ duration: 0.1 }}
            className={`${classname} slider-btn-next right-0`}
        >
            chevron_right
        </motion.span >
    )
}

const SliderButtonPrev = ({ isActive }: { isActive: boolean }) => {
    return (
        <motion.span
            animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -20,
                y: -50
            }}
            transition={{ duration: 0.1 }}
            className={`${classname} slider-btn-prev`}
        >
            chevron_left
        </motion.span>
    )
}


const ProductsSlider = ({ products }: { products: Array<IProduct> }) => {

    const [navigation, setNavigation] = useState(false)
    const [progress, setProgress] = useState(0)

    const prev = (!navigation && progress > 0)
    const next = (!navigation && progress < 1)

    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={10}
            onSliderFirstMove={(e) => {
                if (e.progress == 1 || e.progress == 0) return
                setNavigation(true)
            }}
            onSlideChangeTransitionEnd={(e) => {
                setProgress(e.progress)
                setNavigation(false)
            }}
            onSlideChangeTransitionStart={() => {
                setNavigation(true)
            }}

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
                nextEl: '.slider-btn-next',
                prevEl: '.slider-btn-prev',
                enabled: !navigation,
            }}
            className="w-full   h-full"
            modules={[Navigation]}
        >
            {
                products.map(i =>
                    <SwiperSlide key={i.id}>
                        <ProductCard {...i} />
                    </SwiperSlide>
                )
            }
            <SliderButtonPrev  isActive = {prev}/>
            <SliderButtonNext isActive = {next}/>
        </Swiper>
    );
};


export default ProductsSlider


