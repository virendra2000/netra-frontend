import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Banner from './Banner'
import Footer from './Footer';
import useDarkMode from "./useDarkMode"
const ErrorPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [colorTheme, setTheme] = useDarkMode();
    return (
    <>
    <div className="bg-slate-100 dark:bg-slate-800 min-h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
        <Banner/>
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
            <a href="#" className="flex flex-row-reverse gap-4 items-center justify-between">
                <span className="text-3xl font-bold text-blue-600 dark:text-white">Netra AI</span>
                <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="netra"
                />
            </a>
            </div>
            <div className="flex lg:hidden">
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
            >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6 text-gray-900 dark:text-white" aria-hidden="true" />
            </button>
            </div>
            <div className="hidden md:flex md:flex-row items-center gap-4">
            {colorTheme === "light" ? (
                    <svg
                        onClick={() => setTheme("light")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black dark:text-white block cursor-pointer"
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
                        className="h-5 w-5 text-black dark:text-white block cursor-pointer"
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
                <a href="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white border border-black dark:border-white px-4 py-1 rounded-full">
                    Login <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="/register" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white border border-black dark:border-white px-4 py-1 rounded-full">
                    Join Us <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <a href="#" className="flex flex-row-reverse gap-4 items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600">Netra AI</span>
                    <img
                        className="h-8 w-auto"
                        src="/logo.png"
                        alt="netra"
                    />
                </a>
                <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-black dark:text-white" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                    <a
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900"
                    >
                    Login
                    </a>
                    <a
                    href="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900"
                    >
                    Join Us
                    </a>
                </div>
                </div>
            </div>
            </Dialog.Panel>
        </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"  style={{clipPath:'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
            />
        </div>
        <div className="mx-auto py-28 sm:py-24 gap-4">
            <div className="flex flex-col items-center justify-center">
                <img src="/404notfound.svg" width={400} alt="illustrate"/>

                <p className="text-[90px] font-bold text-indigo-600">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>

                <a href="/" className="mt-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
            </div>
        </div>
        </div>
    </div>
    <Footer/>
    </>
    )
}
export default ErrorPage