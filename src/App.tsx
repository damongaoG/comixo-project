import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Home = React.lazy(() => import('./components/Home/Home'));
const Detail = React.lazy(() => import('./components/Detail/Detail'));
const List = React.lazy(() => import('./components/List/List'));
const BookUploadPage = React.lazy(() => import('./components/BookUploadPage/BookUploadPage'));

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Suspense fallback={<Preloader/>}>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/detail" element={<Detail/>}></Route>
          <Route path="/list" element={<List/>}></Route>
          <Route path="/book-upload" element={<BookUploadPage/>}></Route>
          <Route path="*" element={<Navigate to="/home" replace />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
