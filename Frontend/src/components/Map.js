import React, { useEffect, useRef, useState } from 'react';

const Map = ({ address, info }) => {
  const mapElement = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);

  useEffect(() => {
    const loadNaverMapsScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_API_KEY}&submodules=geocoder`;
        script.async = true;
        script.onload = () => resolve(window.naver);
        script.onerror = reject;
        document.head.appendChild(script);
        
        if (window.naver && window.naver.maps) {
          setNaverMapsLoaded(true);
          resolve(window.naver);
          console.log("method");
          return;
        }
      });
    };

    const initializeMap = async () => {
      try {
        const naver = await loadNaverMapsScript();
        if (!mapElement.current || !naver) return;

        const mapOptions = {
          center: new naver.maps.LatLng(37.54, 126.99), // 초기 위치 설정
          zoom: 15,
          zoomControl: true,
        };

        const newMap = new naver.maps.Map(mapElement.current, mapOptions);
        setMap(newMap);
      } catch (error) {
        console.error("Naver 지도 API 스크립트 로드 오류:", error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    console.log("address:",address);
    if (!naverMapsLoaded || !map || !address) return;
    
    const { naver } = window;
    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status === naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
        const { x, y } = response.v2.addresses[0];
        const newLocation = new naver.maps.LatLng(y, x);

        map.setCenter(newLocation);
        map.setZoom(17);

        if (!markerRef.current) {
          markerRef.current = new naver.maps.Marker({
            position: newLocation,
            map,
          });
        } else {
          markerRef.current.setPosition(newLocation);
        }

        showInfoWindow(map, markerRef.current, info, address);
      } else {
        console.error(`주소 지오코딩에 실패했습니다: ${address}`);
      }
    });
  }, [naverMapsLoaded, address, map]);

  const showInfoWindow = (map, marker, info) => {
    const infoWindowContent = `
      <div class="p-4 shadow-lg">
        <div class="font-bold" style="color: #1B525F;">${info}</div>
      </div>
    `;
    const infoWindow = new window.naver.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 300,
      anchorSize: {
        width: 12,
        height: 14,
      },
      borderColor: "#cecdc7",
    });
  
    infoWindow.open(map, marker);
  };

  return (
    <div className='flex h-[77%] justify-center'>
      <div ref={mapElement} className='rounded-3xl mt-3 w-[90%]' />
      {/* <div className='bg-white bg-opacity-50 rounded-3xl mt-3 ml-3 p-3 w-[40%]'>어쩌구</div> */}
    </div>
  ); 
};

export default Map;

