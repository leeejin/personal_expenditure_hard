import api from "../../util/api/api";

export default async function DetailRecordLoader({ params }) {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  if (accessToken) {
    const response = await api.records.getRecord(params.recordsId);
    return response;
  }
  return [];
}
