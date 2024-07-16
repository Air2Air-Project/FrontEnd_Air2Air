import React from 'react'
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import Register from '../components/Register.js';

export default function Register_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/cloudbg1.png')] text-white font-semibold rounded-t-3xl p-3 h-[83vh] flex justify-center items-center">
      <Register/>
    </div>
    <Footer/>
    </>
  )
}
