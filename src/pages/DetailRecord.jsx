import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { modalClose, modalOpen } from "../redux/reducers/modal.reducer";
import { popupOpen } from "../redux/reducers/popup.reducer";
import api from "../util/api/api";
import { isDateValid } from "../util/date";

const DEL_MESSAGE = "삭제하시겠습니까 ?";
const MODI_MESSAGE = "수정하시겠습니까 ?";

function DetailRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { recordsId } = useParams();
  const date = useRef("");
  const item = useRef("");
  const amount = useRef(0);
  const description = useRef("");
  const modal = useSelector((state) => state.modal);
  const userInfo = useSelector((state) => state.user.id);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const {
    data: records = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["record", recordsId],
    queryFn: async () => {
      if (accessToken) {
        const response = await api.records.getRecord(recordsId);
        return response;
      }
      return navigate(-1);
    },
  });
  const { mutateAsync: handleDeleteRecord } = useMutation({
    mutationFn: (variables) => api.records.deleteRecord(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["records"]);
      navigate("/");
    },
  });
  const { mutateAsync: handleModifyRecord } = useMutation({
    mutationFn: (variables) => api.records.modifyRecord(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["records"]);
      navigate("/");
    },
  });

  /** 수정함수 */
  const handleModify = () => {
    const formData = {
      id: recordsId,
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
    };
    let message = "";
    if (error.date || error.item || error.amount || error.description) {
      if (error.date) message = "날짜형식이 잘못되었습니다";
      else if (error.item) message = "항목을 입력해주세요";
      else if (error.amount) message = "금액은 양수로 입력해주세요";
      else if (error.description) message = "내용을 입력해주세요";

      dispatch(popupOpen({ message }));
      return;
    }

    handleModifyRecord(formData);
  };
  /** 삭제함수 */
  const handleDelete = () => {
    handleDeleteRecord(recordsId);
  };
  /** 뒤로가기함수 */
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleConfirm = () => {
    if (modal.message == MODI_MESSAGE) {
      handleModify();
    } else if (modal.message == DEL_MESSAGE) {
      handleDelete();
    }
    dispatch(modalClose());
  };
  const handleModal = useCallback(
    (type) => {
      dispatch(modalOpen({ message: type }));
    },
    [dispatch]
  );
  if (isLoading) return <div className="section">로딩중입니다</div>;
  if (error)
    return <div className="section">데이터 불러오는데 실패했습니다</div>;
  return (
    <section className="section">
      {modal.isVisible && <Modal handleConfirm={handleConfirm} />}
      <div className="c-container text-left">
        <div className="c-container text-left">
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            ref={date}
            placeholder="YYYY-MM-DD"
            defaultValue={records.date}
          />
        </div>
        <div className="c-container text-left">
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            ref={item}
            placeholder="지출 항목"
            defaultValue={records.item}
          />
        </div>
        <div className="c-container text-left">
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            ref={amount}
            placeholder="지출 금액"
            defaultValue={records.amount}
          />
        </div>
        <div className="c-container text-left">
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            ref={description}
            placeholder="지출 내용"
            defaultValue={records.description}
          />
        </div>
        <div className="r-container text-left">
          <button
            className="bgcolor-blue"
            onClick={() => handleModal(MODI_MESSAGE)}
          >
            수정
          </button>
          <button
            className="bgcolor-red"
            onClick={() => handleModal(DEL_MESSAGE)}
          >
            삭제
          </button>
          <button className="bgcolor-grey" onClick={handleBack}>
            뒤로가기
          </button>
        </div>
      </div>
    </section>
  );
}

export default DetailRecord;
