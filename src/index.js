import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Apply from './Apply';
import Alliance from './Alliance';


// 리다이렉트를 처리할 컴포넌트
function RedirectToHome() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null; // 아무것도 렌더링하지 않음
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/apply",
    element: <Apply />,
  },
  {
    path: "/alliance",
    element: <Alliance />,
  },
  {
    path: "*", // 모든 기타 경로
    element: <RedirectToHome />, // 리다이렉트 컴포넌트 사용
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/*<App />*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
