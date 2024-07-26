import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import PredictBump from '../components/PredictBump.js';
import LocationSel from '../components/LocationSel.js';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState, userLocationState } from '../recoil/atoms';

export default function Forecast_Page() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [userLocation, setUserLocation] = useRecoilState(userLocationState);
  const [ppmData, setPpmData] = useState([]);
  const [microData, setMicroData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    large: '',
    middle: '',
    small: ''
  });

  // 주소 변경 핸들러
  const handleAddressChange = (newAddress) => {
    console.log('newAddress:', newAddress);

    setSelectedLocation({
      large: newAddress.large,
      middle: newAddress.middle,
      small: newAddress.small
    });
  };

  // 대기 오염 데이터 페칭
  useEffect(() => {
    const fetchPredictData = async () => {
      try {
        let response;
        if (isLoggedIn && userLocation) {
          // 로그인 상태라면 사용자의 위치로 데이터를 가져옴
          response = await axios.get(`http://10.125.121.224:8080/predict/${userLocation}`);
        } else if (selectedLocation.large) {
          // 사용자가 특정 위치를 선택한 경우 해당 위치로 데이터를 가져옴
          const { large, middle, small } = selectedLocation;
          const query = `large=${large}&middle=${middle}&small=${small}`;
          console.log("query:", query);
        
        response = await axios.get(`http://10.125.121.224:8080/predict?${query}`);
        } else {
          // 기본 데이터를 가져옴
          response = await axios.get('http://10.125.121.224:8080/predict');
        }

        const data = response.data;
        console.log("API response data:", data);

        if (Array.isArray(data)) {
          const roundToFourDecimalPlaces = (num) => parseFloat(parseFloat(num).toFixed(3));
        
          const so2Data = data.map((item, index) => ({ x: index + 1, y: roundToFourDecimalPlaces(item.so2) }));
          const no2Data = data.map((item, index) => ({ x: index + 1, y: roundToFourDecimalPlaces(item.no2) }));
          const coData = data.map((item, index) => ({ x: index + 1, y: roundToFourDecimalPlaces(item.co) }));
          const o3Data = data.map((item, index) => ({ x: index + 1, y: roundToFourDecimalPlaces(item.o3) }));
          const pm10Data = data.map((item, index) => ({ x: index + 1, y: roundToFourDecimalPlaces(item.pm10) }));
          const pm25Data = data.map((item, index) => ({ x: index + 1, y: roundToFourDecimalPlaces(item.pm25) }));
        
          setPpmData([
            { id: 'SO2', data: so2Data },
            { id: 'NO2', data: no2Data },
            { id: 'CO', data: coData },
            { id: 'OZONE', data: o3Data }
          ]);
        
          setMicroData([
            { id: 'PM10', data: pm10Data },
            { id: 'PM2.5', data: pm25Data }
          ]);
        } else {
          console.error('Unexpected data format:', data);
        }
        
      } catch (error) {
        console.error('대기 오염 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchPredictData();
  }, [isLoggedIn, userLocation, selectedLocation]);

  return (
    <>
      <Nav />
      <div className="bg-[url('./components/background/cloudbg1.png')] bg-cover bg-opacity-50 text-white text-center rounded-t-3xl p-3 h-[100vh] flex justify-start items-center flex-col">
        <h1 className="text-2xl font-bold mb-5 mt-10">6가지 대기 공해 요소 예측</h1>
        <LocationSel onChange={handleAddressChange} />
        <div className="w-full h-[80%] flex flex-col justify-center items-center mt-5 mb-10">
          <PredictBump dustData={ppmData} cate='nivo' />
          <PredictBump dustData={microData} cate='paired' />
        </div>
      </div>
      <Footer />
    </>
  );
}
