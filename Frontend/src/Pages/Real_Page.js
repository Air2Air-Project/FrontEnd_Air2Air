import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DustCard from '../components/DustCard';
import LocationSel from '../components/LocationSel';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState, userState, userLocationState } from '../recoil/atoms';
import MapPolygon from '../components/MapPolygon'
import stationData from '../data/station.json'

export default function Real_Page() {
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const [userLocation, setUserLocation] = useRecoilState(userLocationState);
    const [dustData, setDustData] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
      large: '',
      middle: '',
      small: '',
      address: '',
      info: '',
      areaCode: ''
    });

// 디폴트 값 상수로 정의
    const DEFAULT_LOCATION = {
      large: '창원시',
      middle: '마산합포구',
      small: '진동면 삼진의거대로 621',
      address: '창원시 마산합포구 진동면 삼진의거대로 621',
      info: '경남 창원시 마산합포구 진동면 삼진의거대로 621 진동시외버스정류장 앞',
      areaCode: '48125320'
    };


    // 컴포넌트가 처음 렌더링될 때 디폴트 값을 설정하는 useEffect 추가
    useEffect(() => {
        if (!isLoggedIn) {
          setSelectedLocation(DEFAULT_LOCATION);
          // setDustData([]); // 디폴트 값으로 변경
          // setWeatherData(null); // 디폴트 값으로 변경
        }else{
          const location = findEmdCdByStationName(userLocation);
          if (location) {
            setSelectedLocation({
              large: location.large,
              middle: location.middle,
              small: location.small,
              address: `${location.large} ${location.middle} ${location.small}`,
              info: location.info,
              areaCode: location.emd_cd,
            });
           
            console.log("Found emd_cd:", location);
          } else {
            console.error("Station not found:", userLocation);
          }
        }
    }, [isLoggedIn]);

    const handleAddressChange = (newAddress, geoAddress, newInfo, areaCD) => {
      setSelectedLocation({
          ...newAddress,
          address: geoAddress,
          info: newInfo,
          areaCode: areaCD,
          lat: newAddress.lat,
          lon: newAddress.lon
      });
    };

    useEffect(() => {
      const fetchDustData = async () => {
        try {
          let response;
          if (selectedLocation.large) {
            const { large, middle, small } = selectedLocation;
            const query = `large=${large}&middle=${middle}&small=${small}`;
            console.log("query:", query);
            response = await axios.get(`http://localhost:8080/getAirInfo/select?${query}`);
          } else if (isLoggedIn && userLocation) {
            response = await axios.get(`http://localhost:8080/getAirInfo?stationName=${userLocation}`);
          } else {
            response = await axios.get('http://localhost:8080/getAirInfo/select');
          }
          console.log('dust:', response.data);
          setDustData(response.data);
        } catch (error) {
          console.error('Error fetching pollutant data:', error);
        }
      };

      fetchDustData();
    }, [isLoggedIn, userLocation, selectedLocation.large]);

    useEffect(() => {
      const fetchWeatherData = async (location) => {
        try {
          let response;
          if (selectedLocation.large) {
            const { large, middle, small } = location;
            const query = `large=${large}&middle=${middle}&small=${small}`;
            response = await axios.get(`http://localhost:8080/getWeatherInfo/select?${query}`);
          } else if (isLoggedIn && userLocation) {
            response = await axios.get(`http://localhost:8080/getWeatherInfo?stationName=${userLocation}`);
          } else {
            response = await axios.get('http://localhost:8080/getWeatherInfo/select');
          }
          console.log('wind:', response.data);
          setWeatherData({
            sky: response.data.sky,
            skyDesc: response.data.skyDesc,
            temp: response.data.temp,
            bodyTemp: response.data.bodyTemp,
            press: response.data.press,
            humidity: response.data.humidity,
            rain1h: response.data.rain1h,
            speed: response.data.speed,
            deg: response.data.deg,
            gust: response.data.gust,
            stationName: response.data.stationName
          });
        } catch (error) {
          console.error('날씨 데이터를 불러오는데 오류:', error);
        }
      };

      fetchWeatherData(selectedLocation);
    }, [selectedLocation, isLoggedIn, userLocation]);

    const findEmdCdByStationName = (stationName) => {
      const station = stationData.find(station => station.stationName === stationName);
      
      return station ? station : null;
    };

    return (
        <div className='flex flex-col'>
        <Nav/>
        <div className="bg-[url('./components/background/cloudbg1.png')] bg-cover text-black text-center rounded-t-3xl p-3 lg:h-[103vh] md:h-[100vh] flex justify-start items-center flex-col">
        <h1 className="text-2xl font-bold text-center m-7 text-white">실시간 대기상태 정보</h1>
        <div className='w-[90%]'>
        <LocationSel onChange={handleAddressChange}/>
        </div>
        <div className='flex flex-col w-[90%]'>
          
          <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 pb-4 mt-10 justify-center items-center w-full">
            <div className=' w-full h-full row-span-2'>
            <MapPolygon  address={selectedLocation.address} info={selectedLocation.info} areaCode={selectedLocation.areaCode} />
            </div>
              <DustCard title="오존" value={dustData.o3Value} grade={dustData.o3Grade} location={dustData.stationName} unit="ppm" />
              <DustCard title="아황산가스" value={dustData.so2Value} grade={dustData.so2Grade} location={dustData.stationName} unit="ppm" />
              <DustCard title="이산화질소" value={dustData.no2Value} grade={dustData.no2Grade} location={dustData.stationName} unit="ppm" />
              <DustCard title="일산화탄소" value={dustData.coValue} grade={dustData.coGrade} location={dustData.stationName} unit="ppm" />
              {weatherData && (
                                <DustCard 
                                    title="바람 정보" 
                                    speed={weatherData.speed} 
                                    gust={weatherData.gust} 
                                    deg={weatherData.deg} 
                                />
                            )}
              <DustCard title="초미세먼지" value={dustData.pm25Value} grade={dustData.pm25Grade} location={dustData.stationName} unit="㎍/㎥" />
              <DustCard title="미세먼지" value={dustData.pm10Value} grade={dustData.pm10Grade} location={dustData.stationName} unit="㎍/㎥" />
          </div>
      
        </div>

        </div>
      <Footer/>
      </div>
    )
}
