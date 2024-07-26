import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist-min';
import axios from 'axios';

const Scatter3DChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // CSV 데이터 가져오기
    axios.get('https://raw.githubusercontent.com/plotly/datasets/master/alpha_shape.csv')
      .then(response => {
        const rows = response.data.split('\n').map(row => row.split(','));

        // CSV 헤더 추출
        const headers = rows[0];
        console.log('Headers:', headers); // 디버깅용 로그

        // 데이터 포맷 변경
        const formattedData = rows.slice(1).map(row => {
          let rowData = {};
          row.forEach((val, index) => {
            rowData[headers[index]] = parseFloat(val);
          });
          return rowData;
        });

        console.log('Formatted Data:', formattedData); // 디버깅용 로그

        // unpack 함수
        const unpack = (rows, key) => rows.map(row => row[key]);

        const plotData = [{
          x: unpack(formattedData, 'x'),
          y: unpack(formattedData, 'y'),
          z: unpack(formattedData, 'z'),
          mode: 'markers',
          type: 'scatter3d',
          marker: {
            color: 'rgb(23, 190, 207)',
            size: 2
          }
        }, {
          alphahull: 7,
          opacity: 0.1,
          type: 'mesh3d',
          x: unpack(formattedData, 'x'),
          y: unpack(formattedData, 'y'),
          z: unpack(formattedData, 'z')
        }];

        const layout = {
          autosize: true,
          height: 480,
          scene: {
            aspectratio: {
              x: 1,
              y: 1,
              z: 1
            },
            camera: {
              center: {
                x: 0,
                y: 0,
                z: 0
              },
              eye: {
                x: 1.25,
                y: 1.25,
                z: 1.25
              },
              up: {
                x: 0,
                y: 0,
                z: 1
              }
            },
            xaxis: {
              type: 'linear',
              zeroline: false
            },
            yaxis: {
              type: 'linear',
              zeroline: false
            },
            zaxis: {
              type: 'linear',
              zeroline: false
            }
          },
          title: '3D 포인트 클러스터링',
          width: 477
        };

        setData({ plotData, layout });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      Plotly.newPlot('myDiv', data.plotData, data.layout);
    }
  }, [data]);

  return (
    <div className="w-full p-3 flex flex-col items-center">
      <h2 className="mt-10 mb-7 font-bold text-2xl w-full">3D 포인트 클러스터링</h2>
      <div id="myDiv" className="w-full h-[500px]"></div>
    </div>
  );
};

export default Scatter3DChart;
