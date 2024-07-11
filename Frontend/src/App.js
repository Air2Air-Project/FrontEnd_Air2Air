import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main_Page from './Pages/Main_Page.js';
import Map_Page from './Pages/Map_Page.js';
import Login_Page from './Pages/Login_Page.js';
import Board_Page from './Pages/Board_Page.js';
import FindId_Page from './Pages/FindId_Page.js';
import FindPw_Page from './Pages/FindPw_Page.js';
import Register_Page from './Pages/Register_Page.js';
import BoardList_Page from './Pages/BoardList_Page.js'
import Inquiry_Page from './Pages/Inquiry_Page.js'; 
import QuestionDetail_Page from './Pages/QuestionDetail_Page.js';

// import { isLoggedInState } from './recoil/atoms';
// import { useRecoilValue } from 'recoil';


//로그인이 되어야 들어갈 수 있는 루트
// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = useRecoilValue(isLoggedInState);
//   return isLoggedIn ? children : <Login_Page />;
// };

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="/map" element={<Map_Page />} />
          {/* <Route path="/myPage" element={<PrivateRoute><My_Page /></PrivateRoute>} /> */}
          <Route path="/login" element={<Login_Page />} />
          <Route path="/board" element={<Board_Page />} />
          <Route path="/findId" element={<FindId_Page />} />
          <Route path="/findPw" element={<FindPw_Page />} />
          <Route path="/register" element={<Register_Page />} />
          <Route path="/boardlist" element={<BoardList_Page />} />
          <Route path="/inquiry" element={<Inquiry_Page />} />
          <Route path="/question/detail/:seq" element={<QuestionDetail_Page />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>

  );
}

export default App;
