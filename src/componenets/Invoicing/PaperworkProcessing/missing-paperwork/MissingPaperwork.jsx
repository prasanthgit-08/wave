import Header from "../Header";
import Footer from "../Footer";
import MissingPaperworkContent from "./MissingPaperworkContent";

function MissingPaperwork() {
  return (
    <div className="customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <MissingPaperworkContent />
        <Footer missingPaperwork />
      </div>
    </div>
  );
}

export default MissingPaperwork;
