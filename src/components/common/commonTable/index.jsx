import { CustomTable } from "../table";

const CommonTable = ({
  id,
  selecedId,
  selectedId,
  selectedIndex,
  loading,
  columns,
  filterData,
  setFilterData,
  listingData,
  handleSelect = () => {},
  doubleClickSelection = () => {},
  disabledHead,
  rowClassName,
}) => {
  const handleSort = (key) => {
    setFilterData({
      ...filterData,
      sortType: !filterData?.sortType,
      sortValue: key,
    });
  };
  return (
    <CustomTable.Main>
      <CustomTable.Head
        loading={loading}
        disabled={disabledHead}
        columns={columns?.map((col) => ({
          label: col.label,
          className: col.className,
          onClick: () => handleSort(col.key),
          render: () => (
            <>
              {col.label}
              {!disabledHead && filterData?.sortType && filterData?.sortValue === col.key && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!disabledHead && !filterData?.sortType && filterData?.sortValue === col.key && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </>
          ),
        }))}
      />
      <CustomTable.Body
        data={listingData}
        columnsLength={columns.length}
        loading={loading}
        renderRow={(row, i) => (
          <CustomTable.Row
            key={row[id] || i}
            onClick={() => handleSelect(row, i)}
            onDoubleClick={() => doubleClickSelection(row)}
            className={`${
              ((selecedId || selectedId) && (row[id] === (selecedId || selectedId) ? "tableSelected" : "")) ||
              (selectedIndex !== null && (Number(i) === Number(selectedIndex) ? "tableSelected" : ""))
            } ${row[rowClassName] || ""}`}
          >
            {columns.map((col) => (
              <CustomTable.Cell key={col.key}>{row[col.key]}</CustomTable.Cell>
            ))}
          </CustomTable.Row>
        )}
      />
    </CustomTable.Main>
  );
};

export default CommonTable;

// example usage:

//   <CommonTable
//     id={"customerPK"}                                               ///// id name to identify unique row
//     selecedId={watch("customer.customerDataId")}                    ///// selected id to highlight row
//     loading={loading}                                               ///// loading state
//     listingData={customerList}                                      ///// data to be listed in table
//     columns={[                                                      ///// columns definition ( table heading )
//       { label: "Customer", key: "name", className: "col-7" },
//       { label: "City", key: "city", className: "col-4" },
//       { label: "State", key: "stateCode", className: "col-1" },
//     ]}
//     handleSelect={(row) => {                                        ///// function to handle row selection
//       setTableText(true);
//       handleCustomerDataSelection(row);
//     }}
//   />
