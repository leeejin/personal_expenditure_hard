import useGetRecords from "../../pages/HomeRecord/useGetRecords";

const colors = [
  "bg-blue-color",
  "bg-green-color",
  "bg-red-color",
  "bg-yellow-color",
  "bg-etc-color",
];

const summarizeExpenses = (expenses) => {
  const summary = expenses.reduce((acc, { item, amount }) => {
    acc[item] = (acc[item] || 0) + amount;
    return acc;
  }, {});

  const sortedSummary = Object.entries(summary)
    .map(([item, amount]) => ({ [item]: amount }))
    .sort((a, b) => {
      return Object.values(b) - Object.values(a);
    });

  const topItems = sortedSummary.slice(0, 4);
  const remainingItems = sortedSummary.slice(4).reduce(
    (acc, item) => {
      acc.기타.push(item);
      return acc;
    },
    { 기타: [] }
  );

  return sortedSummary.length > 4
    ? [...topItems, remainingItems]
    : sortedSummary;
};

function GraphRecords() {
  const { selectedMonth, records, error, isLoading } = useGetRecords();
  const arr = summarizeExpenses(records);

  const handleTotalCost = () => {
    const costArr = records.map((data) => data.amount);
    return costArr.reduce((prev, cur) => (prev += cur), 0);
  };

  const handleAmountCalculate = (data, i) => {
    let total = 0;
    if (i < 4) return Object.values(data);
    else {
      const etcData = Object.values(data)[0];
      for (let item of etcData) {
        total += Object.values(item)[0];
      }
      return total;
    }
  };
  if (error)
    return <div className="section">데이터 불러오는데 실패했습니다</div>;
  if (isLoading) return <div className="section">로딩중입니다</div>;

  return (
    <>
      <span className="text-center text-lg font-bold">
        {parseInt(selectedMonth)}월 총 지출 :{" "}
        {handleTotalCost().toLocaleString()} 원
      </span>
      <div className="flex items-center mt-5 h-12 rounded-xl bg-lightgrey-color">
        {arr.map((data, i) => {
          return (
            <div
              className={`${
                colors[i]
              } h-full transition-all ease-in-out duration-200 ${
                i == 0 ? "rounded-tl-xl rounded-bl-xl" : "rounded-none"
              } ${
                i == arr.length - 1
                  ? "rounded-tr-xl rounded-br-xl"
                  : "rounded-none"
              }`}
              style={{
                width: `${(
                  (handleAmountCalculate(data, i) / handleTotalCost()) *
                  100
                ).toFixed(2)}%`,
              }}
              key={i}
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-3 flex-wrap mt-3">
        {arr.length
          ? arr.map((data, i) => (
              <div className="flex justify-center gap-3 flex-wrap mt-3" key={i}>
                <div className={`w-5 h-4 ${colors[i]}`} />
                {Object.keys(data)}:{" "}
                {handleAmountCalculate(data, i).toLocaleString()}원 (
                {(
                  (handleAmountCalculate(data, i) / handleTotalCost()) *
                  100
                ).toFixed(2)}
                %)
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default GraphRecords;
