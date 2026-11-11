import EnumService from "../service/enums/enum.service";

export const ENUMS_STORAGE_KEY = "enums";

export const fetchAndStoreEnums = async () => {
  try {
    if (JSON.parse(localStorage.getItem(ENUMS_STORAGE_KEY))) return;

    const { data } = await EnumService.getAllEnums();
    if (data?.errorModel?.errorCode === "1") {
      throw new Error(data?.errorModel?.errorMessage || "Failed to load enums");
    }

    const enums = data || null;
    localStorage.setItem(ENUMS_STORAGE_KEY, JSON.stringify(enums));
    return enums;
  } catch (error) {
    console.error("fetchAndStoreEnums error:", error);
    return null;
  }
};

export const getAllEnums = () => {
  try {
    return JSON.parse(localStorage.getItem(ENUMS_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

export const getEnum = (enumName) => getAllEnums()[enumName] || [];

export const clearEnums = () => localStorage.removeItem(ENUMS_STORAGE_KEY);
