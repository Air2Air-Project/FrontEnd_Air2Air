import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 p-5 rounded-lg w-96 text-center transform">

        <h2 className="text-lg font-semibold">자동 로그아웃 안내</h2>

        <br />
        <p>
          로그인 후 1시간이 경과되어
          <br />
          자동 로그아웃 되었습니다.
        </p>

        <br />
        <button
          className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            onClose(false);
            navigate('/login');
          }}
        >
          다시 로그인 하기
        </button>

      </div>
    </div>
  );
};

export default LogoutModal;
