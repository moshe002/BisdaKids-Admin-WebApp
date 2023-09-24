import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
 
import Logo from '../assets/logo.png'

function Login() {

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [displayError, setDisplayError] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        validateInputs()
    }

    const validateInputs = async () => {
        try {
            const res = await axios.post('http://localhost/BisdaKids-Admin/backend/login-config.php', loginData)
            setErrorMessage(res.data.message)
            if(res.data.message === "Invalid password!" || res.data.message === "User not found!") {
                setDisplayError(true)
            } else {
                setDisplayError(false)
                //console.log('logged in')
                navigate('/users')
            }
        } catch(error) {
            console.error(error)
        }
    }

    const handleInputs = (e) => {
        let key = e.target.name
        let value = e.target.value
        setLoginData(values => ({...values, [key]: value }))
    }

  return (
    <div className="h-screen font-poppins">  
        <div className='w-full pt-5 pl-3'>
            <img className="w-38 h-16" src={Logo} alt="logo_img" />
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center mt-10">
            <div className="flex flex-col text-left p-3 pt-20">
                <h1 className="text-3xl font-semibold"><b className="text-green-500">Welcome</b><br />
                    Log in to continue
                </h1>
                <br />
                <br />
                <p>Don't have an account?<br />
                You can <button 
                    className="text-blue-500 hover:cursor-pointer font-bold" 
                    type='button'
                    onClick={() => navigate('/signup')}>
                        Register Here
                    </button>
                </p>
            </div>
            <div className="flex flex-col justify-center p-3 gap-7">
                <h1 className="font-semibold text-2xl">Sign in</h1>
                { 
                    displayError 
                    && 
                    <h1 
                        className='text-red-500 text-xl font-bold'>
                        {errorMessage}
                    </h1> 
                }
                <form className="flex flex-col relative gap-5" onSubmit={handleLogin}>
                    <input
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="text" 
                        id="loginfo" 
                        placeholder="Enter email or username" 
                        name="loginfo"
                        onChange={handleInputs} 
                        required />
                    <input
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500" 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        name="password"
                        onChange={handleInputs} 
                        required />
                        <a href="" className="absolute text-xs text-gray-400 right-32 sm:right-1 -bottom-6">Forgot Password?</a>
                    <input 
                        className="bg-blue-500 p-3 rounded-md text-white mt-7 w-80 cursor-pointer font-bold text-xl"
                        type="submit" 
                        name="sub"
                        value='Login' />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login