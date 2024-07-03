import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import WebSocketProvider from './components/WebSocketProvider';
import Main_Page from './Pages/Main_Page.js';
import Map_Page from './Pages/Map_Page.js';
import Login_Page from './Pages/Login_Page.js';
import Board_Page from './Pages/Board_Page.js';

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
      <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="/map" element={<Map_Page />} />
          {/* <Route path="/myPage" element={<PrivateRoute><My_Page /></PrivateRoute>} /> */}
          <Route path="/login" element={<Login_Page />} />
          <Route path="/board" element={<Board_Page />} />
        </Routes>
      </BrowserRouter>
      </WebSocketProvider>
    </RecoilRoot>

  );
}

export default App;
