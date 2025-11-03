import React from 'react'
import useAuthUserHook from '../hooks/useAuthUserHook'
import { useLocation } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutApi } from '../lib/api'

const Navbar = () => {
  const {authUser} = useAuthUserHook()
  const location = useLocation()
  const isChatPage = location.pathname?.startsWith("/chat")

  const queryClient = useQueryClient()

  const {mutate:logoutMutation} = useMutation({
    mutationFn : logoutApi,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["authUser"]})
    }
  })

  return (
   <nav className = "bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
    <div className ="container mx-auto px-4 sm:px-6 lg:px-8">
     

      

    </div>
   </nav>
  )
}

export default Navbar