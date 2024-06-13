import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { popupOpen } from "../redux/reducers/popup.reducer";
import { logIn } from "../redux/reducers/user.reducer";
import api from "../util/api/api";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef([]);
  const handleLogin = async () => {
    try {
      const formData = {
        id: formRef.current[0].value,
        password: formRef.current[1].value,
      };
      const loginError = {
        id: !formData.id.trim().length,
        password: !formData.password.trim().length,
      };
      if (loginError.id || loginError.password) {
        dispatch(
          popupOpen({
            message: "아이디와 비밀번호를 확인해주세요",
          })
        );
        return;
      }
      const response = await logInUser(formData);
      localStorage.setItem("accessToken", JSON.stringify(response.accessToken));

      dispatch(logIn(response));
      dispatch(popupOpen({ message: "로그인 성공되었습니다" }));

      navigate("/");
    } catch (error) {
      console.error(error);
      dispatch(popupOpen({ message: "로그인 실패되었습니다" }));
    }
  };

  const { mutateAsync: logInUser } = useMutation({
    mutationFn: (formData) => api.user.logInUser(formData),
  });
  return (
    <section className="c-container section">
      <h1 className="text-2xl font-bold">로그인</h1>
      <h1>아이디</h1>
      <input
        type="text"
        placeholder="아이디"
        ref={(el) => (formRef.current[0] = el)}
      />
      <h1>비밀번호</h1>
      <input
        type="password"
        placeholder="비밀번호"
        ref={(el) => (formRef.current[1] = el)}
      />

      <button className="bgcolor-grey" onClick={handleLogin}>
        로그인
      </button>
      <button className="bgcolor-darkgrey" onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </section>
  );
}

export default LoginPage;
