import { useMemo } from "react";
import { PermissionKeyGeneratorUtil } from "../utils/PermissionKeyGeneratorUtil";

export const usePermission = () => {
  const deniedPermissionsSet = useMemo(() => {
    const permissions = JSON.parse(localStorage.getItem("deniedPermissions") || "[]");

    return new Set(permissions);
  }, []);

  const checkPermission = (section, permission) => {
    if (deniedPermissionsSet.size === 0) {
      return true;
    }

    const permissionKey = PermissionKeyGeneratorUtil(section, permission);

    return !deniedPermissionsSet.has(permissionKey);
  };

  const getPermissionKey = (section, permission) => PermissionKeyGeneratorUtil(section, permission);

  return { checkPermission, getPermissionKey };
};
