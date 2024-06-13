import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailRecords from "../pages/DetailRecord/DetailRecord";
import DetailRecordLoader from "../pages/DetailRecord/DetailRecord.loader";
import HomeRecords from "../pages/HomeRecord";
import HomeRecordLoader from "../pages/HomeRecord/HomeRecord.loader";
import LoginPage from "../pages/LoginPage";
import MyPageRecords from "../pages/MyPageRecords";
import MyPageRecordsLoader from "../pages/MyPageRecords/MyPageRecords.loader";
import SignupPage from "../pages/SignupPage";
import UnKnownPage from "../pages/UnKnownPage";
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomeRecords />,
        loader: HomeRecordLoader,
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
        loader: DetailRecordLoader,
      },
      {
        path: "/mypage/:userId",
        element: <MyPageRecords />,
        loader: MyPageRecordsLoader,
      },
      {
        path: "*",
        element: <UnKnownPage />,
      },
    ],
  },
]);
export default router;
