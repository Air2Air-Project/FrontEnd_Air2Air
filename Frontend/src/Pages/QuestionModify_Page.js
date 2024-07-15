import React from 'react'
import Nav from '../components/Nav.js';
import QuestionModify from '../components/QuestionModify.js';
import Footer from '../components/Footer.js';

export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#9DC3E6] text-white text-center rounded-t-3xl  h-[110vh] flex justify-center items-center">
      <QuestionModify/>
      
    </div>
    <Footer />
    </>
  )
}