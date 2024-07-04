import React from 'react'
import Nav from '../components/Nav.js';
import Inquiry from '../components/Inquiry.js';


export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#17444F] text-white text-center rounded-t-3xl  h-[100vh] flex justify-center items-center">
      <Inquiry/>
      
    </div>
    </>
  )
}