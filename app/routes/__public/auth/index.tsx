import authStyles from "~/styles/auth.css"
import { AuthForm } from "~/components/auth/AuthForm"
import { CredentialType } from "~/types"
import { login, signup } from "~/server/auth.server"
import { redirect } from "@remix-run/node"

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
    const credentials = Object.fromEntries(formData) as unknown as CredentialType

    return await authMode === "login" ? login(credentials) : signup(credentials)
}