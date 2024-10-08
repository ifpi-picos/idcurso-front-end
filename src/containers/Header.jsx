export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 z-10 w-full h-[75px] bg-white text-gray-800 text-xl border-2 border-gray-300 lg:text-lg sm:text-base">
            {children}
        </header>
    )
}
