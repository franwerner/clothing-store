import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { GuestQuestionSchema } from "clothing-store-shared/schema"

const usePostUserQuestionsGuest = (props: GuestQuestionSchema.Insert,action:() => void) => {

    const alertHandler = useAlertContext()
    return useFetchCustom({
        target: "/guests/questions",
        method: "POST",
        body: props,
        onSuccess({ result }) {
            const { message } = result
            alertHandler({ color: "success", description: message })
            action()
        },
        onFailed({ result_error }) {
            const { message } = result_error
            alertHandler({ color: "danger", description: message })
        }
    })
}

export default usePostUserQuestionsGuest