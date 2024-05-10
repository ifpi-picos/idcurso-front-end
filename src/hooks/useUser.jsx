import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

export default function useUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const router = useRouter()

    const signUpUrl = `https://idcurso-back-end.vercel.app/users`
    const signInUrl = `https://idcurso-back-end.vercel.app/users/signin`
    const forgotPasswordUrl = `https://idcurso-back-end.vercel.app/users/forgotpassword`
    const redefinePasswordUrl = `https://idcurso-back-end.vercel.app/users/redefinepassword`

    const signUp = useCallback(async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return alert("Campo senha e confirmar senha distintos!")
        }

        setSubmitButtonDisabled(true)

        await axios
                    .post(signUpUrl, {name, email, password, confirmPassword})
                    .then((res) => {
                        if (res.status === 201) {
                            alert(res.data)
                            router.push("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }
                    })
    }, [name, email, password, confirmPassword])

    const signIn = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
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
                            setSubmitButtonDisabled(false)
                            return
                        }
                    })
    }, [email, password])

    const forgotPassword = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .post(forgotPasswordUrl, {email})
                    .then((res) => {
                        if (res.status === 200) {
                            alert("Pedido de solicitação enviado para seu email!")
                            localStorage.setItem("token", res.data)
                            setSubmitButtonDisabled(false)
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }
                    })
    }, [email])

    const redefinePassword = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(redefinePasswordUrl, {password, confirmPassword}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
    }, [password, confirmPassword])

    return {
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        signUp,
        signIn,
        forgotPassword,
        redefinePassword,
        submitButtonDisabled
    }
}