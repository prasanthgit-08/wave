import "./App.css";
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import DealerMain from "./componenets/DealerMain";
import AddDealerComponent from "./componenets/AddDealerComponent";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<DealerMain />}></Route>
          <Route path="/add-dealer" element={<AddDealerComponent />}></Route>
          <Route path="/edit-dealer/:id/:pageNumber" element={<AddDealerComponent />}></Route>
          <Route path="/edit-incompletedealer/:id/:pageNumber" element={<AddDealerComponent />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
