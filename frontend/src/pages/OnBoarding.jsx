import React, { useState } from 'react'
import useAuthUserHook from '../hooks/useAuthUserHook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { completeOnboarding } from '../lib/api'
import { CameraIcon, ShuffleIcon } from 'lucide-react'

const OnBoarding = () => {
  const {authUser} = useAuthUserHook()
  const queryClient =  useQueryClient()

  const [formState , setFormState] = useState({
    fullName : authUser?.fullName || "",
    bio : authUser?.bio || "",
    nativeLanguage : authUser?.nativeLanguage || "",
    learningLangugage:  authUser?.learningLangugage|| "",
    location : authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const {mutate:onboardingMutation , isPending} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("profile onboarded successfully ")
      queryClient.invalidateQueries({queryKey: ["authUser"]})
    }
  })

  const handdleSubmit = (e) => {
    e.preventDefault()
    onboardingMutation(formState)
  }

    const handleRandomAvatar = () => {

    }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl  '>
        <div className=' card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'> complete your profile </h1>
            <form onSubmit={handdleSubmit} className='space-y-6'>

               {/* profile pic container  */}

               <div className='flex flex-col items-center justify-center space-y-4'>
                {/* image preview */}

                  <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                    {formState.profilePic ? (
                      <img src={formState.profilePic} alt="profile preview"
                      className='w-full h-full object-cover' />
                    ) : (
                      <div className='flex items-center justify-center h-full '>
                        <CameraIcon className='size-12 text-base-content opacity-40'/>
                      </div>
                    )}


                  </div>
                    {/* genereate random avatar */}

               <div className='flex items-center gap-2'>
                    <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                       <ShuffleIcon className='size-4 mr-2'/>
                      Generate random avatar
                    </button>
               </div>
              {/* full name  or form data */}
                </div>

                              <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input type="text" name="fullName"
                   value={formState.fullName} 
                   onChange={(e) => setFormState({...formState,fullName:e.target.value})}
                   className='input input-bordered w-full'
                   placeholder='your full name'
                   />
               </div>
               
               {/* bio */}

               <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Bio</span>
                  </label>
                  <textarea name="bio"
                   value={formState.bio} 
                   onChange={(e) => setFormState({...formState,bio : e.target.value})}
                   className='textarea textarea-bordered h-24'
                   placeholder='tell other about yourself and your language laerning goals'
                   />
               </div>
               {/* langugae */}
                    
            </form>
        </div>
      </div>

    </div>
  )
}

export default OnBoarding