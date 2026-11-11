import OrderEntryServices from "../../service/orderEntry/orderEntry.service";

export const fetchYardDetail = async (params) => {
  const { lookup, searchTerms, ...rest } = params;

  let payload = {
    customerFK: params.customerFK,
    customerPlantPK: params.customerPlantPK,
    outbound: params.outbound,
    reload: !params.outbound,
  };

  if (lookup) {
    payload = { ...rest, searchTerm: searchTerms, ...payload };
  } else {
    payload.searchTerm = params.searchTerm;
    payload.isOEPP = "Autocomplete";
  }

  const res = await OrderEntryServices.getYardDetails(payload);
  return res.data;
};
