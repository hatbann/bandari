import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';
import SellPage from './SellPage';
import MyPage from './MyPage';
import ChatPage from './ChatPage';
import ErrorPage from './ErrorPage';
import SellForm from './SellForm';
import PetProfile from './PetProfile';
import EditPetInfo from './EditPetInfo';
import SalesDetail from './SalesDetail';
import ViewKakao from './ViewKakao';
import ViewKakaoLogout from './ViewKakaoLogout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sellForm" element={<SellForm />} />
        <Route path="/sellPage" element={<SellPage />} />
        <Route path="/SalesDetail" element={<SalesDetail />} />
        <Route path="/petProfile" element={<PetProfile />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/chatPage" element={<ChatPage />} />
        <Route path="/editPetInfoPage" element={<EditPetInfo />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/kakao/login" element={<ViewKakao />} />
        <Route path="/kakao/logout" element={<ViewKakaoLogout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
