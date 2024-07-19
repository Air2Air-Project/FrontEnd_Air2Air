import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userState } from '../recoil/atoms';


const useAutoLogout = (setIsModalOpen) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('nickname');
    localStorage.removeItem('memberId');
    localStorage.removeItem('USER_LOCATION');

    if (setIsModalOpen) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    //const token = getCookie('accessToken');
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // 만료 시간을 밀리초로 변환
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          handleLogout();
          setUser({ memberId: '' }); // 초기화할 기타 사용자 정보
          //alert("로그아웃되었습니다. 다시 로그인 해주세요.");
          //navigate('/login');
        } else {
          // 만료 시간을 체크
          const timer = setTimeout(() => {
            const newCurrentTime = Date.now();
            if (newCurrentTime >= expirationTime) {
              handleLogout();
              // setIsLoggedIn(false);
              // setUser({ memberId: '' });
              //alert("로그아웃되었습니다. 다시 로그인 해주세요.");
              //navigate('/login');
            }
          }, expirationTime - currentTime);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('토큰 디코딩 에러:', error);
        handleLogout();
        // setIsLoggedIn(false);
        // setUser({ memberId: '' });
        //alert("로그아웃되었습니다. 다시 로그인 해주세요.3");
        //navigate('/login');
      }
    }
  }, [isLoggedIn, navigate, setIsLoggedIn, setUser]);

  // return null; // 더 이상 핸들러를 반환하지 않음
};

export default useAutoLogout;
