import React, { useEffect, useState } from 'react'
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async ()=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }catch(e){
            console.error(e)
        }
    }

    const googleLogin = async ()=> {
        try{
            await signInWithPopup(auth ,googleProvider)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        console.log(email)
    }, [email])

  return (
    <div className='' >
        <div className='w-screen h-[10vh] flex justify-start items-center p-4 md:mt-4 md:ml-4' >
            <img src="/images/disney-plus-logo.png" alt="" className='h-12 md:h-16' />
        </div>
        <div className='h-[90vh] w-screen flex flex-col justify-center items-center gap-6' >
                <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder='E-mail' className='bg-[#31333e] text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] sm:w-[380px] md:w-[400px] p-5 text-white outline-gray-400 outline-[1px]' />
                <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' className='bg-[#31333e] text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] sm:w-[380px] md:w-[400px]  p-5 text-white outline-gray-400 outline-[1px]' />
                <button onClick={login} className='flex justify-center items-center text-white text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] md:w-[400px] sm:w-[380px]  p-5 bg-[#0072d2] font-normal' >Login</button>
                <button onClick={googleLogin}  className='flex justify-center items-center gap-2 text-white text-[18px] md:text-[20px] rounded-md h-[55px] w-[80vw] md:w-[400px] sm:w-[380px]  p-5 bg-[#0072d2] font-normal' >
                    <img src="/images/google.png" alt="" className='w-8 h-8' />
                    <p>Login with Google</p>
                </button>
        </div>
    </div>
  )
}

export default Login