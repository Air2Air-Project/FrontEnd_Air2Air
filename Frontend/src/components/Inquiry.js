import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Inquiry() {
  const [formData, setFormData] = useState({
    questionType: '',
    title: '',
    content: '',
    member: {
      memberId: '1'
    }
  });
  const navigate = useNavigate();

  // form 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // form 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 문의유형이 선택되지 않았을 경우 알림 표시
    if (formData.questionType === '') {
      alert('문의유형을 선택해 주세요!');
      return;
    }

    try {
      // 서버로 form 데이터 전송
      console.log(formData);
      await axios.post('http://10.125.121.224:8080/question/register', formData);

      // 성공 시 목록 페이지로 리디렉션
      navigate('/boardlist');
    } catch (error) {
      console.error('문의 내용을 저장하는데 오류 발생: ', error);
      console.log('오류 데이터:', formData);
    }
  };

  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.classList.add('animate-scale-up');
    });
  }, []);

  return (
    <>
      <div className="h- justify-center items-center">
        <div className="relative -top-14 flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8">
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
            value={formData.questionType}
            onChange={handleChange}
          >
            <option value="" disabled>문의 유형을 선택해 주세요.</option>
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
              value={formData.title}
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
              value={formData.content}
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
              문의하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
