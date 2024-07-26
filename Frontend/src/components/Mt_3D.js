import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist-min';
import * as d3 from 'd3';
import LocationSel from './LocationSel'; // LocationSel 컴포넌트 경로를 맞게 수정하세요

const Mt_3D = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv').then(rows => {
      const unpack = (rows, key) => rows.map(row => row[key]);

      let z_data = [];
      for (let i = 0; i < 24; i++) {
        z_data.push(unpack(rows, i));
      }

      const data = [{
        z: z_data,
        type: 'surface'
      }];

      const layout = {
        title: 'Mt Bruno Elevation',
        autosize: false,
        width: 500,
        height: 500,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90,
        }
      };

      Plotly.newPlot('myDiv', data, layout);
    }).catch(err => {
      console.error('Error loading or processing data:', err);
    });
  }, []);

  return (
    <div>
      <div className='mt-10 mb-7 font-bold text-2xl'>이상탐지 예측 알림</div>
      <div className='w-[90%] mb-3'>
        <LocationSel onChange={setSelectedLocation} className="min-w-[300px]" />
      </div>
      <div id="myDiv"></div>
    </div>
  );
};

export default Mt_3D;
