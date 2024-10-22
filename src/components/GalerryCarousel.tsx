import { Image } from "@nextui-org/react"
import { motion, PanInfo } from "framer-motion"
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react"

interface GalleryCarouselProps {
    images: Array<string>

}


interface Point {
    isActive: boolean
    onStage: (index: number) => void
    index: number
}

const Point = memo(({ isActive, index, onStage }: Point) => {
    return <span
        onClick={() => onStage(index)}
        className={`${isActive ? "bg-default-800 border" : "bg-white border border-default-900"} cursor-pointer w-[10px] h-[10px] rounded-full`} />
})


const GalleryCarousel = ({
    images = [],
}: GalleryCarouselProps) => {

    const [stage, setStage] = useState(0)
    const [width, setWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const onStage = useCallback(setStage, [])

    const onHandlerStage = (direction: number) => {
        setStage(prev => {
            if (direction < 0) {
                return prev + 1 > (images.length - 1) ? 0 : prev + 1
            } else {
                return prev - 1 < 0 ? (images.length - 1) : prev - 1
            }
        })
    }

    const onSetWidth = () => {
        if (!containerRef.current) return
        setWidth(containerRef.current.offsetWidth)
    }

    const onDragEnd = (_: PointerEvent, info: PanInfo) => {
        if (!containerRef.current) return
        const x = info.offset.x
        const { right } = containerRef.current.getBoundingClientRect()
        const minPercentage = right * 0.2
        if (x < (-1 * minPercentage) || x >= minPercentage) {
            onHandlerStage(x)
        }
    }

    useLayoutEffect(() => {
        onSetWidth()
        const resize = () => onSetWidth()

        const interval = setInterval(() => {
            onHandlerStage(-1)
        }, 1000 * 5);

        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize)
            if (interval) clearInterval(interval)
        }
    }, [stage])

    return (
        <section
            data-id="GalerryCarousel"
            ref={containerRef}
            className={"overflow-hidden  relative flex flex-col"}>
            <div
                className={"flex relative  max-h-[500px] cursor-pointer"}>
                <motion.div
                    className="flex w-full relative"
                    dragElastic={1}
                    transition={{
                        damping: 20
                    }}
                    dragConstraints={{ left: 0, right: -1 * width * stage }}
                    onDragEnd={onDragEnd}
                    animate={{
                        x: -1 * width * stage
                    }}
                    drag="x"
                >
                    {images.map((src, index) =>
                        <Image
                            key={index}
                            classNames={{
                                wrapper: "flex  flex-shrink-0 ",
                                img: "rounded-none object-cover w-full  "
                            }}
                            draggable={false}
                            src={src} />
                    )}
                </motion.div >
                <div className="bg-transparent gap-2 p-2 absolute flex justify-center">
                    {
                        images.map((i, index) => <Point
                            key={i}
                            onStage={onStage}
                            isActive={stage === index}
                            index={index} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default GalleryCarousel