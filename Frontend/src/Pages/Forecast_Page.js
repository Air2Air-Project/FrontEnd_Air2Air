import React from 'react';
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import PredictBump from '../components/PredictBump.js';

export default function Forecast_Page() {
  return (
    <>
      <Nav />
      <div className="bg-[url('./components/background/cloudbg1.png')] bg-cover bg-opacity-50 text-white text-center rounded-t-3xl p-3 h-[83vh] flex justify-start items-center flex-col">
        <h1 className="text-2xl font-bold mb-4 m-10">6가지 대기 공해 요소 예측</h1>
        <div className="w-full h-96 flex justify-center items-center m-10">
          <PredictBump />
        </div>
      </div>
      <Footer />
    </>
  );
}
