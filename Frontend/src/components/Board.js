import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import Chat from '../img/chat.png';
import { Link } from 'react-router-dom';
import { userState } from '../recoil/atoms';

export default function Board() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const icons = document.querySelectorAll('.icon'); // 'icon' 클래스를 가진 모든 요소를 선택
    icons.forEach(icon => {
      icon.classList.add('animate-scale-up'); // 각 아이콘 요소에 'animate-scale-up' 클래스를 추가
    });
  }, []);

  const handleInquiryClick = () => {
    if (!user?.memberId) {
      alert('로그인 후 이용가능합니다!');
      navigate('/login');
    } else {
      navigate('/inquiry');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="relative -top-36 flex flex-col items-center bg-[#1d5666] text-white p-10 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <img src={Comment} alt="icon" className="h-[75px] w-[75px] icon" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16 icon" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>
        <div className="relative -top-16 bg-[#b3dcde] p-6 rounded-lg flex items-center w-1/2">
          <img src={Chat} alt="icon" className="h-20 w-20 mr-4" />
          <div>
            <p className="mb-4 text-xl font-bold text-black">회원 문의</p>
            <div className={user?.role === 'ROLE_ADMIN' ? "flex m-5 space-x-4" : "flex space-x-4"}>
              {user?.role === 'ROLE_ADMIN' ? (
                <Link to="/boardlist">
                  <button className="bg-white text-black py-2 px-6 rounded shadow">답변하기</button>
                </Link>
              ) : (
                <>
                   <button onClick={handleInquiryClick} className="bg-white text-black py-2 px-2 rounded shadow">1:1 문의</button>
                  <Link to="/boardlist">
                    <button className="bg-white text-black py-2 px-2 rounded shadow">문의내역</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
