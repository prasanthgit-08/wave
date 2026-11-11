import NoRecordsMessage from "../../common/NoRecordsMessage";

function CertificateUpdateDriverListing({
  loader,
  driverData,
  selectedDriverPK,
  setSelectedDriverPK,
  sortValue,
  sortType,
  handleSort,
}) {
  const renderDrivers =
    driverData?.length > 0 &&
    driverData?.map((i) => (
      <tr
        key={i.DriverPK}
        className={selectedDriverPK === i.DriverPK ? "tableSelected" : ""}
        onClick={() => setSelectedDriverPK(i.DriverPK)}
      >
        <td>{i.FirstName}</td>
        <td>{i.LastName}</td>
        <td>{i.City}</td>
        <td>{i.State}</td>
      </tr>
    ));

  return (
    <div className="fixTableHead border border-2 h-100">
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr>
            <th onClick={() => handleSort("firstName")} className="fw-bold">
              First Name{" "}
              {sortValue === "firstName" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("lastName")} className="fw-bold">
              Last Name{" "}
              {sortValue === "lastName" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("City")} className="fw-bold">
              City{" "}
              {sortValue === "City" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
            <th onClick={() => handleSort("State")} className="fw-bold">
              State{" "}
              {sortValue === "State" && (
                <i
                  className={`fa ${sortType ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc"} font-20 m-l-10`}
                ></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>{loader ? null : renderDrivers}</tbody>
      </table>
      {loader ? null : driverData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default CertificateUpdateDriverListing;
