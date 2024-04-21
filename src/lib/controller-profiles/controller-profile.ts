import { proController } from "./pro-controller";
import { ps4 } from "./ps4";

export const getControllerProfile = (id: string) => {
  switch (true) {
    case id.includes("05c4"):
      return ps4;
    case id.includes("2009"):
      return proController;
    default:
      return [];
  }
};

export const getControllerIcon = (id: string) => {
  switch (true) {
    case id.includes("05c4"):
      return "/ps4/controller_playstation4.svg";
    case id.includes("2009"):
      return "/switch-pro/controller_switch_pro.svg";
    default:
      return "";
  }
};
