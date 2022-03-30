import { atom } from "recoil";

export const currentCartValue = atom({
  key: "currentCartValue",
  default: [],
});
