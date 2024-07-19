import React from 'react';
import Ozone from '../img/o3.png';
import So2 from '../img/so2.png';
import No2 from '../img/no2.png';
import Co from '../img/co.png';
import Pm10 from '../img/pm10.png';
import Pm25 from '../img/pm25.png';
import Weather from '../img/weather.png';

const DustCard = ({ title, skyDesc, temp, bodyTemp, press, humidity, rain1h, speed, gust, deg, value, grade, location, unit }) => {
  const renderIcon = () => {
    switch (title) {
      case '오존':
        return <img src={Ozone} alt="Ozone" />;
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
      case '날씨 정보':
        return <img src={Weather} alt='Weather' />; 
      default:
        return '알 수 없음';
    }
  };

  const renderGrade = () => {
    switch (grade) {
      case "1":
        return <span className="text-green-700">좋음</span>;
      case "2":
        return <span className="text-blue-700">보통</span>;
      case "3":
        return <span className="text-yellow-600">나쁨</span>;
      case "4":
        return <span className="text-red-700">매우나쁨</span>;
      default:
        return <span className="text-gray-700">알 수 없음</span>;
    }
  };

  return (
    <div className={`bg-white bg-opacity-80 p-5 rounded-2xl shadow-md ${title === '날씨 정보' ? 'w-full' : 'w-auto'} flex`}>
      <div className="ml-4 mt-8 pb-3 w-[70px] h-[70px] justify-start">
        {renderIcon()}
      </div>
      <div className='justify-center pt-10 pl-7'>
        <p className="text-xl font-bold"> {title}</p>
      
        {title === '날씨 정보' ? (
          <div>
            <p>하늘 상태: {skyDesc}</p>
            <p>온도: {temp}°C</p> <br></br>
            <p>체감 온도: {bodyTemp}°C</p>
            <p>기압: {press} hPa</p>
            <p>습도: {humidity}%</p>
            <p>강수량(1h): {rain1h} mm</p><br></br>
            <p>바람 속도: {speed} m/s</p>
            <p>돌풍: {gust} m/s</p>
            <p>풍향: {deg}°</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center h-20 rounded-lg m-2 text-4xl w-full p-5">
              {value} &nbsp; <span className='text-xl'>{unit}</span>
            </div>
          
              <div className='flex justify-center items-center w-full'>
                <span className='text-black text-lg'>{renderGrade()}</span>
              </div> 
          </>
        )}
      </div>
    </div>
  );
};

export default DustCard;
