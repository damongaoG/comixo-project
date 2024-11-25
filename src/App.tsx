import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { AuthProvider } from './AuthContext';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Detail = React.lazy(() => import('./pages/Detail/Detail'));
const List = React.lazy(() => import('./pages/List/List'));
const BookUploadPage = React.lazy(() => import('./components/BookUploadPage/BookUploadPage'));
const Email = React.lazy(() => import('./pages/Email/Email'));
const Payment = React.lazy(() => import('./pages/Payment/Payment'));
const UserProfile = React.lazy(() => import('./pages/UserProfile/UserProfile'));
const ForgetPassword = React.lazy(() => import('./pages/ForgetPassword/ForgetPassword'));
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
            <Route path="/list" element={<List />}></Route>
            <Route path="/book-upload" element={<BookUploadPage />}></Route>
            <Route path="/email" element={<Email />}></Route>
            <Route path="/forget-password" element={<ForgetPassword />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
            <Route path="*" element={<Navigate to="/home" replace />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
