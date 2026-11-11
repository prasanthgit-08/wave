import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import HalfScreenWrapper from "../../../Templates/Screens/HalfScreenWrapper";

function DriversEmail() {
  return (
    <HalfScreenWrapper>
      <Header />
      <div className="p-2">
        <div className=" shadow-sm rounded border">
          <div className="d-flex gap-4 ps-2 mt-2">
            <div className="col-6">
              <div className="d-flex mb-3">
                <div className="col-3 ">Drivers</div>
                <div className="col-9 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 ">Unit Number</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 ">Model</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 ">Unit Type</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 ">Special Code</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>

              <div className="d-flex mb-3 invisible">
                <div className="col-3 ">Attach Video</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className=""
                    type="checkbox"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-2 invisible">
                <div className="col-3 ">Charge EFee</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className=""
                    type="checkbox"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex mb-3 invisible">
                <div className="col-3 "></div>
                <div className="col-9 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 ">Pickup</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 "></div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
                <input type="text" style={{ width: "30px" }} className=" form-controlDriverService" />
              </div>
              <div className="d-flex mb-3 invisible">
                <div className="col-3 "></div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 ">Delivery</div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="col-3 "></div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
                <input type="text" style={{ width: "30px" }} className=" form-controlDriverService" />
              </div>
              <div className="d-flex mb-2 invisible">
                <div className="col-3 "></div>
                <div className="col-5 me-3">
                  {" "}
                  <input
                    className=""
                    type="checkbox"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex ps-2 mb-2 col-12">
            <div className=" " style={{ width: "157px" }}>
              Email Text
            </div>
            <div className="col-10 me-3">
              {" "}
              <textarea className="w-100 h-100" name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </HalfScreenWrapper>
  );
}

export default DriversEmail;
