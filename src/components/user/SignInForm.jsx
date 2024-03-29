"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import VisiblePassword from "./VisiblePassword"

export default function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visiblePassoword, setVisiblePassword] = useState(false)
    const [signInButtonDisabled, setSignInButtonDisabled] = useState(false)

    const router = useRouter()

    const signInUrl = "https://idcurso-back-end.vercel.app/users/signin"

    const signIn = (e) => {
        e.preventDefault()

        setSignInButtonDisabled(true)

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                if (res.status === 200) {
                    setSignInButtonDisabled(false)
                    localStorage.setItem("token", res.data.token)

                    if (res.data.userType === "administrador") {
                        return router.replace("/users")
                    }
                    
                    return router.replace("/classes")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setSignInButtonDisabled(false)
                    return
                }
            })
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50">
            <form className="flex justify-center items-center w-1/3 bg-blue-500 rounded-xl shadow-md" onSubmit={signIn}>
                <fieldset className="flex flex-col items-center w-5/6 my-10 border border-gray-50 rounded-xl">
                    <div className="flex justify-center items-center my-16 text-gray-50 text-xl">
                        <span>Login</span>
                    </div>

                    <div className="flex flex-col items-center w-5/6 my-5">
                        <div className="flex justify-center items-center w-full mb-5">
                            <input
                                className="w-full px-3 py-2 rounded-xl"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                maxLength="60"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-center items-center w-full">
                            <input
                                className="w-full pl-3 pr-12 py-2 rounded-xl"
                                id="password"
                                name="password"
                                type={!visiblePassoword ? "password" : "text"}
                                placeholder="Senha"
                                minLength="6"
                                maxLength="15"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <VisiblePassword
                                visiblePassoword={visiblePassoword}
                                setVisiblePassword={setVisiblePassword}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end w-5/6">
                            <Link className="underline text-gray-50" href="/forgotpassword">
                                esqueceu senha?
                            </Link>
                    </div>

                    <div className="flex flex-col items-center my-10 text-gray-50">
                        <button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl" disabled={signInButtonDisabled}>
                            Entrar
                        </button>

                        <Link className="underline" href="/signup">
                            Cadastrar-se
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
