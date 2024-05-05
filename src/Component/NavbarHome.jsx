import useDarkMode from "./useDarkMode"
const NavbarHome = () => {
    const [colorTheme, setTheme] = useDarkMode();
    return (
        <>
            <div className="p-3 flex flex-row items-center justify-between w-full bg-slate-100 dark:bg-slate-800 shadow-lg shadow-gray-500 dark:shadow-slate-500">
                <div className="flex flex-row items-center justify-between gap-2">
                    <div className="logoimg">
                        <img src="/logo.png" className="logoimg" width="80px" height="70px"/>
                    </div>
                    <div className="logotxt flex flex-col">
                        <h1 className="text-4xl font-bold text-blue-700 dark:text-white">NETRA</h1>
                        <p className="text-[10px] font-bold text-black dark:text-white">Ultimate Solution for all your need</p>
                    </div>
                </div>

                {colorTheme === "light" ? (
                    <svg
                        onClick={() => setTheme("light")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-black dark:text-white block cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                ) : (
                    <svg
                        onClick={() => setTheme("dark")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-black dark:text-white block cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                )}
            </div>
        </>
    )
}
export default NavbarHome