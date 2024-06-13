import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { popupOpen } from "../redux/reducers/popup.reducer";
import api from "../util/api/api";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef([]);
  const handleSignup = () => {
    const formData = {
      id: formRef.current[0].value,
      password: formRef.current[1].value,
      nickname: formRef.current[2].value,
    };
    const signupError = {
      id: formData.id.trim().length < 4 || formData.id.trim().length > 10,
      password:
        formData.password.trim().length < 4 ||
        formData.password.trim().length > 15,
      nickname:
        formData.nickname.trim().length < 1 ||
        formData.nickname.trim().length > 10,
    };

    if (signupError.id || signupError.password || signupError.nickname) {
      dispatch(
        popupOpen({
          message: "아이디,비밀번호,닉네임을 확인해주세요",
        })
      );
      return;
    }
    mutate(formData);
  };
  const { isPending, mutate } = useMutation({
    mutationFn: (variables) => api.user.addUser(variables),
    onSuccess: () =>
      dispatch(
        popupOpen({
          message: "회원가입에 성공하였습니다",
        })
      ),
    onError: (error) => {
      if (error.response && error.response.status == 409) {
        dispatch(
          popupOpen({
            message: "이미 있는 아이디입니다",
          })
        );
        return;
      }
      dispatch(
        popupOpen({
          message: "회원가입에 실패하였습니다",
        })
      );
    },
  });

  return (
    <section className="c-container section">
      <h1>회원가입</h1>
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
      <h1>닉네임</h1>
      <input
        type="text"
        placeholder="닉네임"
        ref={(el) => (formRef.current[2] = el)}
      />
      <button
        className="bgcolor-grey"
        onClick={handleSignup}
        disabled={isPending}
      >
        회원가입
      </button>
      <button className="bgcolor-darkgrey" onClick={() => navigate("/login")}>
        로그인
      </button>
    </section>
  );
}

export default SignupPage;
