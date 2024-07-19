import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';

export default function Gauge({powerData, title, gaugeColor}) {
    const [p, setP] = useState();

    useEffect(() => {
        if(!powerData) return;
        setP(powerData/100);
    },[powerData])

    return (
        <div className='flex flex-col items-center bg-white bg-opacity-80 rounded-lg p-5'>
        <h2 className='text-[#3E6680] font-semibold pb-2'>{title}</h2>
        <GaugeChart id="gauge-chart1"
            nrOfLevels={25}
            colors={gaugeColor}
            arcWidth={0.2}
            percent={p}
            textColor="#3E6680"
            needleColor="#3E6680"
            needleBaseColor="#3E6680"
            needleScale={0.9}
            //customNeedleStyle
        />
        <div className='flex justify-between w-full mt-4'>
            <div>
            <p style={{ color: '#00487C' }}>쾌적함</p>
            </div>
            <div>
            <p style={{ color: '#FF5F6D' }}>불쾌함</p>
            </div>
        </div>
        </div>
    )
}
