export const loader = ({ params }: { params: Record<string, string> }) => {
    if(params['*'] === "anything") {
        return null
    }

    throw new Response("Not found", { status: 404 })
}