import React from 'react';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import Chat from '../img/chat.png';
import { Link } from 'react-router-dom';

export default function Board() {
  return (
    <>
     <div className="flex flex-col justify-center items-center"> 
        <div className="relative -top-40 flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8"> {/* mb-8 추가 */}
          <div className="flex items-center space-x-2"> 
            <img src={Comment} alt="icon" className="h-16 w-16" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>
        <div className="relative -top-14 bg-[#b3dcde] p-6 rounded-lg flex items-center w-1/2">
          <img src={Chat} alt="icon" className="h-20 w-20 mr-4" /> {/* mr-4 추가 */}
          <div>
            <p className="mb-4 text-xl font-bold text-black">회원 문의</p>
            <div className="flex space-x-4">
              <Link to="/inquiry">
              <button className="bg-white text-black py-2 px-2 rounded shadow">1:1 문의</button>
              </Link>
              <Link to="/boardlist">
              <button className="bg-white text-black py-2 px-2 rounded shadow">문의내역</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
