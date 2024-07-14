// import React from 'react';
// import { ResponsiveBump } from '@nivo/bump';

// export default function PredictBump() {
//     const data = [
//         {
//           "id": "SO2",
//           "data": [
//             { "x": 1, "y": 10 },
//             { "x": 2, "y": 15 },
//             { "x": 3, "y": 11 },
//           ]
//         },
//         {
//           "id": "NO2",
//           "data": [
//             { "x": 1, "y": 15 },
//             { "x": 2, "y": 9 },
//             { "x": 3, "y": 16 },
//           ]
//         },
//         {
//           "id": "CO",
//           "data": [
//             { "x": 1, "y": 21 },
//             { "x": 2, "y": 9 },
//             { "x": 3, "y": 20 },
//           ]
//         },
//         {
//           "id": "PM10",
//           "data": [
//             { "x": 1, "y": 20 },
//             { "x": 2, "y": 19 },
//             { "x": 3, "y": 17 },
//           ]
//         },
//         {
//           "id": "PM2.5",
//           "data": [
//             { "x": 1, "y": 21 },
//             { "x": 2, "y": 11 },
//             { "x": 3, "y": 26 },
//           ]
//         }
//       ];

//   return (
//     <div className="h-96 w-[90%] bg-white rounded-2xl bg-opacity-90 text-black text-xs">
//       <ResponsiveBump
//         data={data}
//         margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
//         lineWidth={5}
//         activeLineWidth={6}
//         inactiveLineWidth={4}
//         spacing={8}
//         colors={{ scheme: 'nivo' }}
//         blendMode="multiply"
//         defs={[
//             {
//                 id: 'dots',
//                 type: 'patternDots',
//                 background: 'inherit',
//                 color: '#38bcb2',
//                 size: 4,
//                 padding: 1,
//                 stagger: true
//             },
//             {
//                 id: 'lines',
//                 type: 'patternLines',
//                 background: 'inherit',
//                 color: '#eed312',
//                 rotation: -45,
//                 lineWidth: 6,
//                 spacing: 10
//             }
//         ]}
//         fill={[
//             { match: { id: 'PM2.5' }, id: 'dots' },
//             { match: { id: 'PM10' }, id: 'lines' }
//         ]}
//         startLabel="id"
//         endLabel="id"
//         axisTop={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: '',
//             legendPosition: 'middle',
//             legendOffset: -36,
//             truncateTickAt: 0
//         }}
//         axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: '',
//             legendPosition: 'middle',
//             legendOffset: 32,
//             truncateTickAt: 0
//         }}
//         tooltip={({ item }) => (
//           <div
//             style={{
//               padding: '12px 16px',
//               background: 'rgba(0, 0, 0, 0.75)',
//               color: 'white',
//             }}
//           >
//             <strong>{item.id}</strong>
//             <br />
//             y: {item.value}
//           </div>
//         )}
//       />
//     </div>
//   );
// }

import React from 'react';
import { ResponsiveAreaBump } from '@nivo/bump';

export default function PredictBump() {
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

  return (
    <div className="h-96 w-[90%] bg-white rounded-2xl bg-opacity-90 text-black text-xs">
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
        tooltip={( {serie} ) => {
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
            y: {serie.y}
          </div>
            )
        }}
      />
    </div>
  );
}
