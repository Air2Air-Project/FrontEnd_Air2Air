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
    const [windData, setWindData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
      large: '',
      middle: '',
      small: '',
      lat: 35.1796,  //경남
      lon: 128.6087,
      adress:'',
      info:'',
      areaCode:''
    });
    // const [locationData, setLocationData] = useState({ address: '', info: '', areaCode: '' });
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
      const fetchWeatherData = async () => {
        try {
          let response;
          if (selectedLocation.large) {
            const { large, middle, small } = selectedLocation;
            const query = `large=${large}&middle=${middle}&small=${small}`;
            console.log("query:", query);

            response = await axios.get(`http://10.125.121.224:8080/getAirInfo/select?${query}`);
          } else if (isLoggedIn && userLocation) {
            response = await axios.get(`http://10.125.121.224:8080/getAirInfo?stationName=${userLocation}`);
          } else {
            response = await axios.get('http://10.125.121.224:8080/getAirInfo/select');
          }
          console.log('dust:', response.data);
          setDustData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
    }, [isLoggedIn, userLocation, selectedLocation]);

    useEffect(() => {
      const fetchWindData = async (location) => {
        try {
          let response;
          if (selectedLocation.large) {
            const { large, middle, small } = location;
            const query = `large=${large}&middle=${middle}&small=${small}`;
            response = await axios.get(`http://10.125.121.224:8080/getWeatherInfo/select?${query}`);
          } else if (isLoggedIn && userLocation) {
            response = await axios.get(`http://10.125.121.224:8080/getWeatherInfo?stationName=${userLocation}`);
          } else {
            response = await axios.get('http://10.125.121.224:8080/getWeatherInfo/select');
          }
          console.log('wind:', response.data);
          setWindData({
            speed: response.data.speed,
            deg: response.data.deg,
            gust: response.data.gust
          });
        } catch (error) {
          console.error('바람 데이터를 불러오는데 오류:', error);
        }
      };

      fetchWindData(selectedLocation);
    }, [selectedLocation, isLoggedIn, userLocation]);

    return (
      <div className='flex flex-col min-h-screen'>
           <Nav />
          <div className="bg-[url('./components/background/cloudbg1.png')] text-black text-center rounded-t-3xl p-3 min-h-screen lg:h-[83vh] md:h-[100vh] flex flex-col">
               <h1 className="text-2xl font-bold text-center m-7 text-white">실시간 대기상태 정보</h1>
               <LocationSel onChange={handleAddressChange}/>
               <div className="flex flex-row flex-1 w-full mt-10">
                   <div className="flex flex-1 justify-center items-start -m-3 ">
                   <MapPolygon address={selectedLocation.address} info={selectedLocation.info} areaCode={selectedLocation.areaCode} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 flex-1">
                        {windData && (
                            <DustCard title="바람" value={windData.speed} gust={windData.gust} deg={windData.deg} unit="m/s" />
                        )}
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
