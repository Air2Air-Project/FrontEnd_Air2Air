import React from 'react'
import Nav from '../components/Nav.js';
import Inquiry from '../components/Inquiry.js';
import Footer from '../components/Footer.js';

export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#1d5666] text-white text-center rounded-t-3xl  h-[110vh] flex justify-center items-center">
      <Inquiry/>
      
    </div>
    <Footer />
    </>
  )
}