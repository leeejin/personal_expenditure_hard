import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailRecords from "../pages/DetailRecord";
import HomeRecords from "../pages/HomeRecords";
import LoginPage from "../pages/LoginPage";
import MyPageRecords from "../pages/MyPageRecords";
import SignupPage from "../pages/SignupPage";
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomeRecords />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/records/:recordsId",
        element: <DetailRecords />,
      },
      {
        path: "/mypage/:userId",
        element: <MyPageRecords />,
      },
    ],
  },
]);
export default router;
