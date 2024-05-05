const Footer = () => {
    return (
        <>
            <div className="p-5 flex flex-row items-center justify-between bg-slate-200 dark:bg-slate-800 text-black dark:text-white font-bold shadow-lg shadow-gray-500">
                <p>Copyright 2024 - Netra @ All rights reserved®</p>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="bg-slate-800 dark:bg-white text-white dark:text-black  rounded-md" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg>
                </a>
            </div>
        </>
    )
}
export default Footer