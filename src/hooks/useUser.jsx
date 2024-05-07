import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function useUser() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const signInUrl = `https://idcurso-back-end.vercel.app/users/signin`

    const signIn = async (e) => {
        e.preventDefault()

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data)
                    router.replace("/myclasses")
                    return
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    return
                }
            })
    }

    return {
        setEmail,
        setPassword,
        signIn
    }
}