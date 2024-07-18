import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState, userLocationState, isLoggedInState } from '../recoil/atoms';

export default function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [userLocation, setUserLocation] = useRecoilState(userLocationState);
  const setIsLoggedIn = useRecoilState(isLoggedInState)[1];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const memberId = localStorage.getItem('memberId');
      if (!token) {
        navigate('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
        return;
      }

      try {
        const response = await axios.get(`http://10.125.121.224:8080/user/profile/${memberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        // setUserLocation(response.data.regionId);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/login'); // 실패하면 로그인 페이지로 리디렉션
      }
    };

    fetchUserData();
  }, [navigate, setUser, setUserLocation, setIsLoggedIn]);

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const memberId = localStorage.getItem('memberId');
      try {
        await axios.delete(`http://10.125.121.224:8080/user/profile/${memberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.clear();
        setUser(null);
        setIsLoggedIn(false);
        alert('그동안 이용해주셔서 감사합니다.');
        navigate('/');
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('회원 정보 삭제에 실패했습니다.');
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-white bg-opacity-80 p-10 rounded-2xl shadow-lg w-full max-w-2xl mt-8 flow-root'>
            <table className="min-w-full divide-y divide-blue-700">
              <tbody className="divide-y divide-blue-400">
                <tr>
                  <th className="text-left px-4 py-2 text-blue-500 font-bold text-lg">이름</th>
                  <td className="whitespace-nowrap px-3 py-4 text-lg text-blue-400">
                    {user.username}
                  </td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 text-blue-500 text-lg">이메일</th>
                  <td className="whitespace-nowrap px-3 py-4 text-lg text-blue-400">{user.email}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 text-blue-500 text-lg">전화번호</th>
                  <td className="whitespace-nowrap px-3 py-4 text-lg text-blue-400">{user.phoneNumber}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 text-blue-500 text-lg">관측소 주소</th>
                  <td className="whitespace-nowrap px-3 py-4 text-lg text-blue-400">
                    {user.region && `${user.region.large} ${user.region.middle} ${user.region.small}`}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-end items-center pt-16'>
              <Link to="/mypageEdit" className="text-blue-400 hover:text-white border border-blue-500 hover:bg-blue-200 focus:ring-4 focus:outline-none  rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
                수정하기
              </Link>
              <button
                onClick={handleDeleteProfile}
                className="text-blue-400 hover:text-white border border-blue-500 hover:bg-blue-200 focus:ring-4 focus:outline-none  rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
              >
                탈퇴하기
              </button>
          </div>
        </div>


  );
}
