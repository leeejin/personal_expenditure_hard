import { useNavigate } from "react-router-dom";
import useGetRecords from "../../pages/HomeRecord/useGetRecords";

function FooterRecords() {
  const navigate = useNavigate();
  const { records, error, isLoading } = useGetRecords();
  const handleGoDetail = (recordId) => {
    navigate(`/records/${recordId}`);
  };

  if (error)
    return <div className="section">데이터 불러오는데 실패했습니다</div>;
  if (isLoading) return <div className="section">로딩중입니다</div>;
  return (
    <div className="c-container section">
      {records.length ? (
        records.map((data) => (
          <div
            className="bg-lightwhite-color rounded-lg shadow-md p-[15px] px-[20px] flex justify-between items-center gap-[20px] text-left hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out hover:cursor-pointer"
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
                (by {data.createdBy})
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
