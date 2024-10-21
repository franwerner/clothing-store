
import { motion, PanInfo } from "framer-motion";
import { createContext, ReactNode, useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import CarruselSwiper from "./Swiper.carrusel";

interface CarruselProps {
    classNames?: {
        body?: string,
        wrapper?: string,
        swiper?: string,
        content?: string
    }
    swiper?: "arrow" | "point"
    data: Array<any>
}

interface CarruselContextProps extends CarruselProps {
    onStage: (index: number) => void
    stage: number
    onHandlerStage: (direction: number) => void
}

const CarruselContext = createContext<CarruselContextProps>({
    classNames: {},
    data: [],
    swiper: "point",
    onStage: () => { },
    stage: 0,
    onHandlerStage: () => { }
})

const useCarrusel = () => {
    return useContext(CarruselContext)
}

const Carrusel = ({
    classNames = {},
    data = [],
    swiper = "arrow",
    children
}: CarruselProps & { children: ReactNode }) => {

    const [stage, setStage] = useState(0)
    const [width, setWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const onStage = useCallback(setStage, [])

    const onHandlerStage = (direction: number) => {
        setStage(prev => {
            if (direction < 0) {
                return prev + 1 > (data.length - 1) ? 0 : prev + 1
            } else {
                return prev - 1 < 0 ? (data.length - 1) : prev - 1
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
        <CarruselContext.Provider value={{ classNames, data, onStage, swiper, stage, onHandlerStage }}>
            <section
                data-slot="wrapper"
                ref={containerRef}
                className={`overflow-hidden relative flex flex-col pt-2 ${classNames.wrapper}`}>
                <div
                    data-slot="body"
                    className={`flex relative  max-h-[500px] cursor-pointer ${classNames.body}`}>
                    <motion.div
                        data-slot="content"
                        className={`flex w-full relative ${classNames.content}`}
                        dragElastic={1}
                        dragConstraints={{ left: 0, right: -1 * width * stage }}
                        onDragEnd={onDragEnd}
                        animate={{
                            x: -1 * width * stage
                        }}
                        drag="x"
                    >
                        {children}
                    </motion.div >
                    <div className="absolute pointer-events-none h-full w-full bg-black opacity-10 z-10" />
                </div>
                <CarruselSwiper />
            </section>
        </CarruselContext.Provider>
    )
}

export { useCarrusel };
export default Carrusel