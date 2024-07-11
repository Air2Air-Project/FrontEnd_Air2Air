import React, { useState } from 'react';
import axios from 'axios';
import Consultant from '../img/operator.png';
import Comment from '../img/speech-bubble.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Inquiry() {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
    memberId: '1'
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
    try {
      // 서버로 form 데이터 전송
      console.log(formData)
      await axios.post('http://10.125.121.224:8080/question/register', formData);

      // 성공 시 목록 페이지로 리디렉션
      navigate('/boardlist');
    } catch (error) {
      console.error('문의 내용을 저장하는데 오류 발생: ', error);
      console.log('오류 데이터:', formData);
    }
  };

  return (
    <>
      <div className="h- justify-center items-center"> 
        <div className="relative flex flex-col items-center bg-[#17444F] text-white p-10 rounded-lg mb-8">
          <div className="flex items-center space-x-2"> 
            <img src={Comment} alt="icon" className="h-16 w-16" />
            <h1 className="text-5xl font-bold">무엇을 도와드릴까요?</h1>
            <img src={Consultant} alt="icon" className="h-16 w-16" />
          </div>
          <p className="mt-2 text-lg">1:1 문의</p>
        </div>
        <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-black text-2xl font-bold mb-4">문의유형 <span className="text-red-500">*</span></h2>
          <select
            name="type"
            className="w-full p-2 border rounded text-black custom-select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="" disabled>문의 유형을 선택해 주세요.</option>
            <option value="관측소">관측소</option>
            <option value="미세먼지">미세먼지</option>
            <option value="알람">알람</option>
            <option value="기타">기타</option>
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
