import React from 'react'
import Nav from '../components/Nav.js';
import Board from '../components/Board.js';
import Footer from '../components/Footer.js';


export default function Board_Page() {
  return (
    <div>
    <Nav/>
    <div className="bg-[#17444F] text-white text-center rounded-t-3xl  h-[83vh] flex justify-center items-center">
      <Board/>
      
    </div>
    <Footer />
    </div>
  )
}
