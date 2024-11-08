import { Image } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

interface ProductFullViewImagesProps {
    images: Array<{ imageID: number, url: string }>
    variant: number
}

const ProductFullViewImages = ({ images, variant }: ProductFullViewImagesProps) => {

    const [image, setImage] = useState(0)

    const swiperRef = useRef<Swiper>()

    const slideTo = (index: number) => {
        if (swiperRef.current)
            swiperRef.current.slideTo(index)
    };

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.update()
        }
    }, [variant])

    return (
        <section
            id="product-images"
            className="flex w-full md:w-[60%] bg-default-50 relative select-none gap-x-3  ">
            {
                images.length > 1 && <div className="flex-col hidden md:flex h-full w-full gap-y-5">
                    {
                        images.map(({ imageID, url }, index) => <Image
                            src={url}
                            key={imageID}
                            onMouseEnter={() => {
                                slideTo(index)
                                setImage(index)
                            }}
                            classNames={{ wrapper: `bg-white cursor-pointer  justify-center w-full h-full justify-center items-center flex overflow-hidden min-w-full    duration-300 transition-colors  rounded-none ${image === index ? "border-default-900" : "border-white"} border-1 ` }}
                            className="rounded-none object-contain h-full" />)
                    }
                </div>
            }
            <div className={`w-full   ${images.length > 1 ? "md:w-[80%]" : ""}`}>
                <SwiperReact
                    onSlideChange={(e) => setImage(e.activeIndex)}
                    onSwiper={(e) => {
                        swiperRef.current = e
                    }}
                    effect={'fade'}
                    navigation={{
                        enabled: true,
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next'
                    }}
                    pagination={{
                        type: "fraction",
                        enabled: true,

                    }}
                    modules={[Navigation, EffectFade, Pagination]}
                >
                    {
                        images.map(({ imageID, url }) =>
                            <SwiperSlide className="flex justify-center items-center   bg-white" key={imageID}>
                                <Image
                                    className="object-contain rounded-none min-h-[350px] max-h-[350px]"
                                    classNames={{ wrapper: "rounded-none " }}
                                    src={url}
                                />
                            </SwiperSlide>
                        )
                    }
                    <div className="swiper-button-prev  text-black"></div>
                    <div className=" swiper-button-next text-black "></div>
                </SwiperReact>

            </div>
        </section>
    )
}
export default ProductFullViewImages