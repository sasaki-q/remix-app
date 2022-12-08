import { destroyUserSession } from "~/server/auth.server"

export const action = async({request}: {request: Request}) => {
    if(request.method !== "POST") {
        throw new Error("Invalid request method")
    }

    return destroyUserSession(request)
}