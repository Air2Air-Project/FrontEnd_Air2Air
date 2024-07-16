
import React, { useState, useRef } from 'react';
import { ResponsiveAreaBump } from '@nivo/bump';
import * as d3 from 'd3'; //데이터값을 화면 좌표에 매핑

const PredictBump = () => {
    const chartRef = useRef(null);
    const [tooltipContent, setTooltipContent] = useState(null);

    const dustData = [
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
        },
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

    const handleMouseMove = (point, event) => {
        const chart = chartRef.current;
        const rect = chart.getBoundingClientRect();
        //chart로 차트의 div도형을 불러오고 rect로 길이를 재어서 포인터의 위치를 알아낼 수 있다.
        const mouseX = event.clientX - rect.left;

        // Calculate scales
        const xScale = d3.scaleLinear()
            .domain([1, 3]) // Use actual domain of your data
            .range([0, rect.width]);

        // Find closest x value
        const xValues = dustData[0].data.map(d => d.x);
        const closestX = xValues.reduce((prev, curr) => (
            Math.abs(xScale(curr) - mouseX) < Math.abs(xScale(prev) - mouseX) ? curr : prev
        ));
        // console.log("Point:", point)
        // console.log("closetX:", closestX)
        // setClosestX(closestX);
        setTooltipContent({
            serie: point.data,
            x: closestX,
            y: point.data.y,
            clientX: event.clientX,
            clientY: event.clientY
        });
        // console.log("tooltipContent:",tooltipContent)
    };

    return (
        <div className="relative h-96 w-[90%] bg-white rounded-2xl bg-opacity-90 text-black text-xs" ref={chartRef}>
            <ResponsiveAreaBump
                data={dustData}
                margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
                spacing={8}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    { match: { id: 'PM2.5' }, id: 'dots' },
                    { match: { id: 'PM10' }, id: 'lines' }
                ]}
                startLabel="id"
                endLabel="id"
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -36,
                    truncateTickAt: 0
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
        onMouseMove={(point, event) => handleMouseMove(point, event)}
        tooltip={({ }) => {
          if(tooltipContent == null)
            return;

          const { serie, x} = tooltipContent;
          // console.log("tool tooltip:",tooltipContent)
          // console.log("tool tooltip:",serie)
      
          return (
              <div
                  style={{
                      padding: '12px 16px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: 'white',
                  }}
              >
                  <strong>{serie.id}</strong>
                  <br />
                  x: {x}
                  <br />
                  y: {serie.data[x-1].y}
              </div>
          );
      }}
    />
</div>
    );
}

export default PredictBump;