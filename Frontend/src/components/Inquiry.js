import React from 'react'
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import { Link } from 'react-router-dom';

export default function Inquiry() {
  return (
    <>
     <div className="justify-center items-center"> 
    <div className="relative flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8"> {/* mb-8 추가 */}
          <div className="flex items-center space-x-2"> 
            <img src={Comment} alt="icon" className="h-16 w-16" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>
        <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-black text-2xl font-bold mb-4">문의유형 <span className="text-red-500">*</span></h2>
        <select className="w-full p-2 border rounded text-black custom-select">
        <option value="" disabled selected>문의 유형을 선택해 주세요.</option>
                <option>ORP</option>
                <option>PHP</option>
                <option>계도율</option>
                <option>기타</option>
              </select>
              <div className="mt-6">
            <label className="block text-black text-lg mb-2" htmlFor="title">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded text-black custom-input"
              placeholder="제목을 입력해 주세요."
            />
          </div>

          <div className="mt-6">
            <label className="block text-black text-lg mb-2" htmlFor="content">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              className="w-full p-2 border rounded text-black custom-textarea"
              rows="10"
              placeholder="내용을 입력해 주세요."
              style={{ overflowY: 'scroll' }}
            />
          </div>
       
          <div className="mt-6 flex justify-end space-x-4">
            <Link to="/boardlist">
            <button type="button" className="bg-gray-200 text-black py-2 px-4 rounded shadow">
              목록보기
            </button>
            </Link>
            <Link to="/boardlist">
            <button type="submit" className="bg-[#17444F] text-white py-2 px-4 rounded shadow">
              문의하기
            </button>
            </Link>
          </div>

      </form>
        </div>
    </>
  )
}
