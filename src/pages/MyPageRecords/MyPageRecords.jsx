import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { popupOpen } from "../../redux/reducers/popup.reducer";
import { modifyProfile } from "../../redux/reducers/user.reducer";
import api from "../../util/api/api";

function MyPageRecords() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const initialUser = useLoaderData();

  const { data: user = initialUser } = useQuery({
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
    if (newNickname.trim().length < 1 || newNickname.trim().length > 10) {
      dispatch(popupOpen({ message: "닉네임은 1~10글자 내입니다" }));
      return;
    }
    await modifyUser(formData);
  };

  const { mutateAsync: modifyUser } = useMutation({
    mutationFn: (variables) => api.user.modifyUser(variables),
    onSuccess: (data) => {
      dispatch(popupOpen({ message: data.message }));
      dispatch(modifyProfile(data));
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      dispatch(popupOpen({ message: "프로필 업데이트에 실패했습니다" }));
    },
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
