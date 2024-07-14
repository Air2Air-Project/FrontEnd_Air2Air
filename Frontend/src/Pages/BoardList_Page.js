import React from 'react'
import Nav from '../components/Nav.js';
import BoardList from '../components/BoardList.js';
import Footer from '../components/Footer.js';


export default function Board_Page() {
  return (
    <div>
    <Nav/>
   <div className="bg-[#1d5666] text-white text-center rounded-t-3xl lg:h-[120vh] sm:h-[150vh] flex justify-center items-center">
      <BoardList/>
      
    </div>
    <Footer />
    </div>
  )
}