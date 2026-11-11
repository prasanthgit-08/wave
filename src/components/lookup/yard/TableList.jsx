import { CustomTable } from "../../common/table";

const TableList = ({ onHide, yardData, loading, filterData, setFilterData, handleLookupSelection }) => {
  return (
    <div className="fixTableHead">
      <CustomTable.Main>
        <CustomTable.Head
          loading={loading}
          columns={[
            {
              label: "Description",
              className: "f-w-600",
              onClick: () => {
                setFilterData({
                  ...filterData,
                  sortType: !filterData.sortType,
                  sortValue: "description",
                });
              },
              render: () => (
                <>
                  Description
                  {filterData.sortType && filterData.sortValue === "description" && (
                    <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!filterData.sortType && filterData.sortValue === "description" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </>
              ),
            },
          ]}
        />
        <CustomTable.Body
          data={yardData}
          columnsLength={1}
          loading={loading}
          renderRow={(row) => (
            <CustomTable.Row
              key={row.yardPK}
              onClick={() => {
                handleLookupSelection(row);
                onHide();
              }}
            >
              <CustomTable.Cell>{row.description}</CustomTable.Cell>
            </CustomTable.Row>
          )}
        />
      </CustomTable.Main>
    </div>
  );
};

export default TableList;
