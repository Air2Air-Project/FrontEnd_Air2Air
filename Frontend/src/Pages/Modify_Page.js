import React from 'react'
import Nav from '../components/Nav.js';
import Modify from '../components/modify.js';
import Footer from '../components/Footer.js';

export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#17444F] text-white text-center rounded-t-3xl  h-[110vh] flex justify-center items-center">
      <Modify/>
      
    </div>
    <Footer />
    </>
  )
}