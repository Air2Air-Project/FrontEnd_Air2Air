import React from 'react'
import Nav from '../components/Nav.js';
import QuestionDetail  from '../components/QuestionDetail.js'
import Footer from '../components/Footer.js';


export default function Board_Page() {
  return (
    <div>
    <Nav/>
    <div className="bg-[#1d5666] text-white text-center rounded-t-3xl  h-[120vh] flex justify-center items-center">
      <QuestionDetail />
      
    </div>
    <Footer />
    </div>
  )
}