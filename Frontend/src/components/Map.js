// import { useEffect, useRef } from 'react';

// function Map() {
//   const mapRef = useRef(null);
//   const { naver } = window;
  
//   useEffect(() => {
//     // 네이버 지도 옵션 선택
//     const mapOptions = {
//       // 지도의 초기 중심 좌표
//       center: new naver.maps.LatLng(37.5666103, 126.9783882),
//       logoControl: false, // 네이버 로고 표시 X
//       mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
//       scaleControl: true, // 지도 축척 컨트롤의 표시 여부
//       tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
//       zoom: 14, // 지도의 초기 줌 레벨
//       zoomControl: true, // 줌 컨트롤 표시
//       zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
//     };
//     mapRef.current = new naver.maps.Map(
//       'map',
//       mapOptions
//     );
//   }, [naver.maps.Map, naver.maps.LatLng]);

//   return <div id="map" />
// }

// export default Map;

import React, { useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const { naver } = window;

      if (naver && naver.maps) {
        const map = new naver.maps.Map(mapRef.current, {
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 10,
        });
      }
    };

    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=gqjaav5eki`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className='flex'>
    <div className='rounded-3xl mt-3 w-[60%] h-[600px]'
      ref={mapRef}
      // style={{
      //   width: '60%',
      //   height: '600px',
      // }}
    />
    <div className='bg-white bg-opacity-50 h-[600px] rounded-3xl mt-3 ml-3 p-3 w-[40%]'>어쩌구</div>
    </div>
  );
};

export default Map;
