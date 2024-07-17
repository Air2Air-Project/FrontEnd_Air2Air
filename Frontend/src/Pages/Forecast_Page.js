import React from 'react';
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import PredictBump from '../components/PredictBump.js';

export default function Forecast_Page() {
  //microData와 dustData를 페치받아서 각각의 predictBump에 보내서 표현하기
  const ppmData= [
    {
        "id": "SO2",
        "data": [
            { "x": 1, "y": 10 },
            { "x": 2, "y": 15 },
            { "x": 3, "y": 11 },
        ]
    },
    {
        "id": "NO2",
        "data": [
            { "x": 1, "y": 15 },
            { "x": 2, "y": 9 },
            { "x": 3, "y": 16 },
        ]
    },
    {
        "id": "CO",
        "data": [
            { "x": 1, "y": 21 },
            { "x": 2, "y": 9 },
            { "x": 3, "y": 20 },
        ]
    }]
    const microData= [
      {
        "id": "PM10",
        "data": [
            { "x": 1, "y": 20 },
            { "x": 2, "y": 19 },
            { "x": 3, "y": 17 },
        ]
    },
    {
        "id": "PM2.5",
        "data": [
            { "x": 1, "y": 21 },
            { "x": 2, "y": 11 },
            { "x": 3, "y": 26 },
        ]
    }
];
  return (
    <>
      <Nav />
      <div className="bg-[url('./components/background/cloudbg1.png')] bg-cover bg-opacity-50 text-white text-center rounded-t-3xl p-3 h-[100vh] flex justify-start items-center flex-col">
        <h1 className="text-2xl font-bold mb-4 mt-10">6가지 대기 공해 요소 예측</h1>
        <div className="w-full h-[80%] flex flex-col justify-center items-center m-10">
          <PredictBump dustData={ppmData} cate='nivo'/>
          <PredictBump dustData={microData} cate='paired'/>
        </div>
      </div>
      <Footer />
    </>
  );
}
