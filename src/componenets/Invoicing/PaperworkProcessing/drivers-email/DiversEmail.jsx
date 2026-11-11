import Footer from "../Footer";
import Header from "../Header";
import DriversEmailContent from "./DriversEmailContent";

function DriversEmail() {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <DriversEmailContent />
        <Footer driversEmail />
      </div>
    </div>
  );
}

export default DriversEmail;
