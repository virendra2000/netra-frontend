import useDarkMode from "./useDarkMode"
import { Bars3Icon,XMarkIcon } from '@heroicons/react/24/outline'
import { useState , useEffect,useCallback } from "react";
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    const [colorTheme, setTheme] = useDarkMode();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const history = useNavigate();
    axios.defaults.withCredentials = true;
    const [weaponData, setWeaponData] = useState([]);
    const [countDetail, setCountDetail] = useState({
        alertLength:0,
        areaLength:0,
        subareaLength:0
    });
    const [userData,setUserData] = useState({
        role: '',
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileno:'',
        city:'',
        state:'',
        country:'',
        zipcode:''
    });
    const callDashboardPage = useCallback(async () => {
        try {
            const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            const res = await axios.get("/dashboard",{
                headers:{
                    'jwtoken':cookieValue
                }
            });
            
            const data = res.data;
            setUserData(data);
            if(res.status !== 200) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            else {
                toast.info(`Welcome ${data.firstName} ${data.lastName}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-blue-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        }
        catch(err) {
            history('/');
        }

        try {
            const res = await axios.get("/admindashboard/detail",{
                headers:{
                    'jwtoken':document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
                }
            });
            const data = res.data;
            setCountDetail(data);
        } catch (error) {
            console.log(error);
        }
    },[history]);
    useEffect(() => {
        callDashboardPage();
    },[callDashboardPage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/alerts');
                setWeaponData(response.data);
            }
            catch (error) {
                console.error('Error fetching weapon data:', error);
            }
        };
    fetchData();
    }, []);
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
    const [showModal, setShowModal] = useState(false);
    const [selectedImageData, setSelectedImageData] = useState(null);
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    const ImageModal = () => {
        return (
            <div
                className="fixed z-10 inset-0 overflow-y-auto"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h3 className="py-5 text-3xl font-bold text-blue-600 dark:text-white">Netra AI Image Viewer</h3>
                        <img
                            src={`data:image/jpeg;base64,${arrayBufferToBase64(selectedImageData)}`}
                            alt="detection_image"
                        />
                        <button
                            className="bg-blue-600 dark:bg-white text-white dark:text-blue-600 font-bold py-2 px-4 rounded mt-4"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <ToastContainer autoClose={1000}/>
            <div className="p-5 md:p-10 bg-slate-200 dark:bg-slate-800 min-h-screen flex flex-row gap-6 w-auto md:w-full">
                <div className={`p-5 w-[25%] h-[90vh] bg-white dark:bg-slate-700 rounded-xl justify-between md:justify-normal shadow-md shadow-slate-400 dark:shadow-none ${menuOpen ? 'p-2 w-[50%] absolute flex flex-col' : 'relative hidden md:flex md:flex-col'}`}>
                    <div className="flex flex-col">
                        <div className="p-5">
                            <XMarkIcon className="h-6 w-6 cursor-pointer text-black dark:text-white block md:hidden" aria-hidden="true" onClick={toggleMenu}/>
                        </div>
                        <div className="p-5 logo flex flex-row items-center justify-start gap-4">
                            <img src="/logo.png"  width={50}/>
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-white">NETRA AI</h3>
                        </div>
                        <div className="p-2 logo flex flex-row items-center justify-start gap-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white" onClick={() => {
                                history('/Dashboard');
                            }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                            <h3 className="text-lg font-bold text-black dark:text-white">Dashboard</h3>
                        </div>
                        <div className="p-2 logo flex flex-row items-center justify-start gap-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <h3 className="text-lg font-bold text-black dark:text-white">Chats</h3>
                        </div>
                        <div className="p-2 logo flex flex-row items-center justify-start gap-4 cursor-pointer" onClick={() => {
                                history('/AllotedArea');
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                            </svg>
                            <h3 className="text-lg font-bold text-black dark:text-white">Alloted Area</h3>
                        </div>
                        <div className="p-2 logo flex flex-row items-center justify-start gap-4 cursor-pointer" onClick={() => {
                                history('/AllotedSubArea');
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                            </svg>
                            <h3 className="text-lg font-bold text-black dark:text-white">Alloted Sub-Area</h3>
                        </div>
                        <div className="p-2 logo flex flex-row items-center justify-start gap-4 cursor-pointer" onClick={callLogoutPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <h3 className="text-lg font-bold text-black dark:text-white">Log Out</h3>
                        </div>
                    </div>

                    <div className="flex flex-row md:hidden items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 cursor-pointer" fill="none" viewBox="0 0 14 14" height="14" width="14" id="User-Circle-Single--Streamline-Core.svg"><g id="user-circle-single--circle-geometric-human-person-single-user"><path id="Ellipse 4" fill="#8fbffa" d="M0 7a7 7 0 1 0 14 0A7 7 0 1 0 0 7"></path><path id="Ellipse 5" fill="#2859c5" d="M4.5 5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0"></path><path id="Subtract" fill="#2859c5" d="M11.243 10.5A5.489 5.489 0 0 0 7 8.5a5.489 5.489 0 0 0 -4.243 2A5.489 5.489 0 0 0 7 12.5a5.489 5.489 0 0 0 4.243 -2Z"></path></g></svg>
                        <div className="flex flex-col">
                            <h2 className="md:text-xl text-black font-bold dark:text-white">{userData.firstName} {userData.lastName}</h2>
                            <span className="font-bold text-black dark:text-white">ID : {userData.userId}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="h-[10vh] w-auto md:w-full bg-white dark:bg-slate-700 rounded-xl flex flex-row items-center justify-between p-5 shadow-md shadow-slate-400 dark:shadow-none">
                        <Bars3Icon className="p-2 h-10 w-10 text-gray-900 dark:text-white cursor-pointer block md:hidden" aria-hidden="true" onClick={toggleMenu}/>

                        <input type="search" placeholder="Search" className="px-4 py-2 rounded-md border-none outline-none bg-slate-200 dark:bg-slate-600 text-black dark:text-white w-[70%] md:w-[30%]"/>

                        <div className="flex flex-row items-center justify-center gap-4">
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
                                        className="h-8 w-8 text-black dark:text-white block cursor-pointer"
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

                            <h2 className="hidden md:block md:text-xl text-black font-bold dark:text-white">Hi , {userData.firstName} {userData.lastName}</h2>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 cursor-pointer hidden md:block" fill="none" viewBox="0 0 14 14" height="14" width="14" id="User-Circle-Single--Streamline-Core.svg"><g id="user-circle-single--circle-geometric-human-person-single-user"><path id="Ellipse 4" fill="#8fbffa" d="M0 7a7 7 0 1 0 14 0A7 7 0 1 0 0 7"></path><path id="Ellipse 5" fill="#2859c5" d="M4.5 5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0"></path><path id="Subtract" fill="#2859c5" d="M11.243 10.5A5.489 5.489 0 0 0 7 8.5a5.489 5.489 0 0 0 -4.243 2A5.489 5.489 0 0 0 7 12.5a5.489 5.489 0 0 0 4.243 -2Z"></path></g></svg>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-2">
                        <div className="w-full md:w-[35%] p-5 bg-white dark:bg-slate-700 rounded-md gap-4 shadow-md shadow-slate-400 dark:shadow-none">
                            <h3 className="text-3xl font-bold text-black dark:text-white">Total Alert</h3>
                            <span className="text-4xl font-bold text-black dark:text-white">{countDetail.alertLength}</span>
                        </div>
                        <div className="w-full md:w-[35%] p-5 bg-white dark:bg-slate-700 rounded-md gap-4 shadow-md shadow-slate-400 dark:shadow-none">
                            <h3 className="text-3xl font-bold text-black dark:text-white">Total Area</h3>
                            <span className="text-4xl font-bold text-black dark:text-white">{countDetail.areaLength}</span>
                        </div>
                        <div className="w-full md:w-[35%] p-5 bg-white dark:bg-slate-700 rounded-md gap-4 shadow-md shadow-slate-400 dark:shadow-none">
                            <h3 className="text-3xl font-bold text-black dark:text-white">Total Sub-Area</h3>
                            <span className="text-4xl font-bold text-black dark:text-white">{countDetail.subareaLength}</span>
                        </div>
                    </div>
                    {userData.area == "Alloted" ?
                    <>
                    <div className="w-full flex flex-col">
                        <table className="hidden md:inline-block">
                            <thead className="gap-2 flex flex-col w-full">
                                <tr className="bg-blue-600 text-white rounded-md w-full">
                                    <td className="p-3 w-[20%] rounded-l-md">Label</td>
                                    <td className="p-3 w-[20%]">Timestamp</td>
                                    <td className="p-3 w-[40%]">Address</td>
                                    <td className="p-3 w-[15%]">Camera IP / Number</td>
                                    <td className="p-3 w-[10%] rounded-r-md">View Evidence</td>
                                </tr>
                            </thead>
                            <tbody className="py-2 gap-2 flex flex-col w-full">
                            {weaponData && weaponData.length > 0 ? (
                                weaponData.map((data, index) => (
                                <tr key={index} className="p-2 w-full text-black dark:text-white bg-white dark:bg-slate-700 shadow-sm shadow-gray-400 dark:shadow-none rounded-md">
                                    <td className="p-3 w-[20%]">{data.label}</td>
                                    <td className="p-3 w-[20%]">{data.timestamp}</td>
                                    <td className="p-3 text-wrap w-[40%]">
                                        Street / Landmark : {data.street_land}<br/>
                                        Area : {data.area}<br/>
                                        City : {data.city}<br/>
                                        State : {data.state}<br/>
                                        Country : {data.country}<br/>
                                        Zipcode : {data.zipcode}<br/>
                                    </td>
                                    <td className="p-3 w-[15%]">{(data.cameranumip === '0' || data.cameranumip === '1' || data.cameranumip === '2') ? `Camera ${data.cameranumip}` : data.cameranumip}</td>
                                    <td className="p-3 w-[10%]">
                                        <button className="px-4 py-2 bg-blue-600 dark:bg-white text-white dark:text-black font-bold rounded-md" onClick={() => {
                                                setSelectedImageData(data.image_data.data);
                                                setShowModal(true);
                                            }}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr className="p-2 rounded-md text-black dark:text-white bg-white dark:bg-slate-700 shadow-sm shadow-gray-400 dark:shadow-none w-[100%]">
                                    <td className="p-3 text-2xl font-bold text-black dark:text-white text-center w-[100%]" colSpan={5}>No Record Found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <table className="block md:hidden">
                            <thead className="flex flex-col">
                                <tr className="bg-blue-600 text-white rounded-md w-full">
                                    <td className="p-3 w-[80%] rounded-l-md">Alerts</td>
                                    <td className="p-3 w-[20%] rounded-r-md">View Evidence</td>
                                </tr>
                            </thead>
                            <tbody className="py-2 gap-2 flex flex-col">
                            {weaponData && weaponData.length > 0 ? (
                            weaponData.map((data, index) => (
                                <tr key={index} className="p-2 rounded-md text-black dark:text-white bg-white dark:bg-slate-700 shadow-sm shadow-gray-400 dark:shadow-none">
                                    <td className="p-3 w-[100%]">
                                        Label : {data.label}<br/>
                                        Timestamp : {data.timestamp}<br/>
                                        Street / Landmark : {data.street_land}<br/>
                                        Area : {data.area}<br/>
                                        City : {data.city}<br/>
                                        State : {data.state}<br/>
                                        Country : {data.country}<br/>
                                        Zipcode : {data.zipcode}<br/>
                                        Camera IP/No. : {(data.cameranumip === '0' || data.cameranumip === '1' || data.cameranumip === '2') ? `Camera ${data.cameranumip}` : data.cameranumip}
                                    </td>
                                    <td className="p-3 w-[20%]">
                                        <button className="px-4 py-2 bg-blue-600 dark:bg-white text-white dark:text-black font-bold rounded-md" onClick={() => {
                                                setSelectedImageData(data.image_data.data);
                                                setShowModal(true);
                                        }}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr className="p-2 rounded-md text-black dark:text-white bg-white dark:bg-slate-700 shadow-sm shadow-gray-400 dark:shadow-none">
                                    <td className="p-3 text-2xl font-bold text-black dark:text-white text-center" colSpan={2}>No Record Found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </> : 
                <>
                    <div className="flex flex-col items-center justify-center">
                        <img src="/illustrate1.svg" width={600} alt="illustrate"/>
                        <span className="text-2xl font-bold text-black dark:text-white text-center">Area Not Alloted . Cannot View Alerts</span>
                    </div>
                </>}
                </div>
                {showModal && <ImageModal />}
            </div>
        </>
    )
}
export default Dashboard