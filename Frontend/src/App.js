import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main_Page from './Pages/Main_Page.js';
import Map_Page from './Pages/Map_Page.js';
import Login_Page from './Pages/Login_Page.js';
import Board_Page from './Pages/Board_Page.js';
import FindId_Page from './Pages/FindId_Page.js';
import FindPw_Page from './Pages/FindPw_Page.js';
import Register_Page from './Pages/Register_Page.js';
import BoardList_Page from './Pages/BoardList_Page.js';
import Inquiry_Page from './Pages/Inquiry_Page.js'; 
import Real_Page from './Pages/Real_Page.js';
import QuestionDetail_Page from './Pages/QuestionDetail_Page.js';
import Forecast_Page from './Pages/Forecast_Page.js';
import Alert_Page from './Pages/Alert_Page.js';
import QuestionModify_Page from './Pages/QuestionModify_Page.js';
import Myinfo_Page from './Pages/Myinfo_Page.js';
import MyinfoEdit_Page from './Pages/MyinfoEdit_Page.js';
import Answer_Page from './Pages/Answer_Page.js';
import AnswerModify_Page from './Pages/AnswerModify_Page.js';
import ResetPw_Page from './Pages/ResetPw_Page.js';
import useAutoLogout from './hooks/useAutoLogout.js';// useAutoLogout 훅 가져오기
import LogoutModal from './components/LogoutModal';

function AppContent() {
  // useAutoLogout(); // 자동 로그아웃 훅 호출
  const [isModalOpen, setIsModalOpen] = useState(false);
  useAutoLogout(setIsModalOpen);

  return (
    <>
      {isModalOpen && <LogoutModal isOpen={isModalOpen} onClose={setIsModalOpen} />}
    <Routes>
      <Route path="/" element={<Main_Page />} />
      <Route path="/map" element={<Map_Page />} />
      <Route path="/login" element={<Login_Page />} />
      <Route path="/board" element={<Board_Page />} />
      <Route path="/findId" element={<FindId_Page />} />
      <Route path="/findPw" element={<FindPw_Page />} />
      <Route path="/register" element={<Register_Page />} />
      <Route path="/boardlist" element={<BoardList_Page />} />
      <Route path="/inquiry" element={<Inquiry_Page />} />
      <Route path="/real" element={<Real_Page />} />
      <Route path="/forecast" element={<Forecast_Page />} />
      <Route path="/alert" element={<Alert_Page />} />
      <Route path="/question/detail/:seq" element={<QuestionDetail_Page />} />
      <Route path="/modify/:seq" element={<QuestionModify_Page />} />
      <Route path="/answer/:seq" element={<Answer_Page />} />
      <Route path="/answer/modify/:seq" element={<AnswerModify_Page />} />  
      <Route path="/mypage" element={<Myinfo_Page />} />
      <Route path="/mypageEdit" element={<MyinfoEdit_Page />} />
      <Route path="/resetPw" element={<ResetPw_Page />} />
    </Routes>
    </>
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
