import PropTypes from 'prop-types';
import NavbarHome from "./NavbarHome"
import Footer from "./Footer"
import { STATES } from '../Constants/index'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const strengthLabels = ["Weak","Medium","Medium","Strong"];
const RegisterDemo = ({placeholder}) => {
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
        area:'',
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
            <NavbarHome />
            <ToastContainer autoClose={1000}/>
            <div className="min-h-screen bg-slate-white dark:bg-slate-700">
                <div className="p-10 flex flex-row items-center justify-center">
                    <div className="illustration hidden md:block">
                        <img src="/registerillustrate.svg" width={600}/>
                    </div>
                    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 bg-slate-100 dark:bg-slate-600 w-full md:w-[35%] rounded-md shadow-md shadow-gray-500">
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
                            <input type="text" id="area" name="area" placeholder="Area" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.area} onChange={handleInputChange}/>
                            <input type="text" id="city" name="city" placeholder="City" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.city} onChange={handleInputChange}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="text" list="states" id="state" name="state" placeholder="State" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.state} onChange={handleInputChange}/>

                            {STATES.map((state) => (
                                <datalist key={state.key} id="states">
                                    <option value={state.name}/>
                                </datalist>
                            ))}
                            <input type="text" list="country" id="country" name="country" placeholder="Country" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.country} onChange={handleInputChange}/>
                            <datalist id="country">
                                <option value="India"/>
                            </datalist>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="text" id="zipcode" name="zipcode" placeholder="City Pin Code" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.zipcode} onChange={handleInputChange}/>

                            <input type="text" id="securitycode" name="securitycode" placeholder="Set 5 Digit Security Code" className="px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" value={securityData.securitycode} onChange={handleInputChange}/>
                        </div>

                        <input type="password" id="password" name="password" className="control px-4 py-2 w-full rounded-md bg-transparent bg-white dark:bg-slate-700 outline-none text-black dark:text-white border border-blue-600 dark:border-0" spellCheck="false" placeholder={placeholder} value={securityData.password} onChange={handlePasswordChange}/>

                        <div className={`bars ${strength}`}>
                            <div></div>
                        </div>
                        <div className="strength">
                            {strength && `${strength} password`}
                        </div>

                        <button type="submit" name="b1" className="py-2 px-4 w-full bg-blue-600 dark:bg-white text-white dark:text-blue-600 rounded-md font-bold">Join Now</button>

                        <span className="text-black dark:text-white font-bold text-center">Already have an Account ? <a href="/" className="text-blue-600 dark:text-yellow-400">Login</a></span>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}
RegisterDemo.propTypes = {
    placeholder: PropTypes.string.isRequired,
};
RegisterDemo.defaultProps = {
    placeholder: 'Password',
};
export default RegisterDemo