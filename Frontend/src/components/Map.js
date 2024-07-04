import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { locationState } from '../recoil/atoms';

const Map = () => {
  const mapRef = useRef(null);
  const location = useRecoilValue(locationState);
  const mapInstance = useRef(null);
  const [lat, setLat] = useState(37.54);  // 초기 위도
  const [lng, setLng] = useState(126.99); // 초기 경도

  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;

      if (naver && naver.maps) {
        mapInstance.current = new naver.maps.Map(mapRef.current, {
          center: new naver.maps.LatLng(lat, lng),
          zoom: 10,
        });
      }
    };

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=gqjaav5eki&submodules=geocoder';
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      loadScript();
    }
  }, [lat, lng]);  // 초기 위도와 경도를 의존성 배열에 추가

  useEffect(() => {
    const { naver } = window;
    if (location.eupmyeondong) {
      const address = `${location.eupmyeondong}`;
      console.log("address:", address);

      naver.maps.Service.geocode({ query: address }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!');
        }
        const result = response.v2.addresses[0];
        const newLat = result.y;
        const newLng = result.x;
        setLat(newLat);  // 위도 업데이트
        setLng(newLng);  // 경도 업데이트
        const newCenter = new naver.maps.LatLng(newLat, newLng);
        mapInstance.current.setCenter(newCenter);
        mapInstance.current.setZoom(14);
      });
    }
  }, [location]);

  return (
    <div className='flex h-[77%]'>
      <div className='rounded-3xl mt-3 w-[60%]' ref={mapRef} />
      <div className='bg-white bg-opacity-50 rounded-3xl mt-3 ml-3 p-3 w-[40%]'>어쩌구</div>
    </div>
  );
};

export default Map;
