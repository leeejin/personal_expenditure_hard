import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Alert from "../components/Alert";
import Menubar from "./Menubar";

function DefaultLayout() {
  const warning = useSelector((state) => state.popup);
  return (
    <>
      {warning.isVisible && <Alert />}
      <Menubar />
      <div className="flex flex-col gap-6 p-8 mx-auto max-w-5xl">
        <Outlet />
      </div>
    </>
  );
}
export default DefaultLayout;
