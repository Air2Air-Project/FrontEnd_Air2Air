import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';

export default function Modify() {
  const { seq } = useParams();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};
  const token = localStorage.getItem('ACCESS_TOKEN');

  const [questionData, setQuestionData] = useState({
    seq: seq,
    title: initialData.title || '',
    content: initialData.content || '',
    questionType: '', // 초기값을 빈 문자열로 설정
    member: {
      memberId: user.memberId
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const response = await axios.get(`http://10.125.121.224:8080/board/detail/${seq}`);
        const { title, content, questionType } = response.data;
        setQuestionData({
          seq: seq,
          title: title,
          content: content,
          questionType: questionType || '',
          member: {
            memberId: user.memberId
          }
        });
      } catch (error) {
        console.error('질문 상세 정보를 불러오는데 오류 발생: ', error);
        alert('질문 상세 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionDetail();
  }, [seq, user.memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        seq: questionData.seq,
        title: questionData.title,
        content: questionData.content,
        questionType: questionData.questionType,
        member: {
          memberId: user.memberId
        }
      };
      console.log('전송할 데이터:', JSON.stringify(dataToSend, null, 2));

      const response = await axios.put(
        `http://10.125.121.224:8080/question/modify/update`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('수정 성공');
        navigate('/boardlist');
      } else {
        alert('수정 실패');
        console.log('수정실패:' + response.status);
      }
    } catch (error) {
      console.error('수정 중 오류 발생: ', error);
      console.log('수정 실패: ' + (error.response?.data || error.message));
      alert('문의유형을 선택해주세요!');
    }
  };


  return (
    <div className="h- justify-center items-center">
      <div className="relative -top-14 flex flex-col items-center bg-[#1d5666] text-white p-10 rounded-lg mb-8">
        <div className="flex items-center space-x-2">
          <img src={Comment} alt="icon" className="h-16 w-16 icon" />
          <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
          <img src={Consultant} alt="icon" className="h-16 w-16 icon" />
        </div>
        <p className="mt-2 text-lg">1:1 문의</p>
      </div>
      <form className="relative -top-14 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-black text-2xl font-bold mb-4">문의유형 <span className="text-red-500">*</span></h2>
        <select
          name="questionType"
          className="w-full p-2 border rounded text-black custom-select"
          value={questionData.questionType}
          onChange={handleChange}
        >
          <option value=""  >
            문의 유형을 선택해 주세요.
          </option>
          <option value="STATION">관측소</option>
          <option value="DUST">미세먼지</option>
          <option value="ALERT">알람</option>
          <option value="ETC">기타</option>
        </select>
        <div className="mt-6">
          <label className="block text-black text-lg mb-2" htmlFor="title">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border rounded text-black custom-input"
            placeholder="제목을 입력해 주세요."
            value={questionData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-black text-lg mb-2" htmlFor="content">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            className="w-full p-2 border rounded text-black custom-textarea resize-none"
            rows="10"
            placeholder="내용을 입력해 주세요."
            style={{ overflowY: 'scroll' }}
            value={questionData.content}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Link to="/boardlist">
            <button type="button" className="bg-gray-200 text-black py-2 px-4 rounded shadow">
              목록보기
            </button>
          </Link>
          <button type="submit" className="bg-[#17444F] text-white py-2 px-4 rounded shadow">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
