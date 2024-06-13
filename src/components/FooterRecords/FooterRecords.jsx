import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FooterRecords({ records }) {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.id);
  const handleGoDetail = (recordId) => {
    navigate(`/records/${recordId}`);
  };

  return (
    <div className="container section">
      {records.length ? (
        records.map((data) => (
          <div
            className="bg-lightwhite rounded-lg shadow-md p-[15px] px-[20px] flex justify-between items-center gap-[20px] text-left hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out hover:cursor-pointer"
            key={data.id}
            onClick={() => handleGoDetail(data.id)}
          >
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-bold text-grey-color">
                {data.date}
              </span>
              <span className="text-base font-bold text-blue-color">
                {data.item}-
                {data.description.length > 42
                  ? data.description.slice(0, 43) + "..."
                  : data.description}
                (by {userInfo})
              </span>
            </div>

            <span className="text-lg font-bold text-blue-color">
              {data.amount.toLocaleString()} 원
            </span>
          </div>
        ))
      ) : (
        <div className="text-center p-5 text-base ">지출이 없습니다</div>
      )}
    </div>
  );
}
export default FooterRecords;
