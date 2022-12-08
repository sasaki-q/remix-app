import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { compare, hash } from "bcryptjs"
import { CredentialType } from "~/types"
import { prisma } from "./database.server";

type CreateSessionProps = {
    userId: string,
    redirectPath: string
}

const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.SECRET_KEY ?? "secret_key"],
        httpOnly: true,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
    }
})

const createSession = async(userId: string) => {
    const session = await sessionStorage.getSession()
    session.set("userId", userId)
    const cookie = await sessionStorage.commitSession(session)

    return redirect("/expenses", {
        headers: { "Set-Cookie": cookie }
    })
}

export const getUserFromSession = async(request: Request): Promise<string | null> => {
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    )

    const userId = session.get("userId")
    return userId ?? null;
}

export const destroyUserSession = async(request: Request) => {
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    )

    const res = await sessionStorage.destroySession(session)

    return redirect("/", {
        headers: { "Set-Cookie": res }
    })
}

export const requireUserSession = async(request: Request) => {
    const userId = await getUserFromSession(request)

    if(!userId) throw redirect("/")

    return userId
}

export const signup = async({email, password}: CredentialType) => {
    try{
        const exsitedUser = await prisma.user.findFirst({ where: { email } })

        if(exsitedUser) {
            throw new Error("this email has already been taken")
        }

        const hashedPassword = await hash(password, 12)

        const createdUser = await prisma.user.create({data: { email, password: hashedPassword }})

        return createSession(createdUser.id)

    }catch(err) {
        console.log("DEBUG signup error message === ", err)
        throw err
    }
}

export const login = async({email, password}: CredentialType) => {
    try{
        const exsitedUser = await prisma.user.findFirst({ where: { email } })

        if(!exsitedUser) {
            throw new Error("user does not exist")
        }

        const isCorrect = await compare(password, exsitedUser.password)
        if(!isCorrect) {
            throw new Error("password is wrong")
        }

        return createSession(exsitedUser.id,)
    }catch(err) {
        console.log("DEBUG signup error message === ", err)
        throw err
    }
}