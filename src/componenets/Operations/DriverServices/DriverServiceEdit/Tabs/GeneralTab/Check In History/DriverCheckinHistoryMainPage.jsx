import DriverCheckinHistoryContent from "./DriverCheckinHistoryContent";
const DriverCheckinHistoryMainPage = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DriverCheckinHistoryContent />
      </div>
    </div>
  );
};

export default DriverCheckinHistoryMainPage;
