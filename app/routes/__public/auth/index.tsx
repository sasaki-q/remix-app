import authStyles from "~/styles/auth.css"
import { AuthForm } from "~/components/auth/AuthForm"

export default function AuthPage() {
    return <AuthForm/>
}

export const links = () => [
    {rel: "stylesheet", href: authStyles},
]

export const action = async({request}: {request: Request}) => {
    const searchParams = new URL(request.url).searchParams
    const authMode = searchParams.get("mode") || "login"

    const formData = await request.formData()
    const sendData = Object.fromEntries(formData)
}