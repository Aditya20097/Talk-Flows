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

import PageLoader from './components/PageLoader.jsx'
import useAuthUserHook from './hooks/useAuthUserHook.js'
import Layout from './components/Layout.jsx'

const App = () => {
  // tanstack query crash course
 const {isLoading , authUser} = useAuthUserHook()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded


  if(isLoading) return <PageLoader/>

  return (
    <div className=' h-screen' data-theme="night">
     <Routes>
      <Route path='/' element ={  isAuthenticated && isOnboarded ? (
      < Layout> 
       <HomePage/>
      </Layout>
      ): (
        <Navigate to = {!isAuthenticated? "/login":"onboarding"}/>
      )}/>
        <Route path='/signup' element ={!isAuthenticated?  <SignUpPage/> : <Navigate to={isOnboarded? "/" : "/onboarding"}/>}/>
        <Route path='/login' element ={!isAuthenticated?  <LoginPage/> : <Navigate to={isOnboarded? "/" : "/onboarding"}/>}/>
        <Route path='/onboarding' element ={ isAuthenticated ? (!isOnboarded ? (<OnBoarding/>): 
        (<Navigate to = "/"/>)) :
         (<Navigate to = "/login"/>)}/>
        <Route path='/notification' element ={isAuthenticated ?<NotificationPage/> :<Navigate to='/login'/>  }/>
        <Route path='/chat' element ={isAuthenticated ? <ChatPage/> : <Navigate to='/login'/>}/>
        <Route path='/call' element ={isAuthenticated ? <CallPage/>: <Navigate to='/login'/>}/>
     </Routes>
     <Toaster/>
   </div>
  )
}

export default App