import React, { useEffect, useRef, useState } from 'react';
import jsonp from 'jsonp';

const getPolygonDataURL = (emdCD) => 
  `https://api.vworld.kr/req/data?service=data&version=2.0&request=GetFeature&size=1000&page=1&data=LT_C_ADEMD_INFO&attrfilter=emd_cd:like:${emdCD}&columns=emd_cd,full_nm,emd_kor_nm,emd_eng_nm,ag_geom&geometry=true&attribute=true&key=DC06D473-F021-33AF-A982-3558CDDB5441&domain=http://localhost:3000`;

const MapPolygon = ({ address, info, areaCode }) => {
  const mapElement = useRef(null);
  const markerRef = useRef(null);
  const polygonRefs = useRef([]);
  const [map, setMap] = useState(null);
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);

  useEffect(() => {
    const loadNaverMapsScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_API_KEY}&submodules=geocoder`;
        script.async = true;
        script.onload = () => {
          if (window.naver && window.naver.maps) {
            setNaverMapsLoaded(true);
            resolve(window.naver);
          } else {
            reject(new Error('Naver Maps API failed to load'));
          }
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeMap = async () => {
      try {
        const naver = await loadNaverMapsScript();
        if (!mapElement.current || !naver) return;

        const mapOptions = {
          center: new naver.maps.LatLng(35.25, 128.25), // 초기 위치 설정
          zoom: 9,
          zoomControl: false
        };

        const newMap = new naver.maps.Map(mapElement.current, mapOptions);
        setMap(newMap);
        setNaverMapsLoaded(true);
      } catch (error) {
        console.error("Naver 지도 API 스크립트 로드 오류:", error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    // 수정된 부분: naverMapsLoaded, map, address, areaCode가 유효한지 확인하는 조건 추가
    if (!naverMapsLoaded || !map || !address || !areaCode) return;

    const { naver } = window;
    // 수정된 부분: naver.maps.Service 및 naver.maps.Service.geocode가 존재하는지 확인
    if (!naver.maps.Service || !naver.maps.Service.geocode) {
      console.error('Naver Maps Service or geocode function is not available');
      return;
    }

    naver.maps.Service.geocode({ query: address }, (status, response) => {
      console.log(address);
      if (status === naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
        const { x, y } = response.v2.addresses[0];
        const newLocation = new naver.maps.LatLng(y, x);

        map.setCenter(newLocation);
        map.setZoom(12);

        if (!markerRef.current) {
          markerRef.current = new naver.maps.Marker({
            position: newLocation,
            map,
          });
        } else {
          markerRef.current.setPosition(newLocation);
        }

        showInfoWindow(map, markerRef.current, info, address);
        drawPolygon(newLocation, areaCode); // 다각형을 그리는 함수 호출
      } else {
        console.error(`주소 지오코딩에 실패했습니다: ${address}`);
      }
    });
  }, [naverMapsLoaded, address, map, areaCode]); // 수정된 부분: useEffect 의존성 배열에 naverMapsLoaded 추가

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

  const drawPolygon = async (center, emdCD) => {
    if (!emdCD) return;

    console.log("emdCD: ", emdCD);
    const { naver } = window;

    try {
      jsonp(getPolygonDataURL(emdCD), null, (err, data) => {
        if (err) {
          console.error("Error fetching polygon data: ", err);
          return;
        }

        console.log(data);

        if (!data.response || data.response.status !== "OK" || !data.response.result.featureCollection.features.length) {
          console.error("Failed to fetch data or no features found: ", data.response);
          return;
        }

        // GeoJSON 형식에서 좌표를 추출
        const feature = data.response.result.featureCollection.features[0];
        const coordinates = feature.geometry.coordinates;

        // 이전 폴리곤 지우기
        polygonRefs.current.forEach(polygon => polygon.setMap(null));
        polygonRefs.current = [];

        coordinates.forEach(polygonCoords => {
          const boundaryCoordinates = polygonCoords[0].map(coord => new naver.maps.LatLng(coord[1], coord[0]));
          const polygon = new naver.maps.Polygon({
            map: map,
            paths: boundaryCoordinates,
            fillColor: '#3985F6',
            fillOpacity: 0.6,  //폴리곤 투명도
            strokeColor: '#2C6AC4',
            strokeOpacity: 0.9,  //외각선 투명도
            strokeWeight: 2, //외각선 두께
          });
          polygonRefs.current.push(polygon);
        });
      });
    } catch (error) {
      console.error("폴리곤 데이터를 불러오는데 오류발생: ", error);
    }
  };

  return (
    <div className='flex h-full justify-center w-full'>
      <div ref={mapElement} className='rounded-3xl w-full' style={{ height: '100%' }} />
    </div>
  ); 
};

export default MapPolygon;
