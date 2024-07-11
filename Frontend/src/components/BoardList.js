import React from 'react';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function BoardList() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <img src={Comment} alt="icon" className="h-16 w-16" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#b3dcde] p-4 rounded-lg shadow-md mb-8">
          <div className="flex space-x-4">
            <select className="w-full p-2 border rounded text-black custom-select">
              <option value="" disabled selected>문의유형</option>
              <option>ORP</option>
              <option>PHP</option>
              <option>계도율</option>
              <option>기타</option>
            </select>

            <select className="w-full p-2 border rounded text-black custom-select">
              <option value="" disabled selected>제목+내용</option>
              <option value="title1">제목</option>
              <option value="title2">내용</option>
            </select>
            <input
              type="text"
              className="w-full p-2 border rounded text-black custom-input"
              placeholder="검색어를 입력하세요"
            />
            <button className="p-2 border rounded bg-white shadow">
              <MagnifyingGlassIcon className="h-6 w-6 text-black" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4">740개의 질문이 검색되었습니다.</h2>
          <table className="min-w-full bg-white border">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">질문번호</th>
                <th className="px-4 py-2">문의유형</th>
                <th className="px-4 py-2">제목</th>
                <th className="px-4 py-2">작성자</th>
                <th className="px-4 py-2">작성일</th>
              </tr>
            </thead>
            <tbody>
              {/* 이 부분에 실제 데이터를 넣을 예정입니다. 현재는 더미 데이터로 빈행을 생성합니다. */}
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">1852</td>
                  <td className="px-4 py-2">네이버페이문의</td>
                  <td className="px-4 py-2">네이버페이 결제형 비실물 상품 연동 가능한가요?</td>
                  <td className="px-4 py-2">작성자</td>
                  <td className="px-4 py-2">2024-07-04</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <nav className="flex space-x-2">
              {/* 페이지네이션을 위한 버튼 */}
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  className="px-3 py-1 rounded border bg-white text-black hover:bg-gray-200"
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
