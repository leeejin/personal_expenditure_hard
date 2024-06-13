import api from "../../util/api/api";

export default async function MyPageRecordsLoader() {
  try {
    const response = await api.user.getUser();
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
