import React from 'react'
import Nav from '../components/Nav.js';
import BoardList from '../components/BoardList.js';
import Footer from '../components/Footer.js';
import BoardListDB from '../components/BoardListDB.js';

export default function Board_Page() {
  return (
    <div>
    <Nav/>
   <div className="bg-[#9DC3E6] text-white text-center rounded-t-3xl lg:h-[120vh] sm:h-[150vh] flex justify-center items-center">
      {/* <BoardList/> */}
      <BoardListDB/>
      
    </div>
    <Footer />
    </div>
  )
}