"use client"

import Header from "@/containers/Header"
import { HiMail, HiUser } from "react-icons/hi"
import Loading from "./Loading"
import Main from "@/containers/Main"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import useSideBar from "@/hooks/useSideBar"
import useUser from "@/hooks/useUser"
import { useEffect } from "react"

export default function Profile() {
    const {
        pageActive
    } = useSideBar()

    const {
        loading,
        name,
        email,
        editUser,
        submitButtonDisabled,
        setName,
        setEmail,
        readUser,
        updateUser,
        editButtonClicked,
        cancelButtonClicked
    } = useUser()

    useEffect(() => {
        readUser()
    }, [readUser])

    return (
        <Main>
            <SideBar profilePage={pageActive}/>

            <Section>
                <Header>
                    Meu Perfil
                </Header>

                {loading ? (
                    <Loading/>
                ) : (
                    <form className="flex flex-col justify-evenly items-center w-[35%] h-[500px] mt-[75px] border border-gray-300 rounded-xl shadow-md xl:w-[45%] lg:w-[55%] md:w-[65%] sm:w-4/5 sm:text-sm xs:w-full xs:border-none xs:rounded-none xs:shadow-none xs:h-[450px]" onSubmit={updateUser}>
                        <HiUser className="text-8xl"/>

                        <div className="flex flex-col items-center w-4/5">
                            <div className="flex items-center w-full mb-4 border-b border-gray-800">
                                <HiUser className="w-[10%] text-lg"/>

                                <input
                                    className="w-full bg-transparent placeholder:text-gray-500 p-1 outline-none"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nome"
                                    minLength="3"
                                    maxLength="30"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    readOnly={editUser ? false : true}
                                    required
                                />
                            </div>

                            <div className="flex items-center w-full border-b border-gray-800">
                                <HiMail className="w-[10%] text-lg"/>

                                <input
                                    className="w-full bg-transparent placeholder:text-gray-500 p-1 outline-none"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    minLength="12"
                                    maxLength="60"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly={editUser ? false : true}
                                    required
                                />
                            </div>
                        </div>

                        {editUser ? (
                            <div className="flex justify-between w-[80%] sm:flex-col-reverse">
                                <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={cancelButtonClicked}>
                                    <span>Cancelar</span>
                                </button>

                                <button className="w-[40%] bg-blue-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                    <span>Salvar</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center w-[80%]">
                                <button className="w-[40%] bg-green-600 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={editButtonClicked}>
                                    <span>Editar</span>
                                </button>
                            </div>
                        )}
                    </form>
                )}
            </Section>
        </Main>
    )
}
