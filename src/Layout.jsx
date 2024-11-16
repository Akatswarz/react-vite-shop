import React from 'react'
import Header from './views/partials/Header';
import Footer from './views/partials/Footer';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout