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
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    large: '',
    middle: '',
    small: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setOutdoorIdx(80); // 예제 데이터 설정
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

  useEffect(() => {
    if (outdoorIdx >= 50) {
      setShowModal(true);
    }
  }, [outdoorIdx]);

  const closeModal = () => {
    setShowModal(false);
  };

  const formatDateTime = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Nav />
      <div className="bg-[url('./components/background/cloudbg1.png')] text-white text-center rounded-t-3xl p-3 h-[100vh] flex flex-col justify-start items-center">
        <div className='m-10 font-bold text-2xl'>이상탐지 예측 알림</div>
        <div className='w-[90%]'>
          <LocationSel onChange={setSelectedLocation} className="min-w-[300px]" />
        </div>
        <div className="grid grid-cols-3 justify-center gap-8 mt-4 w-[90%]">
          <Gauge powerData="70" title="도시공해지수" gaugeColor={["#95B8D1", "#05668D", "#05668D"]} />
          <Gauge powerData="55" title="대기환경지수" gaugeColor={["#ffd60a", "#EBA6A9", "#e03400"]} />
          <Gauge powerData={outdoorIdx} title="야외활동지수" gaugeColor={["#BBD5AF", "#BBD5AF", "#354f52"]} />
        </div>
        <div className='flex w-[90%] gap-8'>
          <AlarmList data={actData} formatDateTime={formatDateTime} />
          <AlarmList data={polData} formatDateTime={formatDateTime} />
        </div>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
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
          <h2>주의!</h2>
          <p>야외활동지수가 {outdoorIdx}이므로 야외활동을 자제하세요.</p>
          <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">닫기</button>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
