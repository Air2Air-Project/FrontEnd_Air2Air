import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full">
        <div className="px-4 py-2 bg-gray-200 border-b">
          <h2 className="text-lg font-semibold">자동 로그아웃 안내</h2>
        </div>
        <div className="p-4 text-center">
          {/* <img
            className="mx-auto mb-4"
            src="/path/to/logoutAlert.png" // 실제 이미지 경로로 수정
            alt="로그아웃 안내"
          /> */}
          <p>
            로그인 후 1시간이 경과되어
            <br />
            자동 로그아웃 되었습니다.
          </p>
        </div>
        <div className="px-4 py-2 bg-gray-200 border-t text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              onClose();
              navigate('/login');
            }}
          >
            다시 로그인 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
