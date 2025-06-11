import { useState } from 'react'
import Home  from './pages/Home';
import UserEdit  from './pages/UserEdit';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListData from './pages/Curd/ListData';
import AddData from './pages/Curd/AddData';
import EditData from './pages/Curd/EditData';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>} />̥
        <Route path='/UserEdit/:id' element={<UserEdit/>} />̥
        <Route path='/add' element={<UserEdit/>} />̥
        <Route path='/ListData' element={<ListData/>} />̥
        <Route path='/' element={<ListData/>} />̥
        <Route path='/AddData' element={<AddData/>} />
        <Route path='/EditData/:id' element={<EditData/>} />
      </Routes>
    </BrowserRouter>
    
    <ToastContainer />
    </>
  )
}

export default App
