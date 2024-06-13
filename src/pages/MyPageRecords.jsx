import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { popupOpen } from "../redux/reducers/popup.reducer";
import api from "../util/api/api";

function MyPageRecords() {
  const dispatch = useDispatch();
  const { data: user = {} } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.user.getUser(),
  });
  const formRef = useRef([]);

  const handleModifyProfile = async () => {
    const newNickname = formRef.current[0].value;
    const newAvatar = formRef.current[1].files[0];
    const formData = new FormData();
    formData.append("nickname", newNickname);
    formData.append("avatar", newAvatar);

    if (user.nickname == newNickname && !newAvatar) {
      dispatch(popupOpen({ message: "프로필을 변경해주세요" }));
      return;
    } else if (
      newNickname.trim().length < 1 ||
      newNickname.trim().length > 10
    ) {
      dispatch(popupOpen({ message: "닉네임은 1~10글자 내입니다" }));
      return;
    }
    const response = await modifyUser(formData);
    dispatch(popupOpen({ message: response.message }));
  };

  const { mutateAsync: modifyUser } = useMutation({
    mutationFn: (variables) => api.user.modifyUser(variables),
  });
  return (
    <section className="c-container section">
      <h1>프로필 수정</h1>
      <h1>닉네임</h1>
      <input
        type="text"
        defaultValue={user.nickname}
        ref={(el) => (formRef.current[0] = el)}
      />
      <h1>아바타 이미지</h1>
      <input
        type="file"
        accept="image/*"
        ref={(el) => (formRef.current[1] = el)}
      />
      <button className="bgcolor-blue" onClick={handleModifyProfile}>
        프로필 업데이트
      </button>
    </section>
  );
}

export default MyPageRecords;
