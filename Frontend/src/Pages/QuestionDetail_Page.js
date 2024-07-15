import React from 'react'
import Nav from '../components/Nav.js';
import QuestionDetail  from '../components/QuestionDetail.js'
import Footer from '../components/Footer.js';


export default function Board_Page() {
  return (
    <div>
    <Nav/>
    <div className="bg-[#9DC3E6] text-white text-center rounded-t-3xl min-h-screen flex justify-center items-center">
      <QuestionDetail />
      
    </div>
    <Footer />
    </div>
  )
}