import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import AddRecord from "../components/AddRecord/AddRecord";
import FooterRecords from "../components/FooterRecords/FooterRecords";
import GraphRecords from "../components/GraphRecords/GraphRecords";
import MonthRecord from "../components/MonthRecord";
import api from "../util/api/api";

function HomeRecords() {
  const selectedMonth = useSelector((state) => state.data.selectedMonth);
  const userInfo = useSelector((state) => state.user.id);
  const {
    data: records,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["records", userInfo, selectedMonth],
    queryFn: async () => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const response = await api.records.getRecords();
      if (accessToken) {
        const data = response.filter(
          (data) => data.month == selectedMonth && data.createdBy == userInfo
        );

        return data;
      }
      return [];
    },
  });

  if (isLoading) return <div className="section">Loading...</div>;
  if (error)
    return <div className="section">데이터 불러오는데 실패했습니다</div>;

  return (
    <>
      <div className="section">
        <AddRecord />
      </div>

      <div className="section">
        <MonthRecord records={records} />
      </div>

      <div className="section">
        <GraphRecords records={records} />
      </div>

      <div className="section">
        <FooterRecords records={records} />
      </div>
    </>
  );
}

export default HomeRecords;
