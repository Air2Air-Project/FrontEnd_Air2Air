import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect, useState } from'react';
import axios from 'axios';
import DustCard from '../components/DustCard';
import LocationSel from '../components/LocationSel';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState, userState, userLocationState } from '../recoil/atoms';
import { useLocation } from 'react-router-dom';

export default function Real_Page() {
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const [userLocation, setUserLocation] = useRecoilState(userLocationState);
    const [dustData, setDustData] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({
      large: '',
      middle: '',
      small: ''
    });

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          let response;
          if (selectedLocation.large) {
            const { large, middle, small } = selectedLocation;
            const query = `large=${large}&middle=${middle}&small=${small}`;
            console.log("query:",query);
            response = await axios.get(`http://10.125.121.224:8080/getAirInfo/select?${query}`);
          } else if (isLoggedIn && userLocation) {
            response = await axios.get(`http://10.125.121.224:8080/getAirInfo?stationName=${userLocation}`);
          }else {
            response = await axios.get('http://10.125.121.224:8080/getAirInfo/select');
          }
          console.log('dust:',response.data);
          setDustData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      fetchWeatherData();
    }, [isLoggedIn, userLocation, selectedLocation]);
  return (
    <div className='flex flex-col'>
    <Nav/>
    <div className="bg-[url('./components/background/cloudbg1.png')] text-black text-center rounded-t-3xl p-3 lg:h-[83vh] md:h-[100vh] flex justify-start items-center flex-col">
    <h1 className="text-2xl font-bold text-center m-7 text-white">실시간 대기상태 정보</h1>
    <LocationSel onChange={setSelectedLocation}/>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 mt-20 justify-center items-center w-full">
            <DustCard title="오존" value={dustData.o3Value} grade={dustData.o3Grade} location={dustData.stationName} unit="ppm" />
            <DustCard title="아황산가스" value={dustData.so2Value} grade={dustData.so2Grade} location={dustData.stationName} unit="ppm" />
            <DustCard title="이산화질소" value={dustData.no2Value} grade={dustData.no2Grade} location={dustData.stationName} unit="ppm" />
            <DustCard title="일산화탄소" value={dustData.coValue} grade={dustData.coGrade} location={dustData.stationName} unit="ppm" />
            <DustCard title="초미세먼지" value={dustData.pm25Value} grade={dustData.pm25Grade} location={dustData.stationName} unit="㎍/㎥" />
            <DustCard title="미세먼지" value={dustData.pm10Value} grade={dustData.pm10Grade} location={dustData.stationName} unit="㎍/㎥" />
        </div>
    </div>
  <Footer/>
  </div>
  )
}
