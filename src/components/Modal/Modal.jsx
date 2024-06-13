import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../../redux/reducers/modal.reducer";

function Modal({ handleConfirm }) {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black-color bg-opacity-50 flex justify-center items-center">
      <div className="grid grid-cols-1 grid-rows-1 w-96 h-48 rounded-lg bg-white-color">
        <h1 className="text-2xl font-bold m-auto">{modal.message}</h1>
        <div className="w-full flex flex-row">
          <button className="bgcolor-blue w-1/2 m-2" onClick={handleConfirm}>
            확인
          </button>
          <button
            className="bgcolor-grey w-1/2 m-2"
            onClick={() => dispatch(modalClose())}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
