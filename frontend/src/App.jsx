
import React, { use } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/HomePage'
import SingUpPage from './Pages/SingUpPage'
import Login from './Pages/LoginPage'
import Notification from './Pages/NotificationPage'
import CallPage from './Pages/CallPage'
import ChatPage from './Pages/ChatsPage'
import OnbordingPage from './Pages/OnbordingPage'
import { Toaster, toast } from "react-hot-toast";
import { useEffect,useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from './lib/axios.js'

const App = () => {
  // tanstac  query
  const {data ,isLoading,error} = useQuery({
    queryKey:"toodos",
    queryFn: async()=>{
      const res = await axiosInstance.get("/auth/me");
      return res.data
    },
    retry:false,
  });    
  console.log(data);    
  return (
    <div className="h-screen" data-theme="night">
      <button onClick={() => toast.success("Hello toast!")}>
        Create a toast{" "}
      </button>
      <button onClick={() => toast.error("This is an error toast!")}>
        Create error toast{" "}
      </button>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/singup" element={<SingUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onbording" element={<OnbordingPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
