import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';

export default function AnswerModify() {
  const { seq } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const token = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    // 유저가 없을 경우 로그인 페이지로 리디렉션
    if (!user) {
      alert('권한이 없습니다.');
      navigate('/login'); // 로그인 페이지로 리디렉션
      return;
    }
    fetchQuestionDetail();
  }, [seq, user, navigate]);

  const fetchQuestionDetail = async () => {
    try {
      const response = await axios.get(`http://10.125.121.224:8080/board/detail/${seq}`);
      const data = response.data;
      console.log('응답 데이터:', data);
      setQuestionDetail(data);
      if (data.answer) {
        setAnswerContent(data.answer.content);
      }
    } catch (error) {
      console.error('질문 상세 정보를 불러오는데 오류 발생: ', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://10.125.121.224:8080/answer/modify/update`,
        {
          seq: questionDetail.answer.seq,
          content: answerContent,
          member: {
            memberId: user.memberId
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('답변 수정 응답:', response);
      alert('답변 수정 성공');
      navigate(`/question/detail/${seq}`);
    } catch (error) {
      console.error('답변 수정 중 오류 발생: ', error);
      alert('답변 수정 실패');
    }
  };

  if (!questionDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="justify-center items-center">
      <div className="relative sm:-top-0 md:-top-0 lg:-top-0 flex flex-col items-center bg-[#9DC3E6] text-white p-10 rounded-lg mb-8">
        <div className="flex items-center space-x-2">
          <img src={Comment} alt="icon" className="h-[75px] w-[75px] icon" />
          <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
          <img src={Consultant} alt="icon" className="h-16 w-16 icon" />
        </div>
        <p className="mt-2 text-lg">1:1 문의</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-20 relative top-0 sm:-top-0 md:-top-0 lg:-top-0 mx-auto bg-white p-8 rounded-lg shadow-md">
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
          <div className="p-4 mb-4 text-black">
            <h3 className="text-blue-500 mb-2">답변 수정</h3>
            <textarea
              id="answer"
              name="answer"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              className="w-full p-2 border rounded text-black custom-textarea resize-none"
              rows="5"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button type="submit" className="bg-gray-200 text-black py-2 px-4 rounded shadow">저장</button>
          <button onClick={() => navigate(`/question/detail/${seq}`)} className="bg-gray-200 text-black py-2 px-4 rounded shadow">취소</button>
        </div>
      </form>
    </div>
  );
}
