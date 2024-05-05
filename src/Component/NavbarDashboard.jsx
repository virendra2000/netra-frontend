import useDarkMode from "./useDarkMode"
import { useState } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NavbarDashboard = () => {
    const [colorTheme, setTheme] = useDarkMode();
    axios.defaults.withCredentials = true;
    const history = useNavigate();
    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
        userId:'',
    });
    const callLogoutPage = async () => {
        try {
            const res = await axios.get("/logout");
            document.cookie = `jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            if (res.status == 200) {
                toast.success('Logout Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-500 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history('/', {replace:true});
                }, 2000);
            }
            else {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.log(err);
            history('/');
        }
    }
    const callProfile = async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            const data = res.data;
            setUserData(data);
            if (res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
        }
        catch(err) {
            console.error(err);
        }
    };
    callProfile()
    return (
        <>
            <ToastContainer autoClose={1000}/>
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
                <div className="flex flex-row gap-4 items-center justify-center">
                    {colorTheme === "light" ? (
                        <svg
                        onClick={() => setTheme("light")}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-blue-600 dark:text-white block cursor-pointer"
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
                        className="h-10 w-10 text-blue-600 dark:text-white block cursor-pointer"
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-white cursor-pointer" width="24" height="24" viewBox="0 0 24 24" onClick={callLogoutPage}><path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3z"/><path fill="currentColor" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"/></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 cursor-pointer" fill="none" viewBox="0 0 14 14" height="14" width="14" id="User-Circle-Single--Streamline-Core.svg"><g id="user-circle-single--circle-geometric-human-person-single-user"><path id="Ellipse 4" fill="#8fbffa" d="M0 7a7 7 0 1 0 14 0A7 7 0 1 0 0 7"></path><path id="Ellipse 5" fill="#2859c5" d="M4.5 5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0"></path><path id="Subtract" fill="#2859c5" d="M11.243 10.5A5.489 5.489 0 0 0 7 8.5a5.489 5.489 0 0 0 -4.243 2A5.489 5.489 0 0 0 7 12.5a5.489 5.489 0 0 0 4.243 -2Z"></path></g></svg>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-600">{userData.firstName} {userData.lastName}</span>
                        <span className="text-sm font-bold text-black dark:text-white">Security ID : {userData.userId}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NavbarDashboard