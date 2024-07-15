import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';

export default function Answer() {
  const { seq } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const user = useRecoilValue(userState); // Recoil 상태에서 사용자 정보 가져옴
  const token = localStorage.getItem('ACCESS_TOKEN');

  // Recoil 상태에서 가져온 사용자 정보 확인
  useEffect(() => {
    console.log('Recoil user state:', user);
  }, [user]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  // 질문 상세 정보를 가져오는 함수
  const fetchQuestionDetail = async () => {
    try {
      const response = await axios.get(`http://10.125.121.224:8080/board/detail/${seq}`);
      const data = response.data;
      console.log('응답 데이터:', data); // 전체 응답 데이터를 확인
      if (!data.member || !data.member.memberId) {
        data.member = { memberId: null }; // member 속성이 없거나 memberId가 없을 경우 기본값 설정
      }
      setQuestionDetail(data);
      console.log('questionDetail.member.memberId:', data.member.memberId); // 값 확인
    } catch (error) {
      console.error('질문 상세 정보를 불러오는데 오류 발생: ', error);
    }
  };

  useEffect(() => {
    if (!isDeleted) {
      fetchQuestionDetail();
    }
  }, [seq, isDeleted]);

  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon) => {
      icon.classList.add('animate-scale-up');
    });
  }, []);

  

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://10.125.121.224:8080/answer/register`,
      {
        questionBoard: {
          seq: seq
        },
        member: {
          memberId: user.memberId
        },
        content: answer
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('답변 등록 응답:', response);
    alert('답변 등록 성공');
    navigate(`/boardlist`);
  } catch (error) {
    console.error('답변 등록 중 오류 발생: ', error);
    alert('답변 등록 실패');
  }
};

  if (!questionDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className=" justify-center items-center">
        <div className="relative sm:-top-0 md:-top-0 lg:-top-16 flex flex-col items-center bg-[#1d5666] text-white p-10 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <img src={Comment} alt="icon" className="h-[75px] w-[75px] icon" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16 icon" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>

        <form onSubmit={handleSubmit} className="relative top-0 sm:-top-0 md:-top-0 lg:-top-16 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
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
                <textarea
                  id="answer"
                  name="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 border rounded text-black custom-textarea resize-none"
                  rows="5"
                ></textarea>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex space-x-4">
                {/* {/* <button type="submit" className="bg-gray-200 text-black py-2 px-4 rounded shadow">수정</button> */}
                <button type="submit" className="bg-gray-200 text-black py-2 px-4 rounded shadow">답변등록</button> 
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
