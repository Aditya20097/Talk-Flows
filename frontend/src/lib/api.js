import { axiosInstance } from "./axios"
import axios from "axios"


    export const signupApi =  async (signupData) => {
          const response = await axiosInstance.post("/auth/signup", signupData)
          return response.data
        }

    export const getAuthUser = async () => {
      const res = await axiosInstance.get("/auth/me")
       return res.data
          
    }

    
    export const completeOnboarding = async (userData) => {
      const res = await axiosInstance.post("/auth/onboarding" , userData)
       return res.data
          
    }
    export const loginApi = async  (loginData) => {
      const response = await  axiosInstance.post('/auth/login', loginData)
      return response.data
    }