"use client"

import axios from "axios"
import Header from "./Header"
import { HiUser } from "react-icons/hi"
import Main from "./Main"
import PrivateRoute from "./PrivateRoute"
import Section from "./Section"
import SideBar from "./SideBar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [visibleButtonEdit, setVisibleButtonEdit] = useState(true)
    const [id, setId] = useState()

    const router = useRouter()

    const getUserUrl = `https://idcurso-back-end.vercel.app/users/self`
    const updateUserUrl = `https://idcurso-back-end.vercel.app/users/update/${id}`

    useEffect(() => {
        axios.get(getUserUrl, { headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }})
        .then((res) => {
            if (res.status === 200) {
                setId(res.data.id)
                setName(res.data.name)
                setEmail(res.data.email)
                return
            }

            if (res.status === 401) {
                localStorage.clear()
                return router.replace("/")
            }
        })
        .catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                return router.replace("/")
            }
        })
    }, [])

    const editButtonClicked = (e) => {
        e.preventDefault()
        setVisibleButtonEdit(false)
    }

    const cancelButtonClicked = () => {

        axios.get(getUserUrl, { headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }})
        .then((res) => {
            if (res.status === 200) {
                setId(res.data.id)
                setName(res.data.name)
                setEmail(res.data.email)
                setVisibleButtonEdit(true)
                return
            }

            if (res.status === 401) {
                localStorage.clear()
                return router.replace("/")
            }
        })
        .catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                return router.replace("/")
            }
        })
    }

    const updateUser = (e) => {
        e.preventDefault()

        axios
            .put(updateUserUrl, {name, email}, {headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }})
            .then((res) => {
                if (res.status === 200) {
                    setVisibleButtonEdit(true)
                    return alert(res.data)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    return (
        <PrivateRoute url={getUserUrl}>
            <SideBar/>

            <Main>
                <Header>
                    <div className="flex justify-center items-center">
                        <span>Perfil do Usuário</span>
                    </div>
                </Header>
                
                <Section>
                    <div className="flex justify-center items-center w-2/5 border border-b-0 rounded-b-none rounded-xl">
                        <HiUser className="mt-16" size="135"/>
                    </div>

                    <form className="flex justify-center items-center w-2/5 border border-t-0 shadow-md rounded-t-none rounded-xl" onSubmit={updateUser}>
                        <fieldset className="flex flex-col items-center w-5/6 my-10">
                            <div className="flex flex-col items-center w-5/6 my-5">
                                {visibleButtonEdit ? (
                                    <>
                                        <div className="flex justify-center items-center w-full mb-5">
                                            <input
                                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Nome"
                                                maxLength="30"
                                                value={name}
                                                readOnly
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-full mb-5">
                                            <input
                                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                maxLength="60"
                                                value={email}
                                                readOnly
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-full my-5 text-gray-50">
                                            <button className="px-6 py-3 bg-blue-500 rounded-lg" type="button" onClick={editButtonClicked}>
                                                Editar
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-center items-center w-full mb-5">
                                            <input
                                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                id="name"
                                                name="name"
                                                maxLength="30"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-full mb-5">
                                            <input
                                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                maxLength="60"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-evenly items-center w-4/5 my-5 text-gray-50">
                                            <button className="px-6 py-3 bg-blue-500 rounded-xl">
                                                Salvar
                                            </button>

                                            <button className="px-6 py-3 bg-red-500 rounded-xl" type="button" onClick={cancelButtonClicked}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </>
                                )}                               
                            </div>
                        </fieldset>
                    </form>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
