import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { loginApi } from '../lib/api'
import { ShipWheelIcon } from 'lucide-react'
import { Link } from 'react-router'
import useLoginHook from '../hooks/useLoginHook'

const LoginPage = () => {

    const [loginData , setLoginData] = useState({
      email:"",
      password:""
    })


      const {isPending , error , loginMutation} = useLoginHook()

      const handleLogin = (e) => {
        e.preventDefault();
        loginMutation(loginData)
      }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8  ' data-theme = "forest">

      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base=100 rounded-xl shadow-lg overflow-hidden'>

      {/* login form section */}

        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
        {/* logo */}
        <div className='mb-4 flex items-center justify-start gap-2'>
          <ShipWheelIcon className='size-9 text-primary'/> 
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Talk-flows</span>
        </div>
        {/* error mesaage display */}
      { error && (
       <div className='alert alert-error mb-4'> 
       <span>{error.response.data.message}</span>
       </div>
      )
      }

      <div className='w-full'>
        <form onSubmit={handleLogin}>
          <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'>WelcomeBack</h2>
                  <p className='text-sm opacity-70'>Sign in to  your account to continue your networking journey</p>
              </div>

              <div className='flex flex-col gap-3'>
                 <div className='form-control w-full space-y-2'>
                    <label className='label'>
                      <span className='label-text'> Email </span>
                    </label>
                    <input type="email"
                    placeholder='hello@example.com'
                    className='input input-bordered w-full'
                    value={loginData.email}
                    onChange={(e)=> setLoginData({...loginData , email: e.target.value})}
                    required
                    />
                 </div>
                   <div className='form-control w-full space-y-2'>
                    <label className='label'>
                      <span className='label-text'> Password </span>
                    </label>
                    <input type="password"
                    placeholder='********'
                    className='input input-bordered w-full'
                    value={loginData.password}
                    onChange={(e)=> setLoginData({...loginData , password: e.target.value})}
                    required
                    />
                 </div>
                 <button type='submit' className='btn btn-primary w-full' disabled = {isPending}>
                  {isPending ? (
                    <>
                    <span className='loading loading-spinner loading-xs'>signing in...</span>
                    </>
                  ) : (
                    "sign in "
                  )}
                 </button>
                 <div className='text-center mt-4'>
                  <p className='text-sm'> dont have an account? {""}
                    <Link to = "/signup" className = "text-primary hover:underline">Create one</Link>
                  </p>

                 </div>
              </div>

          </div>
        </form>
      </div>
        </div>

          {/* right side panel image section */}
            <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
                <div className='max-w-md p-8'>
                  {/* illustartion */}
                  <div className='relative aspect-square max-w-sm mx-auto'>
                    <img src="/signuppic.png" alt="langugae connnection illustration"  className='w-full h-full'/>
                  </div>

                  <div className='text-center space-y-3 mt-6'>
                    <h2 className='text-xl font-semibold '> connect with language partner worldwide </h2>
                    <p className='opacity-70'>practise conversations make friends and improve languages skills together</p>
                  </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default LoginPage