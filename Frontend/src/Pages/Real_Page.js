import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DustCard from '../components/DustCard';
import LocationSel from '../components/LocationSel';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState, userState, userLocationState } from '../recoil/atoms';
import { useLocation } from 'react-router-dom';
import MapPolygon from '../components/MapPolygon'

export default function Real_Page() {
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const [userLocation, setUserLocation] = useRecoilState(userLocationState);
    const [dustData, setDustData] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
      large: '',
      middle: '',
      small: '',
      lat: 35.1796,  // 경남
      lon: 128.608,
      address:'',
      info:'',
      areaCode:''
    });

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
      const fetchPollutantData = async () => {
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

      fetchPollutantData();
    }, [isLoggedIn, userLocation, selectedLocation]);

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

    return (
      <div className='flex flex-col'>
           <Nav />
          <div className="bg-[url('./components/background/cloudbg1.png')] text-black text-center rounded-t-3xl p-3 min-h-screen flex flex-col">
          {/* <div className="bg-[url('./components/background/cloudbg1.png')] text-black text-center rounded-t-3xl p-3 min-h-screen lg:h-[83vh] md:h-[100vh] flex flex-col"> */}
               <h1 className="text-2xl font-bold text-center m-7 text-white">실시간 대기상태 정보</h1>
               <LocationSel onChange={handleAddressChange}/>
               <div className="flex flex-row flex-1 w-full mt-10">
                   <div className="flex-col justify-center items-start -m-3 ">
                   <MapPolygon address={selectedLocation.address} info={selectedLocation.info} areaCode={selectedLocation.areaCode} />
                        {weatherData && (
                            <DustCard 
                                title="날씨 정보" 
                                skyDesc={weatherData.skyDesc} 
                                temp={weatherData.temp} 
                                bodyTemp={weatherData.bodyTemp} 
                                press={weatherData.press} 
                                humidity={weatherData.humidity} 
                                rain1h={weatherData.rain1h} 
                                speed={weatherData.speed} 
                                gust={weatherData.gust} 
                                deg={weatherData.deg} 
                            />
                        )}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 flex-1">
                      <DustCard title="오존" value={dustData.o3Value} grade={dustData.o3Grade} location={dustData.stationName} unit="ppm" />
                      <DustCard title="아황산가스" value={dustData.so2Value} grade={dustData.so2Grade} location={dustData.stationName} unit="ppm" />
                      <DustCard title="이산화질소" value={dustData.no2Value} grade={dustData.no2Grade} location={dustData.stationName} unit="ppm" />
                      <DustCard title="일산화탄소" value={dustData.coValue} grade={dustData.coGrade} location={dustData.stationName} unit="ppm" />
                      <DustCard title="초미세먼지" value={dustData.pm25Value} grade={dustData.pm25Grade} location={dustData.stationName} unit="㎍/㎥" />
                      <DustCard title="미세먼지" value={dustData.pm10Value} grade={dustData.pm10Grade} location={dustData.stationName} unit="㎍/㎥" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}