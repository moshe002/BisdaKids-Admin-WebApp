import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Logo from '../assets/logo.png'
import SuccessSignup from '../components/SuccessSignup'

function Signup() {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({})
    const [showSignup, setShowSignup] = useState(false)

    const handleSignup = (e) => {
        e.preventDefault()
        axios.post('http://localhost/BisdaKids-Admin/backend/signup-config.php', signupData)
        .then((response) => {
            response && setShowSignup(true)
        })
        //console.log(signupData)
    }

    const handleFormInputs = (e) => {
        let key = e.target.name
        let value = e.target.value
        setSignupData(values => ({...values, [key]: value}))
    }

  return (
    <div className="h-screen font-poppins">
        { showSignup && <SuccessSignup /> }
        <div className='w-full pt-5 pl-3'>
            <img className="w-38 h-16" src={Logo} alt="logo_img" />
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly">
            <div className="flex flex-col text-left p-3 pt-20">
                <h1 className="text-3xl font-semibold"><b className="text-green-500">Sign Up</b><br />
                    Create your free account
                </h1>
                <br />
                <br />
                <p>Already have an account?<br />
                    You can <></>
                    <button 
                        className="text-blue-500 font-bold"
                        type='button'
                        onClick={() => navigate('/')}>
                            Login Here
                    </button>
                </p>
            </div>
            <div className="flex flex-col justify-center p-3 gap-7">
                <h1 className="font-semibold text-2xl">Sign Up</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSignup}>
                    <div className="flex flex-row justify-center gap-7">
                        <input 
                            className="w-36 bg-gray-200 p-3 rounded-md placeholder-black focus:outline-blue-500" 
                            type="text" id="firstname" name="firstname" placeholder="First Name" 
                            onChange={(e) => handleFormInputs(e)}
                            required /> 
                        <input 
                            className="w-36 bg-gray-200 p-3 rounded-md placeholder-black focus:outline-blue-500" 
                            type="text" id="lastname" name="lastname" placeholder="Last Name" 
                            onChange={(e) => handleFormInputs(e)} 
                            required />
                    </div> 
                    <input
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="email" id="email" placeholder="Enter Email" name="email" aria-describedby="emailHelp" 
                        onChange={(e) => handleFormInputs(e)} 
                        required />
                    <input 
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="number" id="contact" name="contact" placeholder="Contact number" 
                        onChange={(e) => handleFormInputs(e)} 
                        required />
                    <input 
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="text" id="username" placeholder="Create Username" name="username" 
                        onChange={(e) => handleFormInputs(e)} 
                        required />
                    <input 
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="password" id="pass" name="pass"placeholder="Password" 
                        onChange={(e) => handleFormInputs(e)} required />
                    <input 
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="password" id="confirmpass" name="confirmpass" placeholder="Confirm Password" 
                        onChange={(e) => handleFormInputs(e)} required />
                    <button 
                        className="bg-blue-500 p-3 rounded-md text-white mt-7 w-80 focus:outline-blue-500"
                        type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup