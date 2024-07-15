import React from 'react'
import Nav from '../components/Nav.js';
import Board from '../components/Board.js';
import Footer from '../components/Footer.js';


export default function Board_Page() {
  return (
    <div className='flex flex-col'>
    <Nav/>
    {/* <div className='rounded-t-3xl'> */}
    <div className="bg-[url('./components/background/boardbg.png')] bg-cover text-white text-center rounded-t-3xl  h-[83vh] flex justify-center items-center">
    {/* <video src="/videos/clouds.mp4" autoPlay loop muted className=' rounded-t-3xl overflow-scroll'> */}
      <Board/>
      {/* </video> */}
    {/* </div> */}
    </div>
    <Footer />
    </div>
  )
}