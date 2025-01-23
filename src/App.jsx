// import { useState } from 'react'

import './App.css'
import Layout from './Layout';
import IndexPage from './pages/IndexPage'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import AccountPage from './pages/AccountPage';
import PlaceDetails from './pages/PlaceDetails ';
import ShownPlace from './pages/ShownPlace';
import Footer from './pages/Footer';
// vxm8oFNJA4WiGbqP
// gufraanquraishi

function App() {
  // Set the default base URL
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;



  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
          <Route path='/places/:id' element={<PlaceDetails />} />
          <Route path='/shownplace/:id' element={<ShownPlace />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
