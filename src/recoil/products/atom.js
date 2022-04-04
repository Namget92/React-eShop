import { atom } from "recoil";

export const itemsStock = atom({
  key: "itemsStock",
  default: [],
});

export const count = atom({
  key: "count",
  default: 0,
});
