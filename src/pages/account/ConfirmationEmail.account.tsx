import useConfirmationEmail from "@/pages/account/api/useConfirmationEmail.api"
import { Spinner } from "@nextui-org/react"
import { useEffect } from "react"
import { useSearchParams } from "react-router"

const ConfirmationEmail = () => {
    const [params] = useSearchParams()
    const { setRequest, isLoading } = useConfirmationEmail(params.get("token") || "")

    useEffect(() => {
        setRequest()
    }, [])

    return isLoading && <div className="w-full flex flex-col gap-2  flex-1 justify-center items-center">
        <Spinner color="secondary" size="lg" />
        <p className="uppercase text-xl">Verificando token...</p>
    </div>
}

export default ConfirmationEmail