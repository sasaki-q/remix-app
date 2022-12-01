import { Outlet } from "@remix-run/react"
import marketingStyles from "~/styles/marketing.css"
import { PublicHeader } from "~/components/navigation"

export default function PublicLayout() {
    return (
        <>
            <PublicHeader/>
            <Outlet/>
        </>
    )
}

export const links = () => [
    {rel: "stylesheet", href: marketingStyles}
]