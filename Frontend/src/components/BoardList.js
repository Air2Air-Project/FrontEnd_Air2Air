import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function BoardList() {
  // 상태 선언: 질문 목록과 현재 페이지 번호를 관리
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10; // 한 페이지에 표시할 질문 수

  // 상태 선언: 검색 조건과 검색어 관리
  const [questionType, setQuestionType] = useState('문의유형');
  const [searchType, setSearchType] = useState('');
  const [keyword, setKeyword] = useState('');

  // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  // 전체 질문 목록을 서버에서 가져오는 함수
  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get('http://10.125.121.224:8080/boardlist');
      setQuestions(response.data); // 가져온 데이터를 상태로 설정
    } catch (error) {
      console.error('데이터 불러오는데 오류!: ', error);
    }
  };

  // 조건에 맞는 질문 목록을 서버에서 가져오는 함수
  const fetchFilteredQuestions = async () => {
    try {
      const response = await axios.get('http://10.125.121.224:8080/boardlist/search', {
        params: {
          questionType,
          searchType,
          keyword,
        },
      });
      setQuestions(response.data); // 가져온 데이터를 상태로 설정
      setCurrentPage(1); // 검색 시 첫 페이지로 이동
    } catch (error) {
      console.error('검색 조건에 맞는 데이터를 불러오는데 오류!: ', error);
    }
  };

  // 페이지 번호 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 번호를 업데이트
  };

  // 검색 핸들러: 검색 조건 변경 시 호출
  const handleSearch = () => {
    fetchFilteredQuestions();
  };

  // 현재 페이지에 해당하는 질문 목록 계산
  const indexOfLastQuestion = currentPage * questionsPerPage; // 현재 페이지의 마지막 질문 인덱스
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage; // 현재 페이지의 첫 번째 질문 인덱스
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion); // 현재 페이지에 해당하는 질문 목록
  const totalPages = Math.ceil(questions.length / questionsPerPage); // 전체 페이지 수 계산
  const pagesToShow = 5; // 한 번에 보여줄 페이지 수

  // 페이지 번호 계산 함수: 현재 페이지 그룹의 시작과 끝 페이지 번호 계산
  const getPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <section className="section02 board_list_section flex flex-col justify-center items-center h-[77%] w-[70%]">
      {/* 헤더 섹션 */}
      <div className="relative -top-10 flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8">
        <div className="flex items-center space-x-2">
          <img src={Comment} alt="icon" className="h-16 w-16" />
          <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
          <img src={Consultant} alt="icon" className="h-16 w-16" />
        </div>
        <p className="mt-2 text-lg">1:1 문의</p>
      </div>

      {/* 검색 섹션 */}
      <div className="container mx-auto px-4 h- py-4 bg-[#b3dcde] rounded-lg shadow-md mb-8">
        <div className="flex space-x-4">
          <select
            className="w-full p-2 border rounded text-black custom-select"
            value={questionType} // 검색 유형 상태와 연결
            onChange={(e) => setQuestionType(e.target.value)} // 검색 유형 변경 시 상태 업데이트
          >
            <option value="문의유형">문의유형</option>
            <option value="관측소">관측소</option>
            <option value="미세먼지">미세먼지</option>
            <option value="알람">알람</option>
            <option value="기타">기타</option>
          </select>

          <select
            className="w-full p-2 border rounded text-black custom-select"
            value={searchType} // 검색 필드 상태와 연결
            onChange={(e) => setSearchType(e.target.value)} // 검색 필드 변경 시 상태 업데이트
          >
            <option value="titleContent">제목+내용</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="seq">번호</option>
          </select>
          <input
            type="text"
            className="w-full p-2 border rounded text-black custom-input"
            placeholder="검색어를 입력하세요"
            value={keyword} // 검색어 상태와 연결
            onChange={(e) => setKeyword(e.target.value)} // 검색어 변경 시 상태 업데이트
          />
          <button className="p-2 border rounded bg-white shadow" onClick={handleSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>

      {/* 질문 목록 섹션 */}
      <div className="container mx-auto px-4 py-4 bg-white rounded-lg shadow-md">
        <h2 className="text-left text-xl font-bold text-black mb-4 border-b border-black pb-2">
          <span className="text-red-500">{questions.length}</span>개의 질문이 검색되었습니다.
        </h2>
        <table className="min-w-full text-black border-collapse">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2 ">질문번호</th>
              <th className="px-4 py-2 ">문의유형</th>
              <th className="px-4 py-2 ">제목</th>
              <th className="px-4 py-2 ">작성자</th>
              <th className="px-4 py-2">작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map((question, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 ">{question.seq}</td>
                <td className="px-4 py-2 ">{question.questionType}</td>
                <td className="px-4 py-2 ">
                  <Link to={`/question/detail/${question.seq}`}>{question.title}</Link>
                </td>
                <td className="px-4 py-2 ">{question.writer}</td>
                <td className="px-4 py-2">
                  {formatDate(question.createdDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            {/* 이전 페이지 그룹 버튼 */}
            {currentPage > pagesToShow && (
              <button
                onClick={() => handlePageChange(currentPage - pagesToShow)} // 이전 페이지 그룹으로 이동
                className="px-3 py-1 r bg-white text-black hover:bg-gray-200"
              >
                &lt;
              </button>
            )}
            {/* 페이지 번호 버튼 생성 */}
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)} // 페이지 번호 클릭 시 해당 페이지로 이동
                className={`px-3 py-1  ${currentPage === pageNumber ? 'bg-gray-300' : 'bg-white'} text-black hover:bg-gray-200`}
              >
                {pageNumber}
              </button>
            ))}
            {/* 다음 페이지 그룹 버튼 */}
            {currentPage <= totalPages - pagesToShow && (
              <button
                onClick={() => handlePageChange(currentPage + pagesToShow)} // 다음 페이지 그룹으로 이동
                className="px-3 py-1  bg-white text-black hover:bg-gray-200"
              >
                &gt;
              </button>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
