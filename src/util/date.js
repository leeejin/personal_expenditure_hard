export const isDateValid = (dateString) => {
  // 정규식 패턴: YYYY-MM-DD
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  // 정규식 검사
  if (dateRegex.test(dateString)) {
    // 정규식 통과 시 Date 객체로 변환하여 유효성 검사
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  return false;
};
