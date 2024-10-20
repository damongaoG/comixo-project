import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";

const Home = React.lazy(() => import('./components/Home/Home'));
const Detail = React.lazy(() => import('./components/Detail/Detail'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Preloader/>}>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/detail" element={<Detail/>}></Route>
          <Route path="*" element={<Navigate to="/home" replace />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
