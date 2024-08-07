"use client"

import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Header from "../containers/Header"
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus, HiUsers, HiX } from "react-icons/hi"
import Image from "next/image"
import Link from "next/link"
import Loading from "./Loading"
import Main from "../containers/Main"
import Section from "../containers/Section"
import SideBar from "./SideBar"
import useMyClass from "@/hooks/useMyClass"
import useSideBar from "@/hooks/useSideBar"

export default function MyClasses() {
    const {pageActive} = useSideBar()

    const {loading, showConfirmModal, closeConfirmModal, showClassModal, classModalAction, openClassModal, closeClassModal, myClasses, description, setDescription, createMyClass, updateMyClass, deleteMyClass, createButtonClicked, editButtonClicked, deleteButtonClicked, submitButtonDisabled} = useMyClass()

    const myClassesList = myClasses.map((myClass) => 
        <div key={myClass.id} className="flex flex-col justify-between w-80 h-56 border-2 border-neutral-300 rounded-xl shadow-md cursor-pointer hover:shadow-xl">
            <Link className="flex justify-center items-center w-full border-b-2 border-neutral-300"  href={`/myclasses/${myClass.description}/diary`}>
                <span className="px-2 py-[12px] hover:underline break-words">
                    {myClass.description}
                </span>
            </Link>

            <div className="flex justify-between items-center w-full">
                <div className="flex">
                    <HiUsers className="mt-[2px] ml-4 sm:mt-[3px] xs:mt-[2px]" title="Alunos"/>
                    <span className="text-sm ml-2 mb-1">{myClass.numberOfStudents}/50</span>
                </div>

                <div>
                    <button className="mr-2 mb-2 text-green-600 rounded-full hover:bg-green-100 p-2" type="button" onClick={() => editButtonClicked(myClass)}>
                        <HiOutlinePencilAlt className="text-xl" title="Editar Turma"/>
                    </button>

                    <button className="mr-4 mb-2 text-red-500 rounded-full hover:bg-red-100 p-2" type="button" onClick={() => deleteButtonClicked(myClass)}>
                        <HiOutlineTrash className="text-xl" title="Excluir Turma"/>
                    </button>
                </div>
            </div>
        </div>        
    )

    return (
        <Main>
            <SideBar myClassesPage={pageActive}/>

            <Section>
                <Header>
                    <span>
                        Minhas Turmas
                    </span>

                    <span className="fixed top-[18px] right-4 z-20 text-neutral-800 cursor-pointer p-2 rounded-full hover:bg-neutral-200" onClick={createButtonClicked}>
                        <HiPlus className="text-2xl" title="Nova Turma"/>
                    </span>
                </Header>

                {loading ? (
                    <Loading/>
                ) : (
                    myClasses.length === 0 ? (
                        <div className="flex flex-col justify-center items-center w-1/4 mt-20 xl:w-[30%] lg:w-[35%] lg:mt-[100px] md:w-2/5 sm:w-1/2 xs:w-4/5">
                            <div className="w-full">
                                <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                            </div>

                            <button className="w-3/5 py-1 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button" onClick={openClassModal}>
                                <span>Crie uma Turma</span>
                            </button>

                            {showClassModal ? (
                                <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                    <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[400px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={createMyClass}>
                                        <span className="absolute top-0 right-0 m-4" onClick={closeClassModal}>
                                            <HiX className="text-2xl cursor-pointer"/>
                                        </span>

                                        <div className="text-lg sm:text-sm">
                                            <span>Nova Turma</span>
                                        </div>

                                        <div className="flex items-center w-[80%] border-b border-neutral-800 sm:text-xs">
                                            <input
                                                className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Nome da turma"
                                                minLength="3"
                                                maxLength="30"
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                            <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeClassModal}>
                                                <span>Cancelar</span>
                                            </button>

                                            <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                <span>Criar</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center absolute top-[90px] w-full bg-white text-neutral-800">
                            <div className="flex flex-wrap gap-4 mx-4 mb-4 w-full bg-white sm:justify-center">
                                {myClassesList}

                                {showConfirmModal ? (
                                    <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                        <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[200px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-[65%] sm:w-4/5 xs:w-[95%]" onSubmit={deleteMyClass}>
                                                <span className="absolute top-0 right-0 m-4" onClick={closeConfirmModal}>
                                                    <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                                </span>
                                                    
                                                <div className="flex justify-center items-center mt-6 text-lg font-medium">
                                                    <span>Excluir essa turma?</span>
                                                </div>
                                
                                                <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                                    <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeConfirmModal}>
                                                        <span>Cancelar</span>
                                                    </button>

                                                    <button className="w-[40%] bg-blue-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                        <span>Confirmar</span>
                                                    </button>
                                                </div>
                                        </form>
                                    </div>
                                ) : (
                                    null
                                )}

                                {showClassModal ? (
                                    <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                        {classModalAction === "Create" ? (
                                            <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[350px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={createMyClass}>
                                                <span className="absolute top-0 right-0 m-4" onClick={closeClassModal}>
                                                    <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                                </span>

                                                <div className="text-lg sm:text-sm">
                                                    <span>Nova Turma</span>
                                                </div>

                                                <div className="flex items-center w-[80%] border-b border-neutral-800 sm:text-xs">
                                                    <input
                                                        className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        placeholder="Nome da turma"
                                                        minLength="3"
                                                        maxLength="30"
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                                    <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeClassModal}>
                                                        <span>Cancelar</span>
                                                    </button>

                                                    <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                        <span>Criar</span>
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[350px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={updateMyClass}>
                                                <span className="absolute top-0 right-0 m-4" onClick={closeClassModal}>
                                                    <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                                </span>

                                                <div className="text-lg sm:text-sm">
                                                    <span>Editar Turma</span>
                                                </div>

                                                <div className="flex items-center w-[80%] border-b border-neutral-800 sm:text-xs">
                                                    <input
                                                        className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        placeholder="Nome da turma"
                                                        minLength="3"
                                                        maxLength="30"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                                    <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeClassModal}>
                                                        <span>Cancelar</span>
                                                    </button>

                                                    <button className="w-[40%] bg-green-600 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                        <span>Editar</span>
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                        
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                    )
                )}
            </Section>
        </Main>
    )
}
