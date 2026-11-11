import { useEffect } from "react";
import Input from "../input";

const DynamicInput = ({
  targetKey,
  defaultFields,
  filterData,
  setFilterData,
  list,
  fetchData,
  modalClosingRef,
}) => {
  // props list for sample

  //  list = [
  //   { label: "Name", name: "name" },
  //   { label: "City", name: "city",},
  //   { label: "State", name: "stateCode", maxLength: 2,width:'40px', upperCase: true},
  // ];

  const handleChange = (value, field) => {
    setFilterData((prev) => ({
      ...prev,
      [targetKey]: {
        ...prev[targetKey],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    // Initialize the the full object
    setFilterData((prev) => ({
      ...prev,
      [targetKey]: { ...defaultFields },
    }));
    if (modalClosingRef) {
      modalClosingRef.current = false;
    }

    return () => {
      // when exit from the component set the customer field to null
      setFilterData((prev) => ({
        ...prev,
        [targetKey]: null,
      }));

      setTimeout(() => {
        if (!modalClosingRef?.current) {
          fetchData();
        }
      }, 0);
    };
  }, []);

  return (
    <div className="mt-3 mb-3">
      {list?.map((item, i) => (
        <div key={i} className="form-group d-flex flex-column m-b-10">
          <label>{`${item.label}`}</label>
          <Input
            type="search"
            name={item.name}
            maxLength={item.maxLength || 30}
            value={filterData?.[targetKey]?.[item.name] || ""}
            onChange={(e) => {
              const val = item.upperCase ? e.target.value.toUpperCase() : e.target.value;
              handleChange(val, item.name);
            }}
            className={`form-control rounded-0 h-25px`}
            width={item.width || "100%"}
            autoComplete="off"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicInput;

//example

// here list props is static
{
  /* <DynamicInput 
  targetKey="customers"
  defaultFields={{ name: "", city: "", stateCode: "" }}
  list={[
    { label: "Name", name: "name" },
    { label: "City", name: "city",},
    { label: "State", name: "stateCode", maxLength: 2,width:'40px',upperCase: true},
  ]}  
    filterData={filterData}  
    setFilterData={setFilterData} /> */
}
