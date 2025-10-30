import React, { useState } from 'react'
import useAuthUserHook from '../hooks/useAuthUserHook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

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


  return (
    <div>OnBoarding</div>
  )
}

export default OnBoarding