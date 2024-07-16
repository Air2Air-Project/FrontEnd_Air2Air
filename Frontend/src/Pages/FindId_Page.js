import React from 'react'
import Nav from '../components/Nav.js';
import FindId from '../components/FindId.js';
import Footer from '../components/Footer.js';

export default function FindId_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/cloudbg1.png')] text-white text-center rounded-t-3xl p-3 h-[83vh] flex justify-center items-center">
      <FindId/>
    </div>
    <Footer/>
    </>
  )
}
