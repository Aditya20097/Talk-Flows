import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { loginApi } from '../lib/api'

const useLoginHook = () => {
    const queryClient = useQueryClient()
  const {
        mutate , 
        isPending,
         error,
      } = useMutation({
        mutationFn:loginApi,
        onSuccess: () => queryClient.invalidateQueries({queryKey:["authUser"]}),
        
    })
    return {error , isPending , loginMutation:mutate}
}

export default useLoginHook