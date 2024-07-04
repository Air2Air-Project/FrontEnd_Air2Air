import axios from 'axios';
import React, { useState } from 'react';

export default function FindId() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.125.121.224:8080/user/find/id', { phoneNumber });
      setUserId(response.data);
      setError('');
      // console.log("response:", response);
      // console.log("userId:",userId);
    } catch (error) {
      setUserId('');
      setError('사용자의 정보를 찾을 수 없습니다.');
      console.error("Error:", error);  // 오류 디버깅을 위해 추가
    }
  };

  return (
    <div className='bg-white bg-opacity-50 p-10 rounded-lg shadow-lg w-full max-w-2xl'>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="text-left px-4 py-2 text-white Haeparang">회원정보에 등록한 전화번호로 인증하기</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type='text'
                        value={phoneNumber}
                        onChange={handleChange}
                        className="whitespace-nowrap px-5 py-4 text-sm text-white bg-transparent placeholder-[#153c27] w-full"
                        placeholder='전화번호를 입력하세요.'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='flex justify-end items-center'>
                <button
                  type="submit"
                  className="text-[#153c27] hover:text-white border border-[#153c27] hover:bg-[#153c27] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                >
                  찾기
                </button>
              </div>
            </form>
            {userId && (
              <div className='mt-4 p-2 text-center bg-transparent text-green-700 border border-green-700 rounded font-bold'>
                사용자의 ID는 <span className='text-black'>{userId}</span> 입니다.
              </div>
            )}
            {error && (
              <div className='mt-4 p-2 text-center text-red-700 border border-red-700 bg-transparent rounded'>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
