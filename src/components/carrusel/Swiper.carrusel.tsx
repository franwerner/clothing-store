import { memo } from "react"
import { useCarrusel } from "."

interface Point {
    isActive: boolean
    onStage: (index: number) => void
    index: number
}

const Point = memo(({ isActive, index, onStage }: Point) => {
    return <span
        onClick={() => onStage(index)}
        className={`${isActive ? "bg-default-900" : "bg-default-300"} cursor-pointer w-[12px] h-[12px] rounded-full`} />

})

const SwiperPoint = () => {
    const { classNames, data, onStage, stage } = useCarrusel()
    return (
        <div
            data-slot="swiper"
            className={`bg-white gap-5 p-2 flex justify-center ${classNames?.swiper}`}>
            {
                data.map((_, index) => <Point
                    onStage={onStage}
                    index={index}
                    isActive={index === stage}
                    key={index} />)
            }
        </div>
    )
}

const SwiperArrow = () => {

    const { classNames, onHandlerStage } = useCarrusel()

    return (
        <div
            data-slot="swiper"
            className={`absolute  top-1/2 transform -translate-y-1/2 flex px-2 justify-between w-full text-white  ${classNames?.swiper}`}>
            <span
                onClick={() => onHandlerStage(1)}
                className="material-symbols-outlined cursor-pointer text-[50px]">
                arrow_back_ios
            </span>
            <span
                onClick={() => onHandlerStage(-1)}
                className="material-symbols-outlined rotate-180 cursor-pointer text-[50px]">
                arrow_back_ios
            </span>
        </div>
    )
}

const CarruselSwiper = () => {
    const { swiper } = useCarrusel()

    return swiper == "point" ? <SwiperPoint /> : <SwiperArrow />
}

export default CarruselSwiper