import { render } from "react-dom";
import { CustomTable } from "../../common/table";

const TableList = ({ customersData, loading, handleLookupSelection, filterData, onHide, setFilterData }) => {
  return (
    <div className="fixTableHead">
      <CustomTable.Main>
        <CustomTable.Head
          loading={loading}
          columns={[
            {
              label: "Name",
              className: "f-w-600",
              onClick: () => {
                if (!filterData.advanceSortingOrder) {
                  setFilterData({
                    ...filterData,
                    sortType: !filterData.sortType,
                    sortValue: "name",
                  });
                }
              },
              render: () => (
                <>
                  Name
                  {!filterData.advanceSortingOrder &&
                    filterData.sortType &&
                    filterData.sortValue === "name" && (
                      <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                    )}
                  {!filterData.advanceSortingOrder &&
                    !filterData.sortType &&
                    filterData.sortValue === "name" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                    )}
                </>
              ),
            },
            {
              label: "City",
              className: "f-w-600",
              onClick: () => {
                if (!filterData.advanceSortingOrder) {
                  setFilterData({
                    ...filterData,
                    sortType: !filterData.sortType,
                    sortValue: "city",
                  });
                }
              },
              render: () => (
                <>
                  City
                  {!filterData.advanceSortingOrder &&
                    filterData.sortType &&
                    filterData.sortValue === "city" && (
                      <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                    )}
                  {!filterData.advanceSortingOrder &&
                    !filterData.sortType &&
                    filterData.sortValue === "city" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                    )}
                </>
              ),
            },
            {
              label: "State",
              className: "f-w-600",
              onClick: () => {
                if (!filterData.advanceSortingOrder) {
                  setFilterData({
                    ...filterData,
                    sortType: !filterData.sortType,
                    sortValue: "stateCode",
                  });
                }
              },
              render: () => (
                <>
                  State
                  {!filterData.advanceSortingOrder &&
                    filterData.sortType &&
                    filterData.sortValue === "stateCode" && (
                      <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                    )}
                  {!filterData.advanceSortingOrder &&
                    !filterData.sortType &&
                    filterData.sortValue === "stateCode" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                    )}
                </>
              ),
            },
          ]}
        />
        <CustomTable.Body
          data={customersData}
          columnsLength={3}
          loading={loading}
          renderRow={(row) => (
            <CustomTable.Row
              key={row.customerPK}
              onClick={() => {
                handleLookupSelection(row);
                onHide();
              }}
              //   className={selectedId === row.customerPK ? "tableSelected" : " " }
            >
              <CustomTable.Cell>{row.name}</CustomTable.Cell>
              <CustomTable.Cell>{row.city}</CustomTable.Cell>
              <CustomTable.Cell>{row.stateCode}</CustomTable.Cell>
            </CustomTable.Row>
          )}
        />
      </CustomTable.Main>
    </div>
  );
};

export default TableList;
