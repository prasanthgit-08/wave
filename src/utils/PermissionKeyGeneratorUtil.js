// utils/permissionKeyGenerator.js
import { COMPANY, PATTERNS, PROGRAMS, ACTIONS } from "../constants/permissionConstants";

export const PermissionKeyGeneratorUtil = (program, action) => {
  return PATTERNS.OBJECT_KEY.replace("{company}", COMPANY)
    .replace(
      "{program}",
      PROGRAMS.hasOwnProperty(program.toUpperCase()) ? PROGRAMS[program.toUpperCase()] : program
    )
    .replace(
      "{action}",
      ACTIONS.hasOwnProperty(action.toUpperCase()) ? ACTIONS[action.toUpperCase()] : action
    );
};
