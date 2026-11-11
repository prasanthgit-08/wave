import { CustomTable } from "../../common/table";

const TableList = ({ onHide, plantData, loading, filterData, setFilterData, handleLookupSelection }) => {
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
              label: "Brand",
              className: "f-w-600",
              onClick: () => {
                if (!filterData.advanceSortingOrder) {
                  setFilterData({
                    ...filterData,
                    sortType: !filterData.sortType,
                    sortValue: "brand",
                  });
                }
              },
              render: () => (
                <>
                  Brand
                  {!filterData.advanceSortingOrder &&
                    filterData.sortType &&
                    filterData.sortValue === "brand" && (
                      <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                    )}
                  {!filterData.advanceSortingOrder &&
                    !filterData.sortType &&
                    filterData.sortValue === "brand" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                    )}
                </>
              ),
            },
            {
              label: "product Line",
              className: "f-w-600",
              onClick: () => {
                if (!filterData.advanceSortingOrder) {
                  setFilterData({
                    ...filterData,
                    sortType: !filterData.sortType,
                    sortValue: "productLine",
                  });
                }
              },
              render: () => (
                <>
                  Product Line
                  {!filterData.advanceSortingOrder &&
                    filterData.sortType &&
                    filterData.sortValue === "productLine" && (
                      <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                    )}
                  {!filterData.advanceSortingOrder &&
                    !filterData.sortType &&
                    filterData.sortValue === "productLine" && (
                      <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                    )}
                </>
              ),
            },
          ]}
        />
        <CustomTable.Body
          data={plantData}
          columnsLength={3}
          loading={loading}
          renderRow={(row) => (
            <CustomTable.Row
              key={row.customerPlantPK}
              onClick={() => {
                handleLookupSelection(row);
                onHide();
              }}
              //   className={selectedId === row.customerPK ? "tableSelected" : " " }
            >
              <CustomTable.Cell>{row.name}</CustomTable.Cell>
              <CustomTable.Cell>{row.brand}</CustomTable.Cell>
              <CustomTable.Cell>{row.productLine}</CustomTable.Cell>
            </CustomTable.Row>
          )}
        />
      </CustomTable.Main>
    </div>
  );
};

export default TableList;
