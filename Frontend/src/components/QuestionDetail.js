import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';

export default function QuestionDetail() {
  const { seq } = useParams(); // URL에서 seq 파라미터를 가져옴
  const [questionDetail, setQuestionDetail] = useState(null);
  const navigate = useNavigate(); // 리디렉션을 위해 useNavigate 훅 사용

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // 질문 상세 정보를 가져오는 함수
    const fetchQuestionDetail = async () => {
      try {
        const response = await axios.get(`http://10.125.121.224:8080/question/detail/${seq}`);
        setQuestionDetail(response.data);
      } catch (error) {
        console.error('질문 상세 정보를 불러오는데 오류 발생: ', error);
      }
    };

    fetchQuestionDetail();
  }, [seq]);

  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.classList.add('animate-scale-up');
    });
  }, []);

  // 삭제 요청을 처리하는 함수
  const handleDelete = async () => {
    try {
      const response =
      await axios.delete(`http://10.125.121.224:8080/question/delete`,{
        params: {
          questionId: seq, 
          memberId: 1 
        }
      });
      console.log('삭제 요청 응답:', response);
      alert('삭제 성공'); 
      navigate('/');
    } catch (error) {
      console.error('삭제 중 오류 발생: ', error);
      alert('삭제 실패');
    }
  };

  if (!questionDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="h- justify-center items-center"> 
        <div className="relative sm:-top-0 md:-top-0 lg:-top-10 flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8">
          <div className="flex items-center space-x-2"> 
            <img src={Comment} alt="icon" className="h-16 w-16 icon" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16 icon" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>

        <form className="relative top-0 sm:-top-0 md:-top-0 lg:-top-10 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-left font-bold text-black mb-4 border-b border-black pb-2">
            <div className="text-gray-600 mb-2">
              <span>작성자: {questionDetail.writer} </span>
              <span>작성일: {formatDate(questionDetail.createdDate)}</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-500">{questionDetail.questionType}</h2>
            <h1 className="text-4xl font-bold mb-14 text-black">{questionDetail.title}</h1>
            <p className="mb-4 text-black">{questionDetail.content}</p>
          </div>

          <div className="text-left mb-4 border-t border-gray-300 pb-2">
            {questionDetail.answer ? (
              <div className="p-4 mb-4 text-black">
                <h3 className="text-blue-500 mb-2">답변</h3>
                <p>{questionDetail.answer.content}</p>
              </div>
            ) : (
              <div className="p-4 mb-4 text-black">
                <h3 className="mb-2 text-red-500">답변</h3>
                <p>아직 답변이 등록되지 않았습니다.</p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex space-x-4">
              <Link to="/inquiry">
                <button className="bg-gray-200 text-black py-2 px-4 rounded shadow">수정</button>
              </Link>
              <button onClick={handleDelete} className="bg-gray-200 text-black py-2 px-4 rounded shadow">삭제</button>
            </div>
            <Link to="/boardlist">
              <button className="bg-[#17444F] text-white py-2 px-4 rounded shadow">목록</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
