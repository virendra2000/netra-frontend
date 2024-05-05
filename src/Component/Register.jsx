import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Banner from './Banner'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import useDarkMode from "./useDarkMode"
import { STATES } from '../Constants/index'
const strengthLabels = ["Weak","Medium","Medium","Strong"];
const Register = ({placeholder}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [colorTheme, setTheme] = useDarkMode();
    const history = useNavigate();
    const [strength,setStrength] = useState("")
    const getStrength = (password) => {
        let indicator = -1;
        
        if(/[a-z]/.test(password)) indicator++;
        if(/[A-Z]/.test(password)) indicator++;
        if(/\d/.test(password)) indicator++;
        if(/[^a-zA-Z0-9]/.test(password)) indicator++;
        if(password.length >=16) indicator++;

        return strengthLabels[indicator];
    }
    const generateRandomNumber = (length) => {
        return Math.floor(Math.random() * (10 ** length));
    }
    const generateUserID = () => {
        const currentYear = new Date().getFullYear();
        const randomNumber = generateRandomNumber(3); // Generate a random 6-digit number
        return `S${randomNumber}${currentYear}`;
    }
    const [securityData, setSecurityData] = useState({
        role: 'Security',
        userId: generateUserID(),
        firstName: '',
        lastName: '',
        email: '',
        mobileno:'',
        city:'',
        state:'',
        country:'',
        zipcode:'',
        securitycode:'',
        password:''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSecurityData({...securityData,[name]: value});
    };
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setSecurityData({...securityData,[name]: value});
        setStrength(
            getStrength(e.target.value)
        );
    }
    const handleSubmit = async (e) => {
        let dataToSend;
        e.preventDefault();
        dataToSend = securityData;
        try {
            console.log(dataToSend);
            const res = await axios.post("/Register",dataToSend) ;
            if(res.status==201) {
                toast.success('Registered Successfully',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-green-400 dark:text-white dark:bg-slate-600 font-bold',
                });
                setTimeout(() => {
                    history("/");
                }, 2000);
            }
            else if(res.status==203) {
                toast.error('Email Already Exists',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }else if(res.status == 204) {
                toast.error('Incorrect UserId',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }else if(res.status == 205) {
                toast.error('UserId Already Exists',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
            else {
                toast.error('Registration Failed',{
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: false,
                    className: 'bg-white text-red-500 dark:text-white dark:bg-slate-600 font-bold',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
    <>
    <ToastContainer autoClose={1000}/>
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
                <a href="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Login <span aria-hidden="true">&rarr;</span>
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
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white dark: hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white"
                    >
                    Login
                    </a>
                </div>
                </div>
            </div>
            </Dialog.Panel>
        </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
        >
            <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
                clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            />
        </div>
        <div className="mx-auto py-28 sm:py-24 flex flex-col-reverse md:flex-row-reverse gap-4 w-[100%]">
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 bg-transparent w-full md:w-[35%] rounded-md shadow-md shadow-gray-500">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="logoimg">
                        <img src="/logo.png" className="logoimg" width="80px" height="70px"/>
                    </div>
                    <div className="logotxt flex flex-col">
                        <h1 className="text-4xl font-bold text-blue-700 dark:text-white">NETRA</h1>
                        <p className="text-[10px] font-bold text-black dark:text-white">Ultimate Solution for all your need</p>
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center text-blue-600  dark:text-white">REGISTER</h2>
                <div className="flex flex-row gap-2">
                    <input type="text" id="firstname" name="firstName" placeholder="First Name" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.firstName} onChange={handleInputChange}/>
                            
                    <input type="text" id="lastname" name="lastName" placeholder="Last Name" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.lastName} onChange={handleInputChange}/>
                </div>
                <div className="flex flex-row gap-2">
                    <input type="email" id="username" name="email" placeholder="Email Address" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.email} onChange={handleInputChange}/>
                    <input type="text" id="mobileno" name="mobileno" placeholder="Mobile Number" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.mobileno} onChange={handleInputChange}/>
                </div>
                <div className="flex flex-row gap-2">
                    <input type="text" id="city" name="city" placeholder="City" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.city} onChange={handleInputChange}/>
                    <input type="text" list="states" id="state" name="state" placeholder="State" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.state} onChange={handleInputChange}/>
                    {STATES.map((state) => (
                        <datalist key={state.key} id="states">
                            <option value={state.name}/>
                        </datalist>
                    ))}
                </div>
                <div className="flex flex-row gap-2">
                    <input type="text" list="country" id="country" name="country" placeholder="Country" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.country} onChange={handleInputChange}/>
                    <datalist id="country">
                        <option value="India"/>
                    </datalist>

                    <input type="text" id="zipcode" name="zipcode" placeholder="City Pin Code" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.zipcode} onChange={handleInputChange}/>
                </div>
                <div className="flex flex-row gap-2">
                    <input type="text" id="securitycode" name="securitycode" placeholder="Set 5 Digit Security Code" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.securitycode} onChange={handleInputChange}/>

                    <input type="password" id="password" name="password" className="control px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" spellCheck="false" placeholder={placeholder} value={securityData.password} onChange={handlePasswordChange}/>
                </div>

                <div className={`bars ${strength}`}>
                    <div></div>
                </div>
                <div className="strength">
                    {strength && `${strength} password`}
                </div>
                <button type="submit" name="b1" className="py-2 px-4 w-full bg-blue-600 dark:bg-white text-white dark:text-blue-600 rounded-md font-bold">Join Now</button>
                <span className="text-black dark:text-white font-bold text-center">Already have an Account ? <a href="/" className="text-blue-600 dark:text-yellow-400">Login</a></span>
            </form>
            <div className="hidden md:flex md:flex-col items-start justify-center w-full md:w-[70%]">
                <img src="/registerillustrate.svg" width={600} alt="illustrate"/>
            </div>
        </div>
        </div>
    </div>
    <Footer/>
    </>
    )
}
Register.propTypes = {
    placeholder: PropTypes.string.isRequired,
};
Register.defaultProps = {
    placeholder: 'Password',
};
export default Register