import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useEffect, useState } from'react';
import DustCard from '../components/DustCard';
import LocationSel from '../components/LocationSel';
    {/* http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?
    stationName=종로구
    &dataTerm=month&pageNo=1&numOfRows=100&returnType=xml&
    serviceKey=서비스키
    더스트카드에서 페치 후 아이콘을 넣어서 카드로 만듦
    그리드 최대 2행 3열 최소 3행 2열

    locationSel에서 선택된 측정소명을 url에 입력하면 페치 후 미세먼지카드 매핑
    측정소 별 실시간 미세먼지 예보
    1시간 간격으로 예보 발행
    첫번째 배열의 값만 당겨오기
    오존(o3Value, o3Grade), 아황산가스(so2Value, so2Grade), 이산화질소(no2Value, no2Grade), 일산화탄소(coValue, coGrade) 
    value(ppm) grade(좋음-1 보통-2 나쁨-3 매우나쁨-4)

    초미세먼지(pm25Value, pm25Grade1h), 미세먼지(pm10Value, pm10Grade1h) 
    value(㎍/㎥) grade(좋음-1 보통-2 나쁨-3 매우나쁨-4) */}
export default function Real_Page() {
    const [data, setData] = useState([]);

  useEffect(() => {
    // 가상의 데이터
    const fetchData = async () => {
      const mockData = [
        {
          id: 1,
          o3Value: 0.03,
          o3Grade: 1,
          so2Value: 0.002,
          so2Grade: 1,
          no2Value: 0.01,
          no2Grade: 1,
          coValue: 0.4,
          coGrade: 1,
          pm25Value: 12,
          pm25Grade1h: 1,
          pm10Value: 40,
          pm10Grade1h: 3,
          location: '서울',
        },
        // 더 많은 데이터를 여기에 추가
      ];

      setData(mockData);
    };

    fetchData();
  }, []);
  return (
    <div className='flex flex-col'>
    <Nav/>
    <div className="bg-[url('./components/background/background.png')] text-black text-center rounded-t-3xl p-3 h-[83vh] flex justify-start items-center flex-col">
    <h1 className="text-2xl font-bold text-center m-7 text-white">실시간 대기상태 정보</h1>
    <LocationSel/>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 mt-5 justify-center items-center w-full">
          {data.map((item) => (
            <>
            <DustCard key={`${item.id}-o3`} title="오존" value={item.o3Value} grade={item.o3Grade} location={item.location} unit="ppm" />
            <DustCard key={`${item.id}-so2`} title="아황산가스" value={item.so2Value} grade={item.so2Grade} location={item.location} unit="ppm" />
            <DustCard key={`${item.id}-no2`} title="이산화질소" value={item.no2Value} grade={item.no2Grade} location={item.location} unit="ppm" />
            <DustCard key={`${item.id}-co`} title="일산화탄소" value={item.coValue} grade={item.coGrade} location={item.location} unit="ppm" />
            <DustCard key={`${item.id}-pm25`} title="초미세먼지" value={item.pm25Value} grade={item.pm25Grade1h} location={item.location} unit="㎍/㎥" />
            <DustCard key={`${item.id}-pm10`} title="미세먼지" value={item.pm10Value} grade={item.pm10Grade1h} location={item.location} unit="㎍/㎥" />
            </>
          ))}
        </div>
    </div>
  <Footer/>
  </div>
  )
}
