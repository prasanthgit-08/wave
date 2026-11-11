export const CSTMR_RADIO_OBJ = {
  sections: [
    { label: "Name", value: "name" },
    { label: "City", value: "city" },
    { label: "State", value: "stateCode" },
  ],
  levels: ["1st", "2nd", "3rd"],
  fieldNames: ["firstField", "secondField", "thirdField", "fourthField", "fifthField"],
};

export const CSTMR_DYNAMIC_INPUT_DEFAULT = { name: "", city: "", stateCode: "", description: "", dba: "" };

export const CSTMR_DYNAMIC_INPUT_LIST = [
  { label: "Name", name: "name" },
  { label: "City", name: "city" },
  { label: "State", name: "stateCode", maxLength: 2, width: "40px", upperCase: true },
];
export const DEALER_DYNAMIC_INPUT_LIST = [
  { label: "Name", name: "name" },
  { label: "DBA", name: "dba", upperCase: true },
  { label: "City", name: "city" },
  { label: "State", name: "stateCode", maxLength: 2, width: "40px", upperCase: true },
];

export const DEALER_RADIO_OBJ = {
  sections: [
    { label: "Name", value: "name" },
    { label: "City", value: "city" },
    { label: "State", value: "stateCode" },
    { label: "DBA", value: "dba" },
  ],
  levels: ["1st", "2nd", "3rd", "4th"],
  fieldNames: ["firstField", "secondField", "thirdField", "fourthField", "fifthField"],
};

export const PLANT_DYNAMIC_INPUT_DEFAULT = { name: "", brand: "", productLine: "" };

export const PLANT_DYNAMIC_INPUT_LIST = [
  { label: "Name", name: "name" },
  { label: "Brand", name: "brand" },
  { label: "product Line", name: "productLine" },
];
