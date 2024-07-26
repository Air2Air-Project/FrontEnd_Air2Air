import React from 'react'
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import MyPage from '../components/MyPage.js';

export default function Myinfo_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/cloudbg1.png')] bg-cover text-white text-center rounded-t-3xl p-3 h-[83vh] flex justify-center items-center">
      <MyPage/>
    </div>
    <Footer/>
    </>
  )
}