import React from 'react'
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import ResetPw from '../components/ResetPw.js';

export default function Board_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/cloudbg1.png')] text-white text-center rounded-t-3xl h-[83vh] flex justify-center items-center">
    <ResetPw/>
    </div>
    <Footer />
    </>
  )
}