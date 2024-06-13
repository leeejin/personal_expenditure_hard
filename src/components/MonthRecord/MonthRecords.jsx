import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../../redux/reducers/data.reducer";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function MonthRecords() {
  const selectedMonth = useSelector((state) => state.data.selectedMonth);
  const dispatch = useDispatch();
  const handleChangeDate = useCallback(
    (month) => {
      dispatch(changeData(month));
    },
    [dispatch]
  );

  return (
    <>
      {MONTHS.map((month) => (
        <button
          className={`w-[108px] p-5 m-3 ${
            selectedMonth === month
              ? "bg-background-color text-white-color"
              : "bg-lightwhite-color"
          } hover:bg-background-color hover:text-white-color`}
          key={month}
          onClick={() => handleChangeDate(month)}
        >
          <span className="text-xl font-serif font-semibold">{month}월</span>
        </button>
      ))}
    </>
  );
}

export default MonthRecords;
