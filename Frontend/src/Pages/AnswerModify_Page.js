import React from 'react'
import Nav from '../components/Nav.js';
import AnswerModify from '../components/AnswerModify.js';
import Footer from '../components/Footer.js';

export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#9DC3E6] text-white text-center rounded-t-3xl  min-h-screen flex justify-center items-center">
      <AnswerModify/>
      
    </div>
    <Footer />
    </>
  )
}
