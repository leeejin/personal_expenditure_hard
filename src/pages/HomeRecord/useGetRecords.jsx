import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import api from "../../util/api/api";

function useGetRecords() {
  const selectedMonth = useSelector((state) => state.data.selectedMonth);
  const userInfo = useSelector((state) => state.user.id);
  const initialRecords = useLoaderData();
  const {
    data: records = initialRecords,
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

  return { selectedMonth, records, error, isLoading };
}

export default useGetRecords;
