import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function BoardList() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const [questionType, setQuestionType] = useState('문의유형');
  const [searchType, setSearchType] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get('http://10.125.121.224:8080/boardlist');
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('데이터 불러오는데 오류!: ', error);
    }
  };

  const fetchFilteredQuestions = async () => {
    try {
      const response = await axios.get('http://10.125.121.224:8080/boardlist/search', {
        params: {
          questionType,
          searchType,
          keyword,
        },
      });
      setQuestions(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('검색 조건에 맞는 데이터를 불러오는데 오류!: ', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    fetchFilteredQuestions();
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const pagesToShow = 5;

  const getPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.classList.add('animate-scale-up');
    });
  }, []);

  return (
    <section className="section02 board_list_section flex flex-col justify-center items-center favicon">
      <div className="relative top-0 sm:-top-32 md:-top-44 lg:-top-14 flex flex-col items-center bg-[#1d5666] text-white p-10 rounded-lg mb-8">
        <div className="flex items-center space-x-2">
          <img src={Comment} alt="icon" className="h-[75px] w-[75px] icon" />
          <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
          <img src={Consultant} alt="icon" className="h-16 w-16 icon" />
        </div>
        <p className="mt-2 text-lg">1:1 문의</p>
      </div>

      <div className="relative top-0 sm:-top-8 md:-top-36 lg:-top-8 w-full px-4 py-4 bg-[#b3dcde] rounded-lg shadow-md mb-8">
        <div className="flex space-x-4">
          <select
            className="w-full p-2 border rounded text-black custom-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="문의유형">문의유형</option>
            <option value="STATION">관측소</option>
            <option value="DUST">미세먼지</option>
            <option value="ALERT">알람</option>
            <option value="ETC">기타</option>
          </select>

          <select
            className="w-full p-2 border rounded text-black custom-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="p-2 border rounded bg-white shadow" onClick={handleSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>

      <div className="relative top-0 sm:-top-8 md:-top-36 lg:-top-8 w-full max-w-4xl mx-auto px-4 py-4 bg-white rounded-lg shadow-md">
        <h2 className="text-left text-xl font-bold text-black mb-4 border-b border-black pb-2">
          <span className="text-red-500">{questions.length}</span>개의 질문이 검색되었습니다.
        </h2>
        <table className="w-full text-black border-collapse table-fixed">
          <thead className="border-b">
            <tr>
              <th className="w-16 px-4 py-2">질문번호</th>
              <th className="w-24 px-4 py-2">문의유형</th>
              <th className="w-1/2 px-4 py-2">제목</th>
              <th className="w-24 px-4 py-2">작성자</th>
              <th className="w-32 px-4 py-2">작성일</th>
              <th className="w-24 px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map((question, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{question.seq}</td>
                <td className="px-4 py-2">{question.questionType}</td>
                <td className="px-4 py-2">
                  <Link to={`/question/detail/${question.seq}`}>{question.title}</Link>
                </td>
                <td className="px-4 py-2">{question.writer}</td>
                <td className="px-4 py-2">
                  {formatDate(question.createdDate)}
                </td>
                <td className={`px-4 py-2 ${question.answered ? 'text-blue-500' : 'text-red-500'}`}>
                  {question.answered ? '답변 완료' : '답변 대기'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            {Math.floor((currentPage - 1) / pagesToShow) > 0 && (
              <button
                onClick={() => handlePageChange((Math.floor((currentPage - 1) / pagesToShow) - 1) * pagesToShow + 1)}
                className="px-3 py-1 bg-white text-black hover:bg-gray-200"
              >
                &lt;
              </button>
            )}
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 ${currentPage === pageNumber ? 'bg-gray-300' : 'bg-white'} text-black hover:bg-gray-200`}
              >
                {pageNumber}
              </button>
            ))}
            {Math.ceil(currentPage / pagesToShow) < Math.ceil(totalPages / pagesToShow) && (
              <button
                onClick={() => handlePageChange(Math.floor(currentPage / pagesToShow) * pagesToShow + 1)}
                className="px-3 py-1 bg-white text-black hover:bg-gray-200"
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
