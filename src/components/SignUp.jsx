"use client"

import { HiLockClosed, HiMail, HiOutlineEye, HiOutlineEyeOff, HiUser } from "react-icons/hi"
import Image from "next/image"
import Link from "next/link"
import SignUpImg from "../../assets/SignUpImg.jpg"
import { useState } from "react"
import useUser from "@/hooks/useUser"

export default function SignUp() {
    const [visiblePassword, setVisblePassword] = useState(false)
    const [visibleConfirmPassword, setVisbleConfirmPassword] = useState(false)
    const {setName, setEmail, setPassword, setConfirmPassword, signUp, submitButtonDisabled} = useUser()

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50 text-white">
            <div className="flex w-3/5 h-[500px] rounded-xl shadow-md xl:w-[70%] lg:w-[50%] md:w-[60%] sm:w-[70%] sm:text-sm xs:w-[95%] xs:h-[450px] xs:text-xs">
                <div className="flex justify-center items-center w-1/2 h-full rounded-s-xl lg:hidden">
                    <Image className="h-full rounded-s-xl" src={SignUpImg} alt="Imagem ilustrativa" priority/>
                </div>

                <form className="flex flex-col justify-evenly items-center w-1/2 h-full bg-blue-500 font-semibold rounded-e-xl lg:w-full lg:rounded-xl" onSubmit={signUp}>
                    <div className="flex justify-center items-center w-4/5 text-lg md:text-base sm:text-sm">
                        <span>Criar Conta</span>
                    </div>

                    <div className="flex flex-col items-center justify-evenly w-4/5">
                        <div className="flex items-center w-full mb-4 border-b">
                            <HiUser className="w-[10%] text-lg"/>

                            <input
                                className="w-[90%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="30"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mb-4 border-b">
                            <HiMail className="w-[10%] text-lg"/>

                            <input
                                className="w-[90%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                minLength="12"
                                maxLength="60"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mb-4 border-b">
                            <HiLockClosed className="w-[10%] text-lg"/>

                            <input
                                className="w-[80%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="password"
                                name="password"
                                type={!visiblePassword ? "password" : "text"}
                                placeholder="Senha"
                                minLength="6"
                                maxLength="18"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            
                            {visiblePassword ? (
                                <button className="flex justify-center w-[10%] text-lg cursor-pointer" type="button" onClick={() => setVisblePassword(false)}>
                                    <HiOutlineEyeOff title="Não exibir senha"/>
                                </button>
                            ) : (
                                <button className="flex justify-center w-[10%] text-lg cursor-pointer" type="button" onClick={() => setVisblePassword(true)}>
                                    <HiOutlineEye title="Exibir senha"/>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center w-full border-b">
                            <HiLockClosed className="w-[10%] text-lg"/>

                            <input
                                className="w-[80%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="confirmPassword"
                                name="confirmPassword"
                                type={!visibleConfirmPassword ? "password" : "text"}
                                placeholder="Confirmar senha"
                                minLength="6"
                                maxLength="18"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            
                            {visibleConfirmPassword ? (
                                <button className="flex justify-center w-[10%] text-lg cursor-pointer" type="button" onClick={() => setVisbleConfirmPassword(false)}>
                                    <HiOutlineEyeOff title="Não exibir confirmar senha"/>
                                </button>
                            ) : (
                                <button className="flex justify-center w-[10%] text-lg cursor-pointer" type="button" onClick={() => setVisbleConfirmPassword(true)}>
                                    <HiOutlineEye title="Exibir confirmar senha"/>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center w-4/5">
                        <button className="w-full bg-blue-400 mb-4 py-1 rounded-xl hover:shadow-xl sm:py-2" disabled={submitButtonDisabled}>
                            <span>Registrar-se</span>
                        </button>

                        <Link className="hover:underline" href="/">
                            <span>Entrar</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
