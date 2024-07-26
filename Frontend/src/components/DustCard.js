import React from 'react';
import Ozone from '../img/o3.png';
import So2 from '../img/so2.png';
import No2 from '../img/no2.png';
import Co from '../img/co.png';
import Pm10 from '../img/pm10.png';
import Pm25 from '../img/pm25.png';
import Wind from '../img/wind.png';
import Bad from '../img/bad.png';
import Good from '../img/good.png';
import Normal from '../img/normal.png';

const DustCard = ({ title, speed, gust, deg, value, grade, unit }) => {
  const renderIcon = () => {
    switch (title) {
      case '오존':
        return <img className='' src={Ozone} alt="Ozone" />;
      case '아황산가스':
        return <img src={So2} alt="So2" />;
      case '이산화질소':
        return <img src={No2} alt="No2" />;
      case '일산화탄소':
        return <img src={Co} alt="Co" />;
      case '초미세먼지':
        return <img src={Pm25} alt="Pm25" />;
      case '미세먼지':
        return <img src={Pm10} alt="Pm10" />;
      case '바람 정보':
        return <img src={Wind} alt='Weather' />;
      default:
        return '알 수 없음';
    }
  };

  const renderGrade = () => {
    switch (grade) {
      case "1":
        return (
          <div className="flex flex-col items-center mt-[-40px]">
            <img src={Good} alt="Good" className="inline-block w-10 h-10 mb-2" />
            <span className="text-green-700">좋음</span>
          </div>
        );
      case "2":
        return (
          <div className="flex flex-col items-center mt-[-40px] ">
            <img src={Normal} alt="Normal" className="inline-block w-10 h-10 mb-2 " />
            <span className="text-blue-700">보통</span>
          </div>
        );
      case "3":
        return (
          <div className="flex flex-col items-center mt-[-40px]">
            <img src={Bad} alt="Bad" className="inline-block w-10 h-10 mb-2" />
            <span className="text-yellow-600">나쁨</span>
          </div>
        );
      case "4":
        return (
          <div className="flex flex-col items-center mt-[-40px]">
            <img src={Bad} alt="Bad" className="inline-block w-10 h-10 mb-2" />
            <span className="text-red-700">매우나쁨</span>
          </div>
        );
      default:
        return <span className="text-gray-700">점검 중</span>;
    }
  };

  return (
    <div className='bg-white bg-opacity-80 p-5 text-center rounded-2xl shadow-md w-full flex justify-around'>
      <div className="ml-10 mt-12 pb-3 min-w-[60px] min-h-[60px] w-[70px] h-[70px] justify-start">
        {renderIcon()}
      </div>
      <div className='justify-center pt-10 pl-7'>
        <p className="text-xl font-bold text-left ml-10"> {title}</p>
        {title === '바람 정보' ? (
          <div className='flex flex-col items-center justify-center h-20 rounded-lg text-lg w-full p-10 mb-4'>
            <div className='flex space-x-2'>
              <div>바람 속도: {speed} m/s</div>
              <div>돌풍: {gust} m/s</div>
              <div>풍향: {deg}°</div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center h-20 rounded-lg m-2 text-4xl w-full p-5">
              <div className="flex flex-between items-center ">
                {value} &nbsp; <span className='text-xl'>{unit}</span>
              </div>
              <span className='text-black text-lg ml-20'>{renderGrade()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DustCard;
