import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { alertState, alertCountState, alertLoadingState, userState, isLoggedInState } from '../recoil/atoms';

const WebSocketProvider = ({ children }) => {
  const setAlerts = useSetRecoilState(alertState);
  const setAlertCount = useSetRecoilState(alertCountState);
  const setLoading = useSetRecoilState(alertLoadingState);
  const user = useRecoilValue(userState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const ws = new WebSocket('ws://10.125.121.224:8080/pushservice');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setLoading(false);

      ws.send(JSON.stringify({ type: 'authenticate', token: localStorage.getItem('ACCESS_TOKEN')}));
    };

    ws.onmessage = (event) => {
      const alert = JSON.parse(event.data);
      if (alert.alertType === "ABNORMAL") {
        setAlerts((prevAlerts)=>{
            const newAlerts = [...prevAlerts, alert.message];
            //setAlerts와 setAlertCount를 동시에 설정하면 recoil상태 업데이트에 오류가 생겨서 시간차를 두고 처리하게 해야한다.
            setTimeout(() => {
                setAlertCount(newAlerts.length); // 알람 갯수 업데이트
              }, 0); // 다음 렌더 사이클에 alertCount 업데이트
            return newAlerts;            
        });
    }
    console.log("alert:",alert);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
      setLoading(false);
    };

    // Cleanup function
    return () => {
      ws.close();
    };
  }, [isLoggedIn, user, setAlerts, setAlertCount, setLoading]); //알람을 받을 때 마다 갱신

  return <>{children}</>;
};

export default WebSocketProvider;
