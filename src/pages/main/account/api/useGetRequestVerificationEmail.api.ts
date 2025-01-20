import { useAlertContext } from "@/containers/alert-global"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import router from "@/router"

const useGetRequestEmailVerification = () => {

  const alertHandler = useAlertContext()

  return useFetchCustom({
    target: "/users/register/send/token",
    method: "GET",
    onSuccess: (response) => {
      alertHandler({
        color: "success",
        description: response.result.message
      })
    },
    onFailed: ({ result_error }) => {
      const { code, message } = result_error
      if (code === "email_already_confirmed") {
        alertHandler({ color: "primary", description: message })
        router.navigate("/")
      }
    }
  })
}

export default useGetRequestEmailVerification