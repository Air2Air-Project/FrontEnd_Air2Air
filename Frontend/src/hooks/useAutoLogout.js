import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userState } from '../recoil/atoms';

// getCookie 함수 정의
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const useAutoLogout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [user, setUser] = useRecoilState(userState); 

  useEffect(() => {
    const token = getCookie('accessToken');
    if (!token) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // 만료 시간을 밀리초로 변환
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          setIsLoggedIn(false);
          setUser({ memberId: '' }); // 초기화할 기타 사용자 정보
          alert("로그아웃되었습니다. 다시 로그인 해주세요.");
          navigate('/login');
        } else {
          // 만료 시간을 체크
          const timer = setTimeout(() => {
            const newCurrentTime = Date.now();
            if (newCurrentTime >= expirationTime) {
              setIsLoggedIn(false);
              setUser({ memberId: '' });
              alert("로그아웃되었습니다. 다시 로그인 해주세요.");
              navigate('/login');
            }
          }, expirationTime - currentTime);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('토큰 디코딩 에러:', error);
        setIsLoggedIn(false);
        setUser({ memberId: '' });
        alert("로그아웃되었습니다. 다시 로그인 해주세요.");
        navigate('/login');
      }
    }
  }, [isLoggedIn, navigate, setIsLoggedIn, setUser]);

  return null; // 더 이상 핸들러를 반환하지 않음
};

export default useAutoLogout;
