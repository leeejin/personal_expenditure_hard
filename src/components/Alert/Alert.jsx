import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popupClose } from "../../redux/reducers/popup.reducer";
import warningIcon from "../../styles/images/warning-icon.png";
import "./Alert.css";

/** 알림창 */
const Alert = () => {
  const dispatch = useDispatch();
  const warning = useSelector((state) => state.popup.message);

  useEffect(() => {
    setTimeout(() => {
      dispatch(popupClose());
    }, 1500);
  }, [dispatch]);
  return (
    <div className="fixed p-5 text-center rounded-lg bg-white-color shadow-md z-15 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 alert-animation">
      <img className="w-[25px] mx-auto" src={warningIcon} />
      <h3>{warning}</h3>
    </div>
  );
};

export default Alert;
