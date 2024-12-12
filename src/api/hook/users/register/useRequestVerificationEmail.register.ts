import { useAlertContext } from "@/components/AlertGlobal"
import useFetchCustom from "@/hooks/useFetchCustom.hooks"
import router from "@/router"

const useRequestEmailVerification = () => {
     
    const alertHandler = useAlertContext()

   return useFetchCustom({
        target : "/users/register/send/token",
         method : "GET",
        onSuccess : (response) => {
            alertHandler({
                severity : "success",
                text : response.result.message
            })
        },
        onFailed : ({result}) => {
          const {code,message} = result
          if(code === "email_already_confirmed"){
            alertHandler({severity : "warning",text : message})
            router.navigate("/")
          }
        }
    })
}

export default useRequestEmailVerification