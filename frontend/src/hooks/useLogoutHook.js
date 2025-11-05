import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logoutApi } from '../lib/api'

const useLogoutHook = () => {
   const queryClient = useQueryClient()

  const {mutate:logoutMutation , isPending , error} = useMutation({
    mutationFn : logoutApi,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ["authUser"]})
    }
  })
  return {logoutMutation , isPending , error }
};

export default useLogoutHook