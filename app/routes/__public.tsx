import { Outlet } from "@remix-run/react"
import marketingStyles from "~/styles/marketing.css"
import { PublicHeader } from "~/components/navigation"
import { getUserFromSession } from "~/server/auth.server"

export default function PublicLayout() {
    return (
        <>
            <PublicHeader/>
            <Outlet/>
        </>
    )
}

export const loader = ({request}: {request: Request}) => getUserFromSession(request)

export const links = () => [
    {rel: "stylesheet", href: marketingStyles}
]