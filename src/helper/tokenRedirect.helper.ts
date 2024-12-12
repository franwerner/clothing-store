
const tokenRedirect = () => {
    const querys = new URLSearchParams(window.location.search)
    const token = querys.get("token")
    const tokenRequest = querys.get("token_request")

    const url = new URL(window.location.href)

    if (!token || !tokenRequest) {
        url.pathname = ""
        url.search = ""
        return url
    }

    if (tokenRequest === "email_confirm") {
        url.pathname = "cuenta/confirmacion-email"
    } else if (tokenRequest === "password_reset_by_email") {
        url.pathname = "cuenta/restablecer-contraseña"
    }

    return url
}

export default tokenRedirect