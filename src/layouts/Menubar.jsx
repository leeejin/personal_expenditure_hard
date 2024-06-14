import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { popupOpen } from "../redux/reducers/popup.reducer";
import { logIn, logOut } from "../redux/reducers/user.reducer";
import DefaultImage from "../styles/images/default-profile.jpg";
import api from "../util/api/api";

function Menubar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logOut());
    dispatch(popupOpen({ message: "로그아웃 되었습니다" }));
    navigate("/");
  };
  const handleNavigate = async () => {
    const response = await api.user.getUser();
    if (response != null) navigate(`/mypage/${currentUser.id}`);
    else dispatch(logOut());
  };
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const getUserAPI = async () => {
      const response = await api.user.getUser();
      dispatch(
        logIn({
          userId: response.id,
          nickname: response.nickname,
          avatar: response.avatar,
        })
      );
    };
    if (accessToken) getUserAPI();
  }, [dispatch]);

  return (
    <div className="flex justify-around items-center gap-2 bg-black-color w-full h-20 text-white-color p-4">
      <button className="color-transparent" onClick={() => navigate("/")}>
        HOME
      </button>
      {currentUser.id && (
        <button className="bgcolor-transparent" onClick={handleNavigate}>
          내 프로필
        </button>
      )}
      <div style={{ flex: 1 }} />
      {currentUser.id ? (
        <>
          <img
            className="w-12 rounded-3xl"
            src={currentUser.avatar ?? DefaultImage}
          />
          <span>{currentUser.nickname}</span>
          <button className="bgcolor-red" onClick={handleLogOut}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button className="bgcolor-red" onClick={() => navigate("/login")}>
            로그인
          </button>
        </>
      )}
    </div>
  );
}

export default Menubar;
