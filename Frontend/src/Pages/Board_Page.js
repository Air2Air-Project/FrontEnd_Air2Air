import React from 'react'
import Nav from '../components/Nav.js';
import Board from '../components/Board.js';
import Footer from '../components/Footer.js';


export default function Board_Page() {
  return (
    <div>
    <Nav/>
    <div className="bg-[#1d5666] text-white text-center rounded-t-3xl  h-[83vh] flex justify-center items-center">
{/* <86E895,4796C6, A1C5E4 , dde7f0, 17444F></> */}
    {/* <div className="bg-[url('./components/background/background.png')] text-black text-center rounded-t-3xl  h-[83vh] flex justify-center items-center"> */}
      <Board/>
      
    </div>
    <Footer />
    </div>
  )
}
