import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import { UserQuestionSchema } from "clothing-store-shared/schema"

const usePostUserQuestionsGuest = (props: Omit<UserQuestionSchema.Insert, "is_guest" | "user_fk">) => {

    const alertHandler = useAlertContext()
    return useFetchCustom({
        target: "/users/questions/guest",
        method: "POST",
        body: props,
        onSuccess({ result }) {
            const { message } = result
            alertHandler({ color: "success", description: message })
        },
        onFailed({ result_error }) {
            const { message } = result_error
            alertHandler({ color: "danger", description: message })
        }
    })
}

export default usePostUserQuestionsGuest