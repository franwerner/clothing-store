import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


const SliderPromotion = ({
    image,
}: { image: string }) => {

    return (
        <Swiper
            style={{
                //@ts-ignore
                '--swiper-pagination-color': '#fff',
            }}
            speed={600}
            parallax={true}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            grabCursor={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            navigation={{
                enabled: true,
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
            }}
            modules={[Parallax, Pagination, Navigation, Autoplay]}
            className="!h-[calc(100dvh-180px)] w-[10px]"
        >
            <div
                className="absolute left-0 w-[130%] bg-cover bg-center top-0 h-full"
                style={{
                    'backgroundImage':
                        `url(${"https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg?cs=srgb&dl=pexels-pripicart-704857.jpg&fm=jpg"})`,
                }}

                data-swiper-parallax="-23%"
            />
            <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20" />
            <SwiperSlide className="!flex items-center justify-center" >
                <h3 className="text-white text-4xl font-bold">COLOCAR PUBLICAD ACA</h3>
            </SwiperSlide>
            <SwiperSlide className="!flex items-center justify-center">
                <h3 className="text-white text-4xl font-bold">COLOCAR PUBLICAD ACA</h3>
            </SwiperSlide>
            <SwiperSlide className="!flex items-center justify-center">
                <h3 className="text-white text-4xl font-bold">COLOCAR PUBLICAD ACA</h3>
            </SwiperSlide>
 
        </Swiper>
    )
}

export default SliderPromotion