import Loading from "../loading";
const TableRoot = ({ children, className = "", ...props }) => (
  <table className={`table table-striped f-w-600 table-fixed  ${className}`} {...props}>
    {children}
  </table>
);

const TableHead = ({ columns = [], disabled = false, loading }) => (
  <thead>
    <tr>
      {columns.map((col, i) => {
        const { onClick } = col;
        return (
          <th
            key={i}
            className={`f-w-600 ${col.className || ""}`}
            style={{ ...col.style, backgroundColor: "#dadada" }}
            {...(onClick && !disabled && !loading ? { onClick } : {})} // only will show the onlClick provide
          >
            {typeof col.render === "function" ? col.render() : col.label}
          </th>
        );
      })}
    </tr>
  </thead>
);

const TableBody = (
  { data = [], renderRow, loading = false, columnsLength = 0 } // here columnsLength is using to align the loading text center
) => (
  <tbody>
    {data.length == 0 || loading ? (
      <>
        <tr></tr>
        <tr>
          <td style={{ borderStyle: "hidden" }} colSpan={columnsLength} className="text-center">
            {/* {loading ? <Loading small /> : <div className="noRecordsSmallerFont">No records found</div>} */}
            {loading ? <Loading /> : <div className="noRecordsSmallerFont">No records found</div>}
          </td>
        </tr>
      </>
    ) : (
      data.map((row, i) => renderRow(row, i))
    )}
  </tbody>
);

const TableRow = ({ children, onClick = () => {}, onDoubleClick = () => {}, className }) => (
  <tr className={`${className}`} onClick={onClick} onDoubleClick={onDoubleClick}>
    {children}
  </tr>
);
const TableCell = ({ children, as: Tag = "td", ...props }) => (
  <Tag className={"f-w-600"} {...props}>
    {children}
  </Tag>
);

export const CustomTable = {
  Main: TableRoot,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
};

{
  /* CustomTable.Main>
  CustomTable.Head
    columns={[
      "ID", // simple column, no click
      {
        label: "Name",
        className: "f-w-600 col-2",
        onClick: () => console.log("Sort by Name"),
        render: () => (
          <>
            Name <i className="fa fa-sort font-20 m-l-10"></i>
          </>
        ),
      },
      {
        label: "Date",
        style: { width: "150px" },
        // no onClick here, safe
      },
    ]}
  />

  CustomTable.Body
    data={[{ id: 1, name: "John", date: "2025-09-30" }]}
    renderRow={(row, i) => (
      CustomTable.Row key={i}>
        CustomTable.Cell>{row.id}</Table.Cell>
        CustomTable.Cell>{row.name}</Table.Cell>
        CustomTable.Cell>{row.date}</Table.Cell>
      </CustomTable.Row>
    )}
  />
</CustomTable.Main> */
}
