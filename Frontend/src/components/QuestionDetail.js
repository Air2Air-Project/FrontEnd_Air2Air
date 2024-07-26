import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';

export default function QuestionDetail() {
  const { seq } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
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
      const response = await axios.get(`http://localhost:8080/board/detail/${seq}`);
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

  const handleQuestionDelete =  () => {
    try {
      const response = axios.delete('http://localhost:8080/question/delete', {
        params: {
          questionId: seq,
          memberId: user ? user.memberId : null,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('삭제 요청 응답:', response);
      alert('삭제 성공');
      setIsDeleted(true);
      navigate('/boardlist');
    } catch (error) {
      console.log('삭제 중 오류 발생: ', error);
      // console.log('삭제 실패', error)
      alert('삭제 실패');
    }
  };

  const handleAnswerDelete = () => {
    try {
      const response = axios.delete('http://localhost:8080/answer/delete', {
        params: {
          answerId: questionDetail.answer.seq,
          memberId: user.memberId,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('삭제 요청 응답:', response);
      alert('삭제 성공');
      setIsDeleted(true);
      navigate('/boardlist');
    } catch (error) {
      console.error('삭제 중 오류 발생: ', error);
      alert('삭제 실패');
    }
  } 

  if (!questionDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="h- justify-center items-center">
        <div className="relative sm:-top-0 md:-top-0 lg:-top-0 flex flex-col items-center bg-[#9DC3E6] text-white p-10 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <img src={Comment} alt="icon" className="h-[75px] w-[75px] animate-scale-up" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16 animate-scale-up" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>

        <form className="relative top-0 sm:-top-0 md:-top-0 lg:-top-0 mb-20 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
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
              {questionDetail.member && user && user.memberId === questionDetail.member.memberId && (
                <>
                  <Link to={`/modify/${seq}`} state={questionDetail}>
                    <button className="bg-gray-200 text-black py-2 px-4 rounded shadow">수정</button>
                  </Link>
                  <button onClick={handleQuestionDelete} className="bg-gray-200 text-black py-2 px-4 rounded shadow">삭제</button>
                </>
              )}

              {questionDetail.answer ? (
                user && user.role === 'ROLE_ADMIN' && (
                <>
                  <Link to={`/answer/modify/${seq}`}>
                    <button  className="bg-gray-200 text-black py-2 px-4 rounded shadow">수정</button>
                  </Link>
                  <button onClick={handleAnswerDelete} className="bg-red-300 text-black py-2 px-4 rounded shadow">답변 삭제</button>
                  <button onClick={handleQuestionDelete} className="bg-red-400 text-black py-2 px-4 rounded shadow">질문 삭제</button>
                </>
                )
              ) : (
                user && user.role === 'ROLE_ADMIN' && (
                  <>                  <Link to={`/answer/${seq}`}>
                    <button className="bg-gray-200 text-black py-2 px-4 rounded shadow">답변 등록</button>
                  </Link>
                  <button onClick={handleQuestionDelete} className="bg-red-400 text-black py-2 px-4 rounded shadow">삭제</button>
                  </>
                )
              )}
            </div>
            <Link to="/boardlist">
              <button className="bg-[#6a9af3] text-white py-2 px-4 rounded shadow">목록</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
