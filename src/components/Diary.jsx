"use client"

import Header from "@/containers/Header"
import Link from "next/link"
import Main from "@/containers/Main"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import { HiOutlinePencilAlt, HiPlus, HiX } from "react-icons/hi"
import useLesson from "@/hooks/useLesson"

export default function Diary({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    const {showLessonModal, closeLessonModal, lessonModalAction, description, setDescription, date, setDate, lessons, createLesson, updateLesson, createButtonClicked, editButtonClicked, submitButtonDisabled} = useLesson({classDescription})

    const lessonsList = lessons.map((lesson) => (
        <tr key={lesson.id}>
            <td className="text-center p-1 border-2 border-neutral-300">
                {lesson.date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1").toString()}
            </td>

            <td className="px-4 py-1 border-2 border-neutral-300">
                {lesson.description}
            </td>

            <td className="text-center p-1 border-2 border-neutral-300">
                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100" type="button">
                    <HiOutlinePencilAlt className="text-xl xs:text-base" title="Editar Aula" onClick={editButtonClicked}/>
                </button>
            </td>
        </tr>
    ))

    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    {classDescription}
                </Header>

                <div className="flex flex-col items-center absolute top-[100px] w-full bg-white text-neutral-800">
                    <div className="flex justify-evenly items-center w-1/2 xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-600 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/diary`}>
                            Diário
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/progress`}>
                            Progresso
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/students`}>
                            Alunos
                        </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm xs:text-xs">
                        <div className="flex justify-between w-full border-b-2 border-neutral-300">
                            <span className="text-lg p-2 sm:text-base">
                                Aulas
                            </span>

                            <button className="text-neutral-800 cursor-pointer p-2 rounded-full hover:bg-neutral-200" type="button">
                                <HiPlus className="text-2xl" title="Nova Aula" onClick={createButtonClicked}/>
                            </button>
                        </div>

                        <table className="w-full my-6 break-all text-neutral-800 rounded-xl">
                            <thead className="w-full">
                                <tr>
                                    <th className="w-1/5 p-2 border-2 border-neutral-300">Data</th>
                                    <th className="w-[65%] p-2 border-2 border-neutral-300">Descrição</th>
                                    <th className="w-[20%] p-2 border-2 border-neutral-300">Ação</th>
                                </tr>                            
                            </thead>

                            <tbody className="w-full">
                                {lessonsList}
                            </tbody>
                        </table>

                        {showLessonModal ? (
                            <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                {lessonModalAction === "Create" ? (
                                    <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[400px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]">
                                        <div className="absolute top-0 right-0 m-4">
                                            <HiX className="text-2xl cursor-pointer" title="Fechar" onClick={closeLessonModal}/>
                                        </div>

                                        <div className="text-lg sm:text-sm">
                                            <span>Nova Aula</span>
                                        </div>

                                        <div className="flex flex-col w-[80%] sm:text-xs">
                                            <input
                                                className="w-full bg-transparent mb-4 border-b border-neutral-800 placeholder:text-neutral-500 p-1 outline-none"
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Descrição da aula"
                                                minLength="3"
                                                maxLength="30"
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />

                                            <input
                                                className="flex justify-end w-full bg-transparent border-b border-neutral-800 p-1 outline-none"
                                                id="date"
                                                name="date"
                                                type="date"
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-end w-[80%] sm:text-xs">
                                            <button className="w-[40%] bg-blue-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                <span>Próximo</span>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    null
                                )}
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </Section>
        </Main>
    )
}
