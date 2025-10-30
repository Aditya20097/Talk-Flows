import React from 'react'
import { Navigate, Route,Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import OnBoarding from './pages/OnBoarding'
import NotificationPage from './pages/NotificationPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import  {Toaster} from 'react-hot-toast'

import { useQuery }from "@tanstack/react-query"
import PageLoader from './components/PageLoader.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUserHook from './hooks/useAuthUserHook.js'

const App = () => {
  // tanstack query crash course
 const {isLoading , authUser} = useAuthUserHook()

  
  if(isLoading) return <PageLoader/>

  return (
    <div className=' h-screen' data-theme="night">
     <Routes>
      <Route path='/' element ={ authUser ? < HomePage/> : <Navigate to='/login'/>}/>
        <Route path='/signup' element ={!authUser ?  <SignUpPage/> : <Navigate to='/'/>}/>
        <Route path='/login' element ={!authUser ?  <LoginPage/> : <Navigate to='/'/>}/>
        <Route path='/onboarding' element ={ authUser ? <OnBoarding/> : <Navigate to='/login'/>}/>
        <Route path='/notification' element ={authUser ?<NotificationPage/> :<Navigate to='/login'/>  }/>
        <Route path='/chat' element ={authUser ? <ChatPage/> : <Navigate to='/login'/>}/>
        <Route path='/call' element ={authUser ? <CallPage/>: <Navigate to='/login'/>}/>
     </Routes>
     <Toaster/>
   </div>
  )
}

export default App