"use client"

import { createContext, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"

export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const router = useRouter()

    const verifyToken = useCallback(() => {
        const token = localStorage.getItem("token")
        console.log(token)

        if (!token) {
            return router.replace("/")
        }

        return token
    }, [router])

    useEffect(() => {
        verifyToken()
    }, [verifyToken, router])

    return (
        <AuthContext.Provider value={verifyToken}>
            {children}
        </AuthContext.Provider>
    )
}
