import React from 'react'
import Nav from '../components/Nav.js';
import Area_chart_3D from '../components/Area_chart_3D.js';
import Mt_3D from '../components/Mt_3D.js';
import Footer from '../components/Footer.js';
import Scatter3DChart from '../components/Scatter3DChart.js';

export default function Login_Page() {
  return (
    <div>
      <Nav />
      <div className="bg-[url('./components/background/cloudbg1.png')] bg-cover text-white text-center rounded-t-3xl p-3 h-[83vh] flex justify-center items-center w-full">
        <Area_chart_3D />
        {/* <Mt_3D/> */}
        {/* <Scatter3DChart/> */}
      </div>
      <Footer />
    </div>
  )
}