import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { supabase } from '../supabase-config'

import Logo from '../assets/logo.png'

function Login({ setIsLoggedIn }) {

    const navigate = useNavigate()

    //const [userData, setUserData] = useState([]) // fetched data
    const [loginData, setLoginData] = useState({}) // data from login form
    const [displayLoading, setDisplayLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [displayError, setDisplayError] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        fetchData() 
    }

    /* local connection to php file 
    // const res = await axios.post('http://localhost/BisdaKids-Admin/backend/login-config.php', loginData)
    // setErrorMessage(res.data.message)
    // if(res.data.message === "Invalid password!" || res.data.message === "User not found!") {
    //     setDisplayError(true)
    // } else {
    //     setDisplayError(false)
    //     //console.log('logged in')
    //     navigate('/users')
    // } */

    const fetchData = async () => {
        setDisplayLoading(true)
        const { data, error } = await supabase
        .from('admin_accounts')
        .select()

        data && loginLogic(data)
        error && console.error(error)
    }

    const loginLogic = (data) => {
        data.forEach(item => {
            if(loginData.email === item.email && loginData.password === item.password){
                //console.log('login')
                //console.log(loginData.email + ' ' + loginData.password)
                setIsLoggedIn(true)
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/users') 
            } else if(loginData.password != item.password) {
                setDisplayError(true)
                setErrorMessage('Wrong Password')
                setDisplayLoading(false)
            } //else {
            //     setDisplayError(true)
            //     setErrorMessage('Invalid Credentials')
            //     setDisplayLoading(false)
            // }
        })
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
                { 
                    displayLoading 
                    && 
                    <h1 className='text-gray-400 text-2xl font-bold animate-bounce'>Loading...</h1> 
                }
                <form className="flex flex-col relative gap-5" onSubmit={handleLogin}>
                    <input
                        className="bg-gray-200 p-3 rounded-md placeholder-black w-80 focus:outline-blue-500"
                        type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        name="email"
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
                        {
                            /*
                            <a href="" className="absolute text-xs text-gray-400 right-32 sm:right-1 -bottom-6">Forgot Password?</a>
                            */
                        }
                    <input 
                        className="bg-blue-500 p-3 rounded-md text-white w-80 cursor-pointer font-bold text-xl"
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