import AddRecord from "../../components/AddRecord/AddRecord";
import FooterRecords from "../../components/FooterRecords/FooterRecords";
import GraphRecords from "../../components/GraphRecords/GraphRecords";
import MonthRecord from "../../components/MonthRecord";

function HomeRecords() {
  return (
    <>
      <div className="section">
        <AddRecord />
      </div>

      <div className="section">
        <MonthRecord />
      </div>

      <div className="section">
        <GraphRecords />
      </div>

      <div className="section">
        <FooterRecords />
      </div>
    </>
  );
}

export default HomeRecords;
