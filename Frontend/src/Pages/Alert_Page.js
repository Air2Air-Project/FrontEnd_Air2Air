import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import LocationSel from '../components/LocationSel'
import { useRecoilValue } from 'recoil';
import { userLocationState, isLoggedInState } from '../recoil/atoms';
import axios from 'axios';
import AlarmList from '../components/AlarmList.js';
import Gauge from '../components/Gauge.js';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 애플리케이션 루트 엘리먼트를 설정합니다.

export default function Forecast_Page() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const userLocation = useRecoilValue(userLocationState);
  const [actData, setActData] = useState([]);
  const [polData, setPolData] = useState([]);
  const [outdoorIdx, setOutdoorIdx] = useState('');
  const [showOutdoorModal, setShowOutdoorModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    large: '',
    middle: '',
    small: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cityResponse; // 도시공해지수
        if (selectedLocation.large) {
          const { large, middle, small } = selectedLocation;
          const query = `large=${large}&middle=${middle}&small=${small}`;
          cityResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/CITY?${query}`);
        } else if (isLoggedIn && userLocation) {
          cityResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/CITY/${userLocation}`);
        } else {
          cityResponse = await axios.get('http://10.125.121.224:8080/alertAll/CITY');
        }
        setActData(cityResponse.data);
        // 예제 데이터 설정
        setOutdoorIdx(80); // 이 부분을 적절한 위치로 옮기거나 실제 데이터를 사용

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isLoggedIn, userLocation, selectedLocation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let airResponse;//대기환경지수
        if (selectedLocation.large) {
          const { large, middle, small } = selectedLocation;
          const query = `large=${large}&middle=${middle}&small=${small}`;
          airResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/AIR?${query}`);
        } else if (isLoggedIn && userLocation) {
          airResponse = await axios.get(`http://10.125.121.224:8080/alertSelect/AIR/${userLocation}`);
        } else {
          airResponse = await axios.get('http://10.125.121.224:8080/alertAll/AIR');
        }
        setPolData(airResponse.data);

        console.log("airResponse:",airResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isLoggedIn, userLocation, selectedLocation]);

  useEffect(() => {
    if (outdoorIdx >= 50) {
      setShowOutdoorModal(true);
    }
  }, [outdoorIdx]);

  useEffect(() => {
    if (actData.length > 0 && actData[0].value >= 60) {
      setShowCityModal(true);
    }
  }, [actData]);

  const closeOutdoorModal = () => {
    setShowOutdoorModal(false);
  };

  const closeCityModal = () => {
    setShowCityModal(false);
  };

  const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };
  console.log("actData:",actData);
  return (
    <>
      <Nav />
      <div className="bg-[url('./components/background/cloudbg1.png')] text-white text-center rounded-t-3xl p-3 h-[100vh] flex flex-col justify-start items-center">
        <div className='m-10 font-bold text-2xl'>이상탐지 예측 알림</div>
        <div className='w-[90%]'>
          <LocationSel onChange={setSelectedLocation} className="min-w-[300px]" />
        </div>
        <div className="grid grid-cols-3 justify-center gap-8 mt-4 w-[90%]">
          <Gauge powerData={actData.length > 0 ? actData[0].value : 0} title="도시공해지수" gaugeColor={["#95B8D1", "#05668D", "#05668D"]} />
          <Gauge powerData={polData.length > 0 ? polData[0].value : 0} title="대기환경지수" gaugeColor={["#ffd60a", "#EBA6A9", "#e03400"]} />
          <Gauge powerData={outdoorIdx} title="야외활동지수" gaugeColor={["#BBD5AF", "#BBD5AF", "#354f52"]} />
        </div>
        <div className='flex w-[90%] gap-8'>
          <AlarmList data={actData} formatDateTime={formatDateTime} />
          <AlarmList data={polData} formatDateTime={formatDateTime} />
        </div>
        <Modal
          isOpen={showOutdoorModal}
          onRequestClose={closeOutdoorModal}
          contentLabel="Warning Modal"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              textAlign: 'center'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          <h2 className='font-extrabold text-blue-700 text-xl'>주의</h2>
          <br/>
          <p>야외활동지수가 {outdoorIdx}%이므로 야외활동을 자제하세요.</p>
          <br/>
          <button onClick={closeOutdoorModal} className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-lg">닫기</button>
        </Modal>
        <Modal
          isOpen={showCityModal}
          onRequestClose={closeCityModal}
          contentLabel="Warning Modal"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '10px',
              width: '400px',
              textAlign: 'center'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          <h2 className='font-extrabold text-red-700 text-xl'>주의</h2>
          <br/>
          <p>도시공해지수가 {actData.length > 0 ? actData[0].value : 0}%이므로 주의가 필요합니다.</p>
          <br/>
          <button onClick={closeCityModal} className="mt-4 bg-red-400 text-white px-4 py-2 rounded-lg">닫기</button>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
