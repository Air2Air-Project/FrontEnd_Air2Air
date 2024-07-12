import React from 'react'
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';

export default function Forecast_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/background.png')] text-white text-center rounded-t-3xl p-3 h-[83vh] flex justify-center items-center">
      이상탐지 예측 알림
    </div>
    <Footer/>
    </>
  )
}