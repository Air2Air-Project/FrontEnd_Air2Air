import React from 'react';

const AlarmCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-64 text-center text-black bg-opacity-80">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="w-full">
        <div className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
          <div
            className="absolute top-0 h-6 w-1 bg-white rounded-full"
            style={{ left: `${value}%`, backgroundColor: getColor(value) }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Bad</span>
          <span>Good</span>
        </div>
      </div>
      <div className="text-2xl mt-4">{value}%</div>
    </div>
  );
};

const getColor = (value) => {
  if (value < 50) return 'red';
  if (value < 70) return 'yellow';
  return 'green';
};

export default AlarmCard;
