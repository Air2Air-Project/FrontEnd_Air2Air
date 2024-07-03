import React from 'react'
import Nav from '../components/Nav.js';
import Board from '../components/Board.js';


export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#17444F] text-white text-center rounded-t-3xl p-3 h-[100vh] flex justify-center items-center">
      <Board/>
    </div>
    </>
  )
}
