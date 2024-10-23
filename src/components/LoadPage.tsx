import { CircularProgress } from "@nextui-org/react"

const LoadPage = ({ screen = "min" }: { screen?: "full" | "min" }) => (
    <div className={`flex w-full min-h-[${screen == "full" ? 100 : 50}dvh]`}>
        <CircularProgress
            className="m-auto"
            size="lg"
            color="secondary"
            aria-label="Loading..." />
    </div>
)

export default LoadPage