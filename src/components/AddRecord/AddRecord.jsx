import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { popupOpen } from "../../redux/reducers/popup.reducer";
import api from "../../util/api/api";
import { isDateValid } from "../../util/date";

function AddRecord() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = useRef("");
  const item = useRef("");
  const amount = useRef(0);
  const description = useRef("");
  const userInfo = useSelector((state) => state.user.id);

  const handleSubmit = () => {
    if (!userInfo) {
      dispatch(popupOpen({ message: "로그인이 필요한 서비스입니다" }));
      navigate("/login");

      return;
    }
    const formData = {
      id: uuidv4(),
      date: date.current.value.trim(),
      item: item.current.value.trim(),
      amount:
        parseInt(amount.current.value.trim()) ||
        (!amount.current.value.trim() && 0),
      description: description.current.value.trim(),
      createdBy: userInfo,
      month: parseInt(date.current.value.slice(5, 7)),
    };

    const error = {
      date: !isDateValid(formData.date),
      item: !formData.item.trim(),
      amount: formData.amount <= 0,
      description: !formData.description.trim(),
      createdBy: formData.createdBy == undefined,
    };
    let message = "";
    if (error.date || error.item || error.amount || error.description) {
      if (error.date) message = "날짜형식이 잘못되었습니다";
      else if (error.item) message = "항목을 입력해주세요";
      else if (error.amount) message = "금액은 양수로 입력해주세요";
      else if (error.description) message = "내용을 입력해주세요";
      else if (error.createdBy) message = "로그인이 필요한 서비스입니다";
      dispatch(popupOpen({ message }));
      return;
    }
    mutate(formData);
  };
  const { isPending, mutate } = useMutation({
    mutationFn: (variables) => api.records.addRecord(variables),
    onError: () => {
      dispatch(
        popupOpen({
          message: "데이터를 보내는데 실패했습니다",
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["records"]);
      navigate(0);
      dispatch(
        popupOpen({
          message: "데이터를 보내는데 성공했습니다",
        })
      );
    },
  });

  return (
    <div className="r-container items-end text-left">
      <div className="c-container">
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          ref={date}
          placeholder="YYYY-MM-DD"
          defaultValue="2024-01-01"
          required
        />
      </div>
      <div className="c-container">
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          ref={item}
          placeholder="지출 항목"
          required
        />
      </div>
      <div className="c-container">
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          ref={amount}
          placeholder="지출 금액"
          required
        />
      </div>
      <div className="c-container">
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          ref={description}
          placeholder="지출 내용"
          required
        />
      </div>

      <button
        className="bgcolor-blue"
        disabled={isPending}
        onClick={handleSubmit}
      >
        저장
      </button>
    </div>
  );
}
export default React.memo(AddRecord);
