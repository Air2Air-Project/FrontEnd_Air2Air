import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import AlarmCard from '../components/AlarmCard';
import LocationSel from '../components/LocationSel'
import { useRecoilValue } from 'recoil';
import { userLocationState, isLoggedInState } from '../recoil/atoms';
import axios from 'axios';
import AlarmList from '../components/AlarmList.js';

export default function Forecast_Page() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const userLocation = useRecoilValue(userLocationState);
  const [actData, setActData] = useState([]);
  const [polData, setPolData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    sido: '',
    gugun: '',
    eupmyeondong: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let activeResponse;
        let polluteResponse;
        console.log("loc:", userLocation);
        if (selectedLocation.large) {
          const { large, middle, small } = selectedLocation;
          const query = `large=${large}&middle=${middle}&small=${small}`;
          activeResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/ACTIVITY?${query}`);
          polluteResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/POLLUTION?${query}`);
        } else if (isLoggedIn && userLocation) {
          activeResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/ACTIVITY/${userLocation}`);
          polluteResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/POLLUTION?${userLocation}`);
        } else {
          activeResponse = await axios.get('http://10.125.121.224:8080/alertAll/ACTIVITY');
          polluteResponse = await axios.get('http://10.125.121.224:8080/alertAll/POLLUTION');
        }
        setActData(activeResponse.data);
        setPolData(polluteResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isLoggedIn, userLocation, selectedLocation]);

  const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/background.png')] text-white text-center rounded-t-3xl p-3 h-[83vh] flex flex-col justify-start items-center">
      <div className='m-10 font-bold text-2xl'>이상탐지 예측 알림</div>
      <LocationSel onChange={setSelectedLocation} className="min-w-[300px]"/>
      <div className="flex gap-10 mt-4">
        <AlarmCard title="AQI" value={70} />
        <AlarmCard title="UPI" value={40} />
      </div>
      <div className='flex'>
      <AlarmList data={actData} formatDateTime={formatDateTime} />
      <AlarmList data={polData} formatDateTime={formatDateTime} />
      </div>
    </div>
    <Footer/>
    </>
  )
}