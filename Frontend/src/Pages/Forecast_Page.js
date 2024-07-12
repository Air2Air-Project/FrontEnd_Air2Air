import React from 'react'
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';

export default function Forecast_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/background.png')] text-white text-center rounded-t-3xl p-3 h-[83vh] flex justify-center items-center">
      6가지 대기 공해 요소 예측
    </div>
    <Footer/>
    </>
  )
}